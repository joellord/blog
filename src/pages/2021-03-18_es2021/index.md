---
path: "/blog/post/2021-03-18_es2021"
date: "2021-03-18"
title: "New Features in JavaScript with ES2021"
summary: "On March 9th, 2021, the ES2021 was officially released. Here are some of the key features for this new version of EcmaScript."
abstract: "On March 9th, 2021, the ES2021 was officially released. Here are some of the key features for this new version of EcmaScript."
author: "Joel Lord"
formattedDate: "March 18th, 2021"
keywords: ["javascript", "ecmascript", "es2021"]
banner: "puzzle"
---
If you were doing JavaScript programming in 2015, you probably remember the release of ES6 (also known as ES2015). This release was the first significant change to the language since 2009\. Since then, ECMA releases a yearly new candidate for the language. On March 9th, 2021, the ES2021 was officially released (https://github.com/tc39/ecma262/releases/tag/es2021-candidate-2021-03). Here are some of the key features for this new version of EcmaScript.

## String.prototype.replaceAll

To replace parts of a string, you can use the replace method from the String prototype object. Replace works well when there is a single element to replace. If you wanted to replace more than one substring, though, you needed a regular expression with a global match (g) modifier.

```javascript
"Apples; bananas; oranges".replace(";", ","); // "Apples, bananas; oranges"
"Apples; bananas; oranges".replace(/;/g, ","); // "Apples, bananas, oranges"
```

In this new version of EcmaScript, you can now use replaceAll with a string as the first argument to find and replace all the matches in a string.

```javascript
"Apples; bananas; oranges".replace(";", ","); // "Apples, bananas, oranges"
```

String.prototype.replaceAll() is supported is all the newest version of modern browsers ([caniuse.com](https://caniuse.com/?search=replaceAll)).

## Promise.any()

ECMA added Promises to the language in the ES6 release. The addition of this object changed the way most programmers now deal with asynchronous programming. This newly added method gives you even more flexibility when using promises. With Promise.any, you can use an array of promises and use the first response that you can get. This new feature could be helpful if you wanted to try multiple ways to do a single operation and use the quickest result. For example, the following code snippet will fetch information from a website, the localStorage and some cached data at the same time. The chained method is then triggered with the result from the fastest resolved promise.

```javascript
let cachedData = {
  value: "data"
};

let fetchPromise = new Promise((res, rej) => fetch("http://example.com").then(resp => resp.json()).then(data => res({data, from: "fetchPromise"})));
let localStoragePromise = new Promise((res, rej) => res({data: localStorage.get("value"), from: "localStoragePromise"}));
let cachePromise = new Promise((res, rej) => res({data: cachedData.value, from: "cachePromise"}));

Promise.any([fetchPromise, localStoragePromise, cachePromise]).then(data => {
  console.log(data);
});
```

In this example, the cachePromise is the quickest to resolve, and that is the promise used to log the data. Should this promise have been rejected, it would have used the next one until a resolved promise would’ve been found. Only once all the promises are rejected is an error thrown. Most major browsers support Promise.any(); Opera is the only exception at the time of writing ([caniuse.com](https://caniuse.com/?search=Promise.any)).

## Logical Assignment operator

Three new operators are also making their apparition with this new release. These new logical assignment operators are there to make it easier to assign a value to a variable based on a boolean condition. Say you want to add a value to a variable if the variable has a falsy value. Up until now, you had to do a separate check.

```javascript
if (!name) {
  name = "Joel";
}
```

You can now use the ||= operator to obtain the same result.

```javascript
name ||= "Joel";
```

The &&= operator works similarly. It will assign a value only if the current value of the variable is truthy. Finally, the ??= operator will assign a value if the variable’s value is undefined or null instead of any falsy values. These new operators are supported in most major browsers already ([caniuse.com](https://caniuse.com/?search=logical%20assignment)).

## Numeric Separator

If you ever had to deal with large numbers in your code, this is a neat new feature for you. You can now use the underscore as a numeric separator.

```javascript
let a = 1_000_000;
console.log(a + 1); // 1000001
```

The numeric separator doesn’t change anything in how JavaScript processes the numbers, but it certainly helps make those large numbers in your code much more readable. You can use the separators anywhere inside a number. The only restriction is that it can only be used between digits. It can even be used with floats if needed.

```javascript
pi = 3.141_59; // valid
pi = 3.14_159; // valid
pi = _3.14159; // invalid
pi = 3.14159_; // invalid
```

All major browsers support numeric separators already ([caniuse.com](https://caniuse.com/?search=numeric%20separator)).

## WeakRef/Finalizer

The last new feature that ECMA added to the language has to do with the garbage collector. By using a weak reference, you can tell JavaScript that the garbage collector can claim some objects. JavaScript engines have different implementations of the garbage collection mechanisms, and the actual behaviour of those new objects might differ across browsers. Furthermore, it is not fully supported by all the major navigators out there yet ([caniuse.com](https://caniuse.com/?search=weakref)). For this reason, unless you have an excellent reason to implement weakly referenced objects, it is not recommended to use them as of today. If you have to deal with large objects in your code and are willing to give it a try, it might be worth investigating these new objects in more detail.

## Summary

JavaScript certainly has come a long way since the ES6 release. ECMA’s changes with ES2021 are not as significant as the 2015 release, but they do help make JavaScript code slightly more readable and easier to use.