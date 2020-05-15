---
path: "/blog/post/2020-05-13_deno"
date: "2020-05-13"
title: "Use Deno From A Container"
summary: "Deno v.1.0 was finally released. And the best way to try it out is from within a container. Here's how."
abstract: "Deno v.1.0 was finally released. And the best way to try it out is from within a container. Here's how."
author: "Joel Lord"
formattedDate: "May 13th, 2020"
keywords: ["deno", "node", "container", "docker"]
banner: "cluster"
---
Today was the release of Deno version 1.0. This new runtime is meant to execute JavaScript or TypeScript outside of the web browser. It is based on the ideas behind NodeJS but with a modern approach. Some of the key features include first class TypeScript support, promises all the way down and better module support.

If you want to try it out, or if you have an application that you want to deploy, you can use a container running the Deno executable to make your life easier. 

To do so, I published a container running the Deno executable. You can download the container from [Docker Hub](https://hub.docker.com/r/joellord/deno) and you can find the source code and more details on my [Github Repo](https://github.com/joellord/deno).

If you are ready to test it out, here are the instructions.

## Start the container
You can start the container in a similar way you would for a NodeJS container. Just use the [deno image](http://github.com/joellord/deno).

```
docker run joellord/deno
```

This should output the currently used version of Deno.

## Run a Deno script
You can run a deno script by using the deno tool as part of your `docker run` command. You should map your JS/TS files to a mounted volume so they can be accessed from within the container.

```
echo "hello world" > demo.js
docker run -v $(pwd):/app joellord/deno deno run /app/demo.js
```

## Run a simple Deno web server
To run the demo web server from the [Deno documentation](https://deno.land/#getting-started), you can start by creating your server.ts file using the following TypeScript.

```
import { serve } from "https://deno.land/std@0.50.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}
```

And then run it from the container. Don't forget to map the ports so the server can be accessed from your local machine. You will also need to add the `--allow-net` flag in order to let Deno start the web server.

```
docker run -v $(pwd):/app -p 8000:8000 joellord/deno deno run --allow-net /app/server.ts
```

You can also run the server in detached mode using the `-d` flag in Docker.
```
docker run -v $(pwd):/app -p 8000:8000 -d joellord/deno deno run --allow-net /app/server.ts
```

## Automatically start JS/TS files
When the container is started, it will automatically look into the /deno-entrypoint for any JavaScript or TypeScript files and will automatically run them. This can be useful to automatically run a JS/TS file at start-up. Those scripts are only executed with the `deno run` command and won't pass in any flags.

```
docker run -v $(pwd):/deno-entrypoint joellord/deno
```

## Create your own Dockerfile
You can also create your own images to deploy them on a Kubernetes cluster. To do so, you can start with the same base image and copy over your Deno files. Makes sure to expose your ports and use the appropriate flags in your CMD line.

Create the Dockerfile
```
FROM joellord/deno:1.0.0
COPY ./*.ts /app/
EXPOSE 8000
CMD ["deno", "run", "--allow-net", "/app/server.ts"]
```

Build and run the image
```
docker built -t mydenoserver .
docker run -p 8000:8000 mydenoserver
```

## That's all folks
If you have any issues with the image, feel free to send me a message on github and I'll do my best to look at it.