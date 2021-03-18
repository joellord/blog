---
path: "/blog/post/2021-03-04_env_variables_container"
date: "2021-03-04"
title: "Making environment variables accessible in front-end containers"
summary: "Passing environment variables to a container for your front-end application can be tricky. Here is how to do it with most major front-end frameworks."
abstract: "Passing environment variables to a container for your front-end application can be tricky. Here is how to do it with most major front-end frameworks."
author: "Joel Lord"
formattedDate: "March 4th, 2021"
keywords: ["container", "docker", "front-end"]
banner: "puzzle"
originalSource: "Red Hat Developers Blogs"
originalUrl: "https://developers.redhat.com/blog/2021/03/04/making-environment-variables-accessible-in-front-end-containers/"
---
When building a container for a single-page application using any modern JavaScript framework (such as Angular, React, or Vue.js), you might find that the configuration settings are different depending on where the container will run. A typical case would be the base URL for your API, which will differ depending on whether you are testing the application or deploying it into production. Developers usually solve this problem using environment variables.
Environment variables typically work on the backend because that is where code runs. But what if your application lives in the user's browser? There are many ways around this limitation. In some cases, you might build a server whose endpoint holds the necessary parameters. Another workaround is to use PHP to inject the environment variables as globals in the JavaScript code. Both of these options work, but it would be ideal to inject the environment variables as part of the container build process. That way, you don't have to change the codebase, and you can still deliver the application content using a static web server like NGINX.
This article shows you how to inject environment variables directly into your codebase as you build your container.

## JavaScript frameworks in the production build
It doesn't matter which JavaScript framework you use—React, Angular, or Vue.js—because they all work virtually the same way. The framework runs a server that watches the files, and it refreshes the browser when a change is detected. This process is excellent for development purposes but not so much for production servers. All of that code requires too many resources to run. For the application content to work in a web server, we need a build step that minimizes the code and keeps only the necessary parts. We can then create a package using a single page that contains all of the application's HTML, JavaScript, and CSS. When a container runs in a production environment, it will serve this minified package.
It turns out that the container-build step that prepares your code for production is also a great place to inject environment variables. We'll go through the process in the next sections.

## Create a skeleton application
Let's start with a skeleton application built with the command-line interface (CLI) for your JavaScript framework:

```bash
# Angular
npx @angular/cli new angular-project
# React
npx create-react-app react-project
# VueJS
npx @vue/cli create vue-project
```

For your project of choice, create a `config.json` file in the `/src` folder. This file will contain settings that could change based on the environment. In this case, it will have two properties: One to specify the environment and another one for the base URL of your imaginary API:

```javascript
{
  "ENV": "development",
  "BASE_URL": "http://localhost:3000"
}
```

For simplicity, the application you are using will display those values on the main page. Head over to your main page, import the configuration file, and display both values in that view.Next, we'll look at the application-specific code for Angular, React, and Vue.js.

### Angular
To import a JSON file, you might need to add the following options to the compilerOptions of your tsconfig.json file:  

```javascript
  "resolveJsonModule": true,
  "esModuleInterop": true,
  "allowSyntheticDefaultImports": true,
```

Here are the application components (`src/app/app.component.ts`):

```javascript
import { Component } from '@angular/core';
import Config from "../config.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  environment = Config.ENV;
  baseUrl = Config.BASE_URL;
}
```

Here is the application HTML (`src/app/app.component.html`):

```html
<div>
  <p>Environment: {{ environment }}</p>
  <p>Base Url: {{ baseUrl }}</p>
</div>
```

### React
Here's an application config for React (`src/App.js`):

```javascript
import Config from "./config.json";

function App() {
  const environment = Config.ENV;
  const baseUrl = Config.BASE_URL;
  return (
    <div>
      <p>Environment: { environment }</p>
      <p>Base Url: { baseUrl }</p>
    </div>
  );
}

export default App;
```

### Vue.js

And here's the configuration for Vue.js (`src/App.vue`):

```javascript
<template>
  <div>
    <p>Environment: {{ environment }}</p>
    <p>Base Url: {{ baseUrl }}</p>
  </div>
</template>

<script>
import Config from "./config.json";

export default {
  name: 'App',
  data: () => {
    return {
      environment: Config.ENV,
      baseUrl: Config.BASE_URL
    }
  }
}
</script>
```

## Multi-stage build containers
Now, you're ready to build the front-end container. For this process, you will use a container to create the production version of the application. Docker will then copy this build function's output into a second container, an NGINX server. Once the second container is created, you discard the first container. What's left is the NGINX server with the minimal set of files from the prior stage.
Let's start by creating an image to contain the application. Later, we'll come back to apply the environment variables. For this stage, you'll do the following:

1. Create a new file called `Dockerfile`. The first stage uses a `node:14` image to build the production version of the application. Copy over all of your files into the container.
2. Copy the files, then run an `npm install` to fetch the project's dependencies and run an `npm run build` to create the production assets.
3. Start the second stage with a `FROM nginx:1.17` statement and copy the files from the first stage into this new container.

