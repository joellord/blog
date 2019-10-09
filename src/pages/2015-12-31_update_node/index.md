---
path: "/blog/post/2015-12-31_update_node"
date: "2015-12-31"
title: "Upgrading Node with n"
summary: "Using n as a Node binary management tool"
abstract: "How to use n to manage and upgrade your current version of node."
author: "Joel Lord"
formattedDate: "December 31st, 2015"
banner: "shelf"
keywords: ["node", "n", "upgrade", "version"]
---
Node is a fast moving library and might require frequent updates. You
probably want to be able to run the latest version of node so you can
try the newest features like ES6 support and so on but you might also
have legacy software that will run on previous versions of node. This
library, "n", will let you run the version of Node that you need.

## What is "n"

[N](https://github.com/tj/n) is a version node binary management
solution. It will let you download and install any version of node.
After this, you can use n rather than node to execute your javascript
code with the node version that you want. You can also easily use n to
update your node version to the one you want to use by default.

## Install "n"

N is part of the npm library so you can easily install it using a global
npm install.

    SYS0635:~ jlord$ npm install -g n

## Install a new node version with n

Now that you have n, you can start installing various versions of Node
on your system

    SYS0635:~ jlord$ n stable
    
         install : node-v5.2.0
           mkdir : /usr/local/n/versions/node/5.2.0
           fetch : https://nodejs.org/dist/v5.2.0/node-v5.2.0-darwin-x64.tar.gz
       installed : v5.2.0
    
    SYS0635:~ jlord$ n latest
    
         install : node-v5.3.0
           mkdir : /usr/local/n/versions/node/5.3.0
           fetch : https://nodejs.org/dist/v5.3.0/node-v5.3.0-darwin-x64.tar.gz
       installed : v5.3.0
    
    SYS0635:~ jlord$ n 0.11.1
    
         install : node-v0.11.1
           mkdir : /usr/local/n/versions/node/0.11.1
           fetch : https://nodejs.org/dist/v0.11.1/node-v0.11.1-darwin-x64.tar.gz
       installed : v0.11.1

You now have the latest version of node, the latest stable version and
another older version (0.11.1). You can now select what version of node
you want to run.

    SYS0635:~ jlord$ node --version
    v0.11.1
    SYS0635:~ jlord$ n
    
        node/0.10.33
        node/0.11.1
        node/0.12.0
      o node/4.2.1
    
    SYS0635:~ jlord$ node --version
    v4.2.1

## How to default to the new version

When you ran n \<version\_number\>, you installed the binaries for node
and npm on your machine. n uses the one that you switched to. If you
want to upgrade your default node, you can create sym links to the n
version of node you want to use.

    #Find the node versions you have installed
    ls /usr/local/n/versions/node
    0.10.33/ 0.11.1/  0.12.0/  4.2.1/
    
    #Check the version
    /usr/local/n/versions/node/4.2.1/bin/node --version
    v4.2.1
    /usr/local/n/versions/node/4.2.1/bin/npm --version
    2.14.7
    
    #Create the sym links
    sudo ln -sf /usr/local/n/versions/node/<version_number>/bin/node /usr/bin/node
    sudo ln -sf /usr/local/n/versions/node/<version_number>/bin/npm /usr/bin/npm

And you're done \! You now have multiple instances of node install and
you can choose which one you want to use.
