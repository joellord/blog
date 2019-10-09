---
path: "/blog/post/2017-08-25_es8_features"
date: "2017-08-25"
title: "ES8 features in JS"
summary: "Now that you mastered all those fancy ES6 features, time to jump into ES8"
abstract: "Now that you mastered all those new ES6 features, you shouldn't stop.  Keep up to date with the lastest ES8 features."
author: "Joel Lord"
formattedDate: "August 25th, 2017"
banner: "puzzle"
keywords: ["javascript", "es6", "es8"]
---

What do you mean you're still using ES6? That's sooo 2015\! You should
be using ES8 by now.

## Help me\! I can't keep up

Since 2015, ECMA decided to bring changes into the ECMAScript standard
more frequently. ES6 was huge because it's been so long since the last
update. The following updates (also known as ES2016 and ES2017) are much
lighter. We will try to cover them in here.

## Trailing comma in parameter list

In the past, leaving a trailing comma at the end of a parameter list
would cause an error. Not anymore. You can now leave it there.
Personally, I think it looks messy but, hey, it's your code base. Code
like this would now be acceptable (as far as the compiler is concerned,
not in my code reviews):

``` 
    function leaveThatComma(arg1, arg2,) {
        console.log("Look, there is a trailing comma in my arg list");
    }
```

## Object.values/Object.entries

With those methods, you can now get the list of values or all the
entries of an object in the form of an array.

### Object.values

Say you have an object and wanted to know the values for each one of the
keys. Maybe you want to check if a particular value was added to your
array. You can use the following Object method to get those.

``` 
    const car = {
      "model": "Accent",
      "year": "2015",
      "make": "Hyundai"
    };
    console.log(Object.values(car));
    //["Accent", "2015", "Hyundai"]
```

You can then use [array methods](2016-01-08_array_methods.html) to do
what you wanted to do with your values.

### Object.entries

Object.entries is very similar but will return you with an array of
\[key, value\] pairs. Using the same example:

``` 
    const car = {
      "model": "Accent",
      "year": "2015",
      "make": "Hyundai"
    };
    console.log(Object.entries(car));
    //[["model", "Accent"], ["year", "2015"], ["make", "Hyundai"]]
```

## String Padding

After the
[leftPad-gate](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/),
the consortium decided that it was finally time to add padding as part
of the standard. The two methods are fairly simple. You pass it the
minimal length of your string and then the padding string. By default,
this second argument is a space.

You can add the padding at the start or at the end of the string using
the two methods.

``` 
    let stringToPad = "es2017";

    stringToPad.padStart(3);        // "es2017"
    stringToPad.padStart(8);        // "  es2017"
    stringToPad.padStart(10, "X");  // "XXXXes2017"
    stringtoPad.padEnd(8, "ES");    // "es2017ES"
    stringtoPad.padEnd(9);          // "es2017   "
```

## Object.getOwnPropertyDescriptors

This new method lets you list all the property descriptors of an object.
They are mostly used for decorators. More on this topic in a subsequent
post.

``` 
    let a = {};
    Object.getOwnPropertyDescriptors(a);    // {}

    a.property = "Hello";
    Object.getOwnPropertyDescriptors(a);    // {value: "Hello", writable: true, enumerable: true, configurable: true}
```

## Async and Await

This is probably the biggest feature in this release of ECMAScript.
Async function will let you create functions that are asynchonous. If
will also not block the thread while waiting for the response.

``` 
    let longProcess = function() {
        return new Promise(resolve => setTimeout(() => {resolve("Dary");}, 1000));
    };
    let waitForIt = async function() {
        console.log("Legen...");
        const it = await longProcess();
        console.log(it);
    }

    waitForIt();
    //Outputs Legen... (pauses for a second) dary

    waitForIt();
    console.log(" Wait for it ");
    //Outputs Legen... Wait for it (pauses for a second) dary
```

So far, the best usage I've found for it is when you have a bunch a
chained promises. Using Async/Await makes it much easier to read. Such
an example would be when trying to connect to the Web Bluetooth API.

``` 
    // With Promises
    return navigator.bluetooth.requestDevice({
        filters: [{services: ['heart_rate']}]
    })
    .then(device => {
        return device.gatt.connect();
    })
    .then(server => {
        return server.getPrimaryService('heart_rate');
    })
    .then(service => {
        return service.getCharacteristic('heart_rate_measurement');
    })
    .then(characteristic => {
        return characteristic.readValue();
    })
    .then(value => {
        console.log("Value is " + value);
    }

    // With Async/Await
    device = await navigator.bluetooth.requestDevice({
        filters: [{services: ['heart_rate']}]
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('heart_rate');
    const characteristic = await service.getCharacteristics('heart_rate_measurement');
    const value = await characteristic.readValue();
    console.log("Value is " + value);
```

And that's it. As you can see, it's a lot less than ES6 but there are a
few useful things is there that you can start using on your projects
right away. Try to use them when you have the chance and the more you
will use them, the more uses for them you will have.