*Note*: To avoid copying unnecessary files such as the `node_modules` folders, create a `.docker-ignore` file in the same folder as your `Dockerfile` and list the folders to ignore. Also, note that the production code's location varies based on the JavaScript framework you are using, so uncomment the line you need. Angular requires that you change the name of your project manually.

Here is the complete Dockerfile at this stage:

```dockerfile
FROM node:14
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.17
WORKDIR /usr/share/nginx/html
# Angular
# COPY --from=0 /app/dist/<projectName> .
# React
# COPY --from=0 /app/build .
# VueJS
# COPY --from=0 /app/dist .
```

After creating the Dockerfile, you can build the image and start the container to test it out. Run the following commands and open your browser to [http://localhost:8080](http://localhost:8080):

```bash
docker build -t front-end.
docker run -d -p 8080:80 --rm --name front frontend
```

To stop the container after you've tested it, enter:

```bash
docker stop front
```

## Inject the environment variables
Next, you will edit the Dockerfile to inject your environment variables. First, you'll overwrite the content of your original `config.json` file, then you'll tweak the NGINX server to inject the environment variables.

### Overwrite config.json
Instead of having actual values, each property's value will be "`$key`". The resulting `config.json` looks like this:

```javascript
{
  ENV: "$ENV",
  BASE_URL: "$BASE_URL"
}
```

You will use the `envsubst` to change the `$KEY` values to the environment variable's real value just before the server starts. For this to work, you need to add instructions to the first step of the Dockerfile to include [https://stedolan.github.io/jq/manual/](jq), a tool that makes it easy to edit the contents of a JSON file from the CLI. Right after the `FROM` line in your Dockerfile, add the following to install `jq` in the container:

```dockerfile
ENV JQ_VERSION=1.6
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq
```

After the files have been copied, you can use `jq` to edit the `config.json`:

```dockerfile
RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
```

*Note*: If you want to learn more about the jq filter used in this example and experiment with other options, you can run it in [https://jqterm.com/](jqTerm).

### Tweak the NGINX server
After you've modified the `config.json` file, you will tweak the NGINX server to inject the environment variables. To do so, you will need to create a script to be executed before starting the NGINX server.
This file (`start-nginx.sh`) contains quite a bit of bash scripting. The first line of the script runs a command to get the names of all existing environment variables and stores those in `$EXISTING_VARS`. The script then loops through each JavaScript file in your production folder and replaces any `$VARIABLE` with the actual value of that environment variable. Once it's done, it starts the NGINX server with the default command:

```bash
#!/usr/bin/env bash
export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);
for file in $JSFOLDER;
do
  cat $file | envsubst $EXISTING_VARS | tee $file
done
nginx -g 'daemon off;'
```

*Note*: The location of the JavaScript files differs for each framework. The `$JSFOLDER` variable is set in the Dockerfile so that you can uncomment the line you need there.

Now, add this file to the container and overwrite the NGINX image's default entry point with this new script. Right after the `FROM` statement of the second stage, add the following lines for your framework:

```dockerfile
# Angular
# ENV JSFOLDER=/usr/share/nginx/html/*.js
# React
# ENV JSFOLDER=/usr/share/nginx/html/static/js/*.js
# VueJS
# ENV JSFOLDER=/usr/share/nginx/html/js/*.js
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh
```

At the very end of the file, add the new entry point:

```dockerfile
ENTRYPOINT [ "start-nginx.sh" ]
```

Your final Dockerfile should look like this one. You can uncomment the required lines and remove all the other commented statements:

```dockerfile
FROM node:14
ENV JQ_VERSION=1.6
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq
WORKDIR /app
COPY . .
RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json > ./src/config.tmp.json && mv ./src/config.tmp.json ./src/config.json
RUN npm install && npm run build

FROM nginx:1.17
# Angular
# ENV JSFOLDER=/usr/share/nginx/html/*.js
# React
# ENV JSFOLDER=/usr/share/nginx/html/static/js/*.js
# VueJS
# ENV JSFOLDER=/usr/share/nginx/html/js/*.js
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html
# Angular
# COPY --from=0 /app/dist/<projectName> .
# React
# COPY --from=0 /app/build .
# VueJS
# COPY --from=0 /app/dist .
ENTRYPOINT [ "start-nginx.sh" ]
```

## Rebuild your image and start the server
You are now ready to rebuild your image and start the server again, but this time with environment variables. Open your browser at [http://localhost:8080](http://localhost:8080), and you should see the application running with the values of the environment variables you've passed to Docker:

```bash
docker build -t frontend .
docker run -d -p 8080:80 --rm --name front -e ENV=prod -e BASE_URL=/api frontend
```

## Conclusion
In summary, here are the steps to make your environment variables accessible in your front-end containers:
1. Add a config.json file in your /src folder.
2. Add the start-nginx.sh bash script to your project.
3. Use the completed Dockerfile to build your project.
4. Start your container using -e to specify the environment variables.

  Once you've created a Dockerfile following these steps, you can reuse it for any of your JavaScript projects. All the variables in the ``config.json`` will change automatically, and you won't need to think about them anymore. You can find the complete source code and examples for the Angular, React, and Vue.js applications used in this article on [https://github.com/joellord/frontend-containers](GitHub).