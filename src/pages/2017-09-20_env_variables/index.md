---
path: "/blog/post/2017-09-20_env_variables"
date: "2017-09-20"
title: "Environment variables in Node"
summary: "Conditional statements based on the environment your code is running in is very easy with env variables."
abstract: "You probably have some differences between your production and development environments.  Here is a quick tip on how to differentiate between both."
author: "Joel Lord"
formattedDate: "September 20th, 2017"
banner: "leaves"
keywords: ["javascript", "nodejs", "node", "env", "environment variable"]
---

Recently, I deployed a Node server on a VM very quickly.  For some reason, everything blew up.  I looked and looked to try to figure out what was the issue.  I thought it was some port forwarding or some weird iptable thingy.  I realized, after digging for an hour or so, that when I deployed the last time, I manually changed the port number on the JS file on the server.  Not my best moment.

##Differences between production and development
On most setups, you will have differences between your production and development environments.  It could be how you access your database or the port number that you use.  In order to make a distinction between your environments, you could use command line arguments or environment variables.

##What is an environment variable?

In a nutshell, an environment variable is a variable that you set in your OS.  Your application can then talk to your OS to see what the value is and you can tell your application to have different behaviours based on it.  Typically, it is used to distinguish between a production and development environments.

##Setting your environment variables

In OSX, it is very easy to set those.  In your command line, simply type in the name of the variable followed by an equal sign and the value of the variable.

```
    > export NODE_ENV=production
```

Just like many other things, you will not have any confirmation.  But you can still validate that the value was set properly by using echo.

```
    > echo $NODE_ENV
    production
```

Notice that we've preceded the name of the variable by a $ sign to access it.

##Accessing environment variables in Node

You can now access your environment variables from you Node application by using.

```
    let mode = process.env.NODE_ENV;
    console.log(mode);  //production
```

process.env contains the list of all the environment variables available to you.  Once you've set it, you can now use it directly in node.

##Env variables in real life

Well, back to my problem with my server.  I am now setting up my server with the NODE_ENV=production environment variable.  Now my code looks something like:

```
    let port = process.env.NODE_ENV === "production" ? 80 : 8888;
    app.listen(port);
    console.log("Application is listening on port " + port + ", based on the environment variable!");
```

That's it!  No big breakthrough, just a simple little trick but I think it was worth documenting so that I don't make the same mistake again.
