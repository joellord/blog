---
path: "/blog/post/2016-03-18_event_loop"
date: "2016-03-18"
title: "The Node Event Loop"
summary: "Coffee shops and the Node event loop"
abstract: "The Node event loop is the core concept behind Node's performance.  Here is a little metaphor that will hopefully help you understand a little bit more about it."
author: "Joel Lord"
formattedDate: "March 18th, 2016"
banner: "loop"
keywords: ["javascript", "node", "event loop"]
---
One of the biggest hesitation from Java developers in adopting NodeJs is
the fact that it’s single threaded. So how come so many large companies
have still decided to use NodeJs as their backend infrastructure? Well,
the NodeJs is single threaded but it relies on its event loop to
delegate work asynchronously.

## So what does that mean?

I am currently writing this from a small local coffee shop. This place
is a great place to work from. It’s rather quiet during the weekdays
afternoons and they have a great wifi connection. Because it’s rather
quiet, they only have 1 employee during the day. When I get to the
counter, the employee takes my order, goes to the coffee machine to do
my coffee and then comes back to the counter with my coffee, tells me
the total and I pay using my card.

## So what about this other major coffee chain?

If you’ve been to this fancy very large coffee shop lately, you might
have noticed that things work a bit differently. Over there, you go to
the counter, order your “Triple, Venti, Soy, No Foam Latte”, the clerk
asks for your name and yells your order to the other employee that is in
charge of the coffee machine. You then pay and go wait for your coffee a
little further away. Once the coffee is ready, the employee at the
counter will call your name and you can pick up your coffee.

## Enough about the coffee metaphor

The local coffee shop acts like a Java server. You have one process that
is triggered every time a request comes in. This process then does
multiple things and ends. This causes this process to have a lot of idle
time. It is also synchronous. Everything happens one after the other in
an order that you would more or less expect it to happen.

Now, say that the owner wanted to be able to serve more people at once.
He could add another employee with it’s own cash register, coffee
machine and credit card machine so that if someone arrives at the same
time as I do, both employees will be able to simultaneously serve the
two of us.

The larger chain works like a Node server. The main employee delegates
an i/o task to the coffee maker and then continues with his normal tasks
which is to make you pay. Once the coffee is ready, the employee calls
your name and you receive your coffee asynchronously (that’s the call
back).

Now, if they need to speed up things a little bit during the rush hour,
they will add another person at the coffee machine but won’t necessarily
add another cashier because the latter is not blocked by the espresso
maker.

Node uses this event loop to allow multiple things to happen at once.
This makes it much easier for developers to build scalable systems
without worrying about locks. Despite the fact that Node does not use
threads, you can still take advantage of the multiple cores on your
server by using child processes (see the [blog
article](/blog/post/2016-03-05_using_cluster)).
