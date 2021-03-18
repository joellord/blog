---
path: "/blog/post/2021-03-04_rootless_containers"
date: "2021-03-04"
title: "Building rootless containers for JavaScript front ends"
summary: "By default, most containers are run as the root user. It is much easier to install dependencies, edit files, and run processes on restricted ports when they run as root. As is usually the case in computer science, though, simplicity comes at a cost. In this case, containers run as root are more vulnerable to malicious code and attacks."
abstract: "By default, most containers are run as the root user. It is much easier to install dependencies, edit files, and run processes on restricted ports when they run as root. As is usually the case in computer science, though, simplicity comes at a cost. In this case, containers run as root are more vulnerable to malicious code and attacks."
author: "Joel Lord"
formattedDate: "March 4th, 2021"
keywords: ["container", "root", "front-end"]
banner: "machine"
originalSource: "Red Hat Developers Blogs"
originalUrl: "https://developers.redhat.com/blog/2021/03/04/building-rootless-containers-for-javascript-front-ends/"
---
By default, most [containers](https://developers.redhat.com/topics/containers) are run as the root user. It is much easier to install dependencies, edit files, and run processes on restricted ports when they run as root. As is usually the case in computer science, though, simplicity comes at a cost. In this case, containers run as root are more vulnerable to malicious code and attacks. To avoid those potential [security](https://developers.redhat.com/topics/security) gaps, [Red Hat OpenShift](https://developers.redhat.com/products/openshift/overview) won't let you run containers as a root user. This restriction adds a layer of security and isolates the containers. This article shows you how to run a JavaScript front-end application in a rootless container. The example builds on the code from my previous article, [Making environment variables accessible in front-end containers](https://developers.redhat.com/blog/2021/03/04/making-environment-variables-accessible-in-front-end-containers).

## Building a rootless container

Here is the Dockerfile we'll use for our example. As demonstrated in my [previous article](https://developers.redhat.com/blog/2021/03/04/making-environment-variables-accessible-in-front-end-containers/), you can use this Dockerfile to access environment variables from your Angular, React, or Vue.js applications:

```dockerfile
FROM node:14

ENV JQ_VERSION=1.6
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq

WORKDIR /app
COPY . .
RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json | ./src/config.tmp.json && mv ./src/config.tmp.json config.json
RUN npm install && npm run build

FROM nginx:1.17
# Angular: ENV JSFOLDER=/usr/share/nginx/html/*.js
# React: ENV JSFOLDER=/usr/share/nginx/html/static/js/*.js
# VueJS: ENV JSFOLDER=/usr/share/nginx/html/js/*.js
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh
WORKDIR /usr/share/nginx/html
# Angular: COPY --from=0 /app/dist/ .
# React: COPY --from=0 /app/build .
# VueJS: COPY --from=0 /app/dist .
ENTRYPOINT [ "start-nginx.sh" ]
```

This container uses two stages to build the final container. In the first stage, it uses the `node:14` image, which is running as root. The build process will eventually discard this container, so you don't need to worry about it. The second-stage container is the one that needs to be secured. The `nginx` base image is currently running as root, mainly so that it can run on port 80, which requires privileged access to enable. Once this container is ready to run rootless, it will run on port 8080\. You will need to change the default `nginx` configuration for the container to run rootless. You will also need to make sure that the server itself is running as an unprivileged user. Finally, the user will need access to several files and folders. Let's get started with making this container a rootless one.

## Create the NGINX configuration file

The first step is to create a new configuration file for NGINX. You can start with the most basic configuration file needed to run NGINX and build it from there:

```
worker_processes auto;
events {
  worker_connections 1024;
}
http {
  include /etc/nginx/mime.types;
  server {
    server_name _;
    index index.html;
    location / {
      try_files $uri /index.html;
      }
    }
}
```

Next, you need to change the server settings to run on port 8080 instead of the default port 80. You'll also need to change the default path that NGINX uses to serve files:

```
http {
  ...
  server {
    listen 8080;
    ...
    location / {
      root /code;
      ...
    }
  }
}
```

The final `nginx.conf` file should look like this:

```
worker_processes auto;
events {
  worker_connections 1024;
}
http {
  include /etc/nginx/mime.types;
  server {
    listen 8080;
    server_name _;
    index index.html;
    location / {
      root /opt/app;
      try_files $uri /index.html;
    }
  }
}
```

## Edit the Dockerfile

Now that you have a new NGINX configuration file that lets the server run as a regular user, it's time to edit the Dockerfile. This modified container will run as user `nginx`. In this case, the NGINX base images provide the non-root user. In the second step of your build, right after you've specified your base image with the `FROM` statement, you can copy your new NGINX configuration file to overwrite the default one. Then, create an `/opt/app` folder and change its ownership:

```dockerfile
FROM nginx:1.17
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /opt/app && chown -R nginx:nginx /opt/app && chmod -R 775 /opt/app
```

Don't forget to change the `JSFOLDER` variable. This will ensure that your environment variables are still injected by the bash script.

```dockerfile
# Angular
# ENV JSFOLDER=/opt/app/*.js
# React
# ENV JSFOLDER=/opt/app/static/js/*.js
# VueJS
# ENV JSFOLDER=/opt/app/js/*.js
```

### Change the file ownership

Next, you need to give NGINX access to run a series of files and folders for caching and logging purposes. You can change the ownership of all of them in a single `RUN` statement, using ampersands to chain the commands:

```dockerfile
RUN chown -R nginx:nginx /var/cache/nginx && \
   chown -R nginx:nginx /var/log/nginx && \
   chown -R nginx:nginx /etc/nginx/conf.d
```

NGINX also requires an `nginx.pid` file. This file does not exist yet, so you need to create it and assign ownership to the `nginx` user:

```dockerfile
RUN touch /var/run/nginx.pid && \
   chown -R nginx:nginx /var/run/nginx.pid
```

### Update the group and permissions

Finally, you will change the group for those files and folders and change the permissions so that NGINX can read and write the folders:

```dockerfile
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid && \
   chmod -R 775 /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid
```

### Switch to the rootless user

Now that you've adjusted all the permissions, you can tell Docker to switch over to the `nginx` user using the `USER` statement. You can then copy the files from the builder step into the `/opt/app` folder using the `--chown` flag, which makes the files accessible by the `nginx` user. Finally, you will tell Docker that this new image uses a different port. Use the `EXPOSE` statement for port 8080:

```dockerfile
USER nginx
WORKDIR /opt/app
COPY --from=builder --chown=nginx  .
RUN chmod -R a+rw /opt/app
EXPOSE 8080
```

The final front-end Dockerfile will look like this:

```dockerfile
FROM node:14

ENV JQ_VERSION=1.6
RUN wget --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-${JQ_VERSION}/jq-linux64 -O /tmp/jq-linux64
RUN cp /tmp/jq-linux64 /usr/bin/jq
RUN chmod +x /usr/bin/jq

WORKDIR /app
COPY . .
RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' ./src/config.json | ./src/config.tmp.json && mv ./src/config.tmp.json config.json
RUN npm install && npm run build

FROM nginx:1.17
# Angular
# ENV JSFOLDER=/opt/app/*.js
# React
# ENV JSFOLDER=/opt/app/static/js/*.js
# VueJS
# ENV JSFOLDER=/opt/app/js/*.js
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN mkdir -p /opt/app && chown -R nginx:nginx /opt/app && chmod -R 775 /opt/app
RUN chown -R nginx:nginx /var/cache/nginx && \
   chown -R nginx:nginx /var/log/nginx && \
   chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
   chown -R nginx:nginx /var/run/nginx.pid
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid && \
   chmod -R 775 /var/cache/nginx /var/run /var/log/nginx /var/run/nginx.pid
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh

EXPOSE 8080
WORKDIR /opt/app
# Angular
# COPY --from=0 --chown=nginx /app/dist/ .
# React
# COPY --from=0 /app/build .
# VueJS
# COPY --from=0 /app/dist .
RUN chmod -R a+rw /opt/app
USER nginx
ENTRYPOINT [ "start-nginx.sh" ]</pre>
```

Your new Dockerfile is ready to go! You can test it out by using a `docker build` followed by a `docker run`. Don't forget to map the new port since this container doesn't run on port 80 anymore:

```bash
docker build -t frontend .
docker run -d -p 8080:8080 --rm --name front -e ENV=prod -e BASE_URL=/api frontend
```

## Conclusion

You now have everything needed to run your JavaScript front end in a secure container. You can reuse the image we developed in this article for all of your JavaScript projects, whether you are using Angular, React, or Vue.js. The front end not only runs securely but also lets you inject environment variables into your code. You can find all the examples and source code from this article on [GitHub](http://github.com/joellord/frontend-containers).