---
path: "/blog/post/2016-01-08_array_methods"
date: "2016-01-08"
title: "Array methods you should be using"
summary: "For a cleaner and more readable code base"
abstract: "There are some built-in array methods that you should always be using instead of for loops to write cleaner code."
author: "Joel Lord"
formattedDate: "January 8th, 2016"
banner: "array"
keywords: ["javascript", "array", "prototype"]
---
There is a lot of very useful methods available to manipulate arrays.
For some reason, I keep forgetting about them and keep reverting back to
plain ol' for loops. I figured that if I wrote something about it, I
might remember them form now on.

## What's wrong with the for loop

Nothing\! Using those array methods will simply make your code shorter
and most likely more readable. And as I always say, it's much easier to
write code than to read it so be nice to your colleagues and use those
methods for the sake of readability.

The most common use case for all of these functions would be when
dealing with sets of data. For the next examples, we will be using the
following data array.

    var cars = [
        {
            id: 1,
            make: "Hyundai",
            model: "Accent"
        },
        {
            id: 2,
            make: "Hyundai",
            model: "Elantra"
        }
    ];

## Array.prototype.filter(*callback*)

You can use this method to extract all the matching elements from the
array.

    > cars.filter(function(car) {return car.make == "Hyundai"});
    [ { id: 1, make: 'Hyundai', model: 'Accent' },
      { id: 2, make: 'Hyundai', model: 'Elantra' } ]

Or even easier/cleaner with ES6 arrow functions

    > cars.filter((car) => car.make == "Hyundai");
    [ { id: 1, make: 'Hyundai', model: 'Accent' },
      { id: 2, make: 'Hyundai', model: 'Elantra' } ]

## Array.prototype.find(*callback*)

Find works pretty much the same as the filter function but will only
return the first element that it finds. It's useful when working with
unique keys.

    > cars.find((car) => car.id == 1);
    { id: 1, make: 'Hyundai', model: 'Accent' }

But not so useful when working with non unique values.

    > cars.find((car) => car.make == "Hyundai");
    { id: 1, make: 'Hyundai', model: 'Accent' }

## Array.prototype.map(*callback*)

Map will apply a function on each of the array elements and then return
the new transformed array.

    > cars.map((car) => car.transmission = 'automatic');
    > cars
    [ { id: 1,
        make: 'Hyundai',
        model: 'Accent',
        transmission: 'automatic' },
      { id: 2,
        make: 'Hyundai',
        model: 'Elantra',
        transmission: 'automatic' } ]

See? Much easier and much readable than for loops all over the place.
Those array functions are part of ES5 so they have been available in any
major browser for quite a while now. You should use them. The arrow
functions are a ES6 feature which is [slowly getting adopted by major
browsers](http://caniuse.com/#feat=arrow-functions).
