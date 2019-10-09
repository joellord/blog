---
path: "/blog/post/2016-06-01_system_js"
date: "2016-06-01"
title: "Intro to SystemJs"
summary: "The Universal Loader That Lets You Use ES6 Modules"
abstract: "I stumbled on SystemJs today.  It seems very interesting to include modules using the ES6 format so I gave it a try and here are some of my findings."
author: "Joel Lord"
formattedDate: "June 1st, 2016"
banner: "puzzle"
keywords: ["javascript", "systemjs", "es6", "modules"]
---
I stumbled on SystemJs today. It seems very interesting to include
modules using the ES6 format so I gave it a try and here are some of my
findings.

## What is SystemJs

SystemJs is a Universal Module Loader for Javascript. If you've used
RequireJs or a CommonJs bundler in the past, you have probably created
modules in the past. It's essentially a way to break down your code in
logical pieces and then include those files only when and if you need
them in your actual application. SystemJs lets you include modules in
many different formats but I was mostly interested in the ES6 module
syntax.

## What's so cool about those ES6 modules?

Modules are a new feature in ES6. The syntax is both easy to use and
easy to ready. You can export variables, classes, functions or objects
from one file to another using this syntax. Here is a quick example of
how it works.

export.js

    var accessibleFromOtherFile = 1;
    var notAccessibleFromOtherFile = 1;
    
    export var accessibleFromOtherFile;

import.js

    import * as otherFile from “export.js”;
    console.log(otherFile.accessibleFromOtherFile); // 1
    console.log(otherFile.notAccessibleFromOtherFile); // undefined

For more information about ES6 modules, I strongly recommend [Dr.
Rauschmayer's
blog](http://www.2ality.com/2014/09/es6-modules-final.html).

## Back to SystemJs

So let's try to use SystemJs to load those modules. First of all, let's
create a very basic HTML page that includes SystemJs. We'll fill in that
empty script tag in a few minutes.

index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Exploring SystemJs</title>
    </head>
    <body>
    
    
    <script type="text/javascript" src="https://jspm.io/system@0.19.js"></script>
    <script type="text/javascript">
    
    </script>
    </body>
    </html>

Let's also create 2 files. One for our main application and another one
with math functions that we will import into our main application.

main.js

    import * as math from "./math";
    
    console.log("1 + 1 = " + math.add(1,1));
    console.log("1 - 1 = " + math.substract(1,1));

math.js

    export function add(x, y) {
    return x+y;
    }
    
    export function substract(x, y) {
    return x-y;
    }

Nothing fancy but it makes it easy to start simple. Now let's edit our
index.html page. We will need to add two lines to configure SystemJs.
The first one will tell SystemJs to use Babel as the ES6 transpiler and
the second one will tell it which file is your application entry point.

index.html

    System.config({
        transpiler: "babel"
    });
    
    System.import("./js/app.js");

Now run this code in your browser and… tada\! the ouput will simply be
(in your console). The use of a separate module was a little bit
overkill in this case but you get the point.

    1 + 1 = 2
    1 – 1 = 0

## A note about jspm

You might have noticed in your network window that the babel-core@5.js
file has been fetched automatically from jspm.io. That is a little bonus
of using jspm to load system.js in your script tag. Jspm is a package
manager and can act more or less as a CDN for your files. More on jspm
in a future post. Suffice to say that it's easy to use with SystemJs.

## Anything else?

Yes, there is another little extra that you get with this. Now all of
your code is transpiled from ES6 to ES5, this means you can use \*all\*
the ES6 syntax in your browser now, so no more reason not to use it. As
an example, you can edit your main.js file to add the
    following:

main.js

    //Arrow Functions (this should not work in Safari 9 unless transpiler works)
    var arrow = () => console.log("It works! ");
    arrow();

And you should see “It works\!” in your console. The arrow functions are
already part of Chrome but if you try to run this without a transpiler
in Safari 9, it would fail.

And that's it\! Hopefully, this will help you get started with System Js
in your browser and will help you to include more and more ES6 syntax in
your code bases. You can see the full code (including ES6 examples that
were not discussed here) on my [github
account](https://github.com/joellord/systemjs_exploration).
