---
path: "/blog/post/2015-12-06_cli_with_node"
date: "2015-12-06"
title: "Command Line Tools with Node"
summary: "Run your NodeJs scripts as a command line tool"
abstract: "How to easily create command line tools using NodeJs."
author: "Joel Lord"
formattedDate: "December 6th, 2015"
banner: "squid_wall"
keywords: ["node", "cli", "tools", "tips"]
---
Whenever I can use Javascript, I use it. I like it's versatility and I
like the fact that I don't need to switch from one language to another
when creating small scripts. Recently, I've discovered that I can create
CLI tools with Node. Here is how to do it.

## Today's Timestamp

This page is dynamically created based on a list of posts that I
maintain. Every one of those entries requires a timestamp. I figured it
would be easier if I ever want to localize this web site. This being
said, every time I enter a new post, I need to open Node and figure out
that the current timestamp is. In the next steps, we'll create a Node
CLI that ouputs the current timestamp.

## Initialize Your NPM Module

As explained in the [Create Node
Modules](/blog/post/2015-11-18_node_modules_1) series, when you start
a new module, you should use npm init. Let's start by this.

    SYS0635:~ jlord$ npm init
    
    name: (todayTimestamp) today-timestamp
    version: (1.0.0) 0.0.1
    description: A small command line tool that outputs the current timestamp.
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    license: (ISC) MIT
    
    About to write to /path/to/todayTimestamp/package.json:
    
    {
      "name": "today-timestamp",
      "version": "0.0.1",
      "description": "A small command line tool that outputs the current timestamp.",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "Joel Lord ",
      "license": "MIT"
    }
    
    
    Is this ok? (yes) yes

This will initialize a new package.json that you can use to maintain
your script.

## The Basic Script

Let's start by writing the basic script.

    #!/usr/bin/env node
    
    var d = new Date();
    console.log(d.getTime());

Notice that the first line is a
[hashbang](https://en.wikipedia.org/wiki/Shebang_\(Unix\)) instruction.
This tells your OS which interpreter to use with this script. The other
2 lines are simply used to fetch the timestamp and output it.

## Making the Script Executable

We must now tell npm that our script is an executable one. We do so by
adding a "bin" property to our package.json file. It will take a
key-value pair where the key is the name of the CLI command and the
value is the file that gets executed relative to the package.json file.

    ...
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "bin": {
      "today-timestamp": "./index.js"
    },
    "author": "Joel Lord ",
    ...

## Install the Script

We are now ready to install the script to our machine by running an npm
install.

    SYS0635:~ jlord$ npm install -g
    SYS0635:~ jlord$ today-timestamp
    1449416795658

## Going One Step Further

That's it \! You have your command line tool up and running. Now if you
want to go one step furter, you could add support for command line
arguments or you can also ask the user for input. More on this soon...
