---
path: "/blog/post/2016-03-05_using_cluster"
date: "2016-03-05"
title: "Using Clusters"
summary: "Unleashing the full power of multi threads"
abstract: "Node is typically single threaded, but using the cluster module, you can spin off many instances of your application."
author: "Joel Lord"
formattedDate: "March 5th, 2016"
banner: "cluster"
keywords: ["javascript", "node", "cluster", "thread"]
---
It is well know that NodeJs is single threaded. This is one of the
reasons why some Java developers are reluctant to make the leap. NodeJs
is powerful and typically doesn't need multiple threads because of its
event loop (more on that in a [future post](/blog/post/2016-03-18_event_loop)).

## But I have multiple CPUs \!

You are right, and in order to take full advantage of those multiple
cores or CPUs, you can use multiple threads.

NodeJs comes with the built-in package "cluster". This package makes it
easy to manage multiple processes. Let's look at a simple example.

    var cluster = require("cluster");
    var CPUs = require("os").cpus();
    
    if (cluster.isMaster) {
      //Launch workers
      for (var i = 0; i < CPUs.length; i++) {
        cluster.fork();
      }
    } else {
      console.log("pid " + cluster.worker.process.pid + " started");
    }

## It's that easy

If you run the previous example, you will see the following output in
your terminal:

    pid 49608 started
    pid 49609 started
    pid 49613 started
    pid 49615 started
    pid 49610 started
    pid 49611 started
    pid 49612 started
    pid 49614 started

I have 8 cores on my CPU so you will see that I started 8 threads and
each one have a unique process id (pid). Now this isn't very useful
since we don't do anything with each one of the processes.

Let's see how we can scale up an existing application.

## Scale up an existing application

Say I have this very basic application. It's a simple web server and it
returns a simple 200 with a message indicating the process id when it is
hit.

    var http = require("http");
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("Process " + process.pid + " answered the request.\n");
    }).listen(8000);

Now we want this code to be executed in each one of our processes. In
order to do this, we can convert this code into a module and then load
it up on each process that we create with the previous cluster code.

app.js

    var http = require("http");
    
    function app() {
      http.createServer(function(req, res) {
            res.writeHead(200);
            res.end("Process " + process.pid + " answered the request.\n");
        }).listen(8000);
    };
    
    module.exports = app;

cluster.js

    var cluster = require("cluster");
    var CPUs = require("os").cpus();
    var app = require("./app");
    
    if (cluster.isMaster) {
      //Launch workers
      for (var i = 0; i < CPUs.length; i++) {
        cluster.fork();
      }
    } else {
      console.log("pid " + cluster.worker.process.pid + " started");
      app();
    }

And there you go. Now each one of the processes will be listening for a
connection. If you want to test it, you can use curl

    >curl http://localhost:8000
    Process 49612 answered the request.
    >curl http://localhost:8000
    Process 49614 answered the request.
    >curl http://localhost:8000
    Process 49608 answered the request.
    >curl http://localhost:8000
    Process 49609 answered the request.
    >curl http://localhost:8000

Node will look for an available process and use this one when the
request comes in.

## What else?

Well, this is already impressive and you are now using the full
capabilities of your server. But if you are still not convinced, here is
another very interesting thing. Each process has various events. One of
which is the "exit" event. With this event, you can restart a new
process when one dies. This is helpful in case one of your processes
dies. You can then restart a new one rather than having your whole
server die.

Hopefully this will help. You can find more information on the Node
cluster module in the [official
documentation](https://nodejs.org/api/cluster.html).
