---
path: "/blog/post/2019-02-13_enterphone_nexmo"
date: "2019-02-13"
title: "Getting My Enterphone To Work With Nexmo"
summary: "I’ve recently moved to Toronto. Moving to the big city meant for me to move from a house into a condo tower. For the first time, I actually had an Enterphone to let my guests into the building."
abstract: "I’ve recently moved to Toronto. Moving to the big city meant for me to move from a house into a condo tower. For the first time, I actually had an Enterphone to let my guests into the building."
author: "Joel Lord"
formattedDate: "February 13th, 2019"
keywords: ["javascript", "webtask", "nexmo", "enterphone"]
banner: "leaves"
originalSource: "Auth0's Blog"
originalUrl: "https://auth0.com/blog/getting-my-enterphone-to-work-with-nexmo-and-webtask/"
---

I’ve recently moved to Toronto. Moving to the big city meant for me to move from a house into a condo tower. For the first time, I actually had an Enterphone to let my guests into the building.

I moved here from the Ottawa area, which meant that my old phone number is technically a long-distance call. Now I didn’t want to change my phone number because I have 2FA enabled on most of my web accounts that will let me use it. Long distance fees don’t really exist on cell phones anymore but the problem is that the system they use for the Enterphone in my building cannot dial long distance numbers.

Another limitation that the system had is that we can only have one entry in the system. While this is usually okay for most people, between my work as a technical evangelist and my wife who is a flight attendant, there are many times when there is only one of us at home.

With all of that in mind, our building manager suggested that we get a basic landline that we could use only for the Enterphone.

Sure, but what’s the fun in that?

## Introducing Nexmo

I’ve had the chance to meet the Nexmo folks at various conferences throughout the year so this felt like the perfect occasion to take their platform for a spin.

[Nexmo’s platform](https://www.nexmo.com/) provides a comprehensive set of tools and experiences that allows developers to programmatically control a virtual phone number that is assigned to your account. From there, you can make calls, send SMS messages or, most importantly, control what to do when a call is received.

My first idea was to build a website where I could decide which number the calls from the Enterphone would be forwarded to. I didn’t find any real easy way to do this. Furthermore, it added the complexity of having to change the person the calls were forwarded to each time my wife or myself were either coming back from a trip or leaving for work.

I finally stumbled on a way to create conversations, essentially a conference call. I decided to build a serverless function that would answer the calls to my Nexmo number. If the person calling that number was the Enterphone, I would dial in both my cell phone and my wife’s and get everyone in a conference call. This way, we would both get called and either one of us would be able to open the door for our guests.

## Setting Up the Serverless Endpoint

Because I didn’t want to be bothered with any server setup whatsoever, I decided to use [Webtask.io](https://webtask.io/), a platform that allows you to build serverless endpoints, also known as functions as a service. This made it simple for me to build a quick Node.js function that would answer my call.

I went ahead and created my Webtask. I then copied the URL for this serverless endpoint and pasted it as my “Answer URL” in my Nexmo application.

While I was in my Nexmo dashboard, I copied the following: 

* API key
* API secret
* Application ID
* Private key 

as constants in my Webtask. I also added a constant for the Webtask as I will be using this later in the code. Finally, I also added a bunch of phone numbers as constants just to make my code easier to read afterward. The phone numbers involved were my own cell phone (JOEL_NUMBER), my wife’s phone (NATACHA_NUMBER), the Enterphone (ENTERPHONE_NUMBER) and finally my Nexmo virtual number (NEXMO_NUMBER).

```javascript
const API_KEY = "APIKEY";
const API_SECRET = "SECRET";
const APP_ID = "APPID";

const JOEL_NUMBER = "12345678901";
const NATACHA_NUMBER = "12345678901";
const NEXMO_NUMBER = "12345678901";
const ENTERPHONE_NUMBER = "12345678901";

const ANSWER_URL = "https://wt-13aebf4eeaa9913542725d4a90e4d49e-0.sandbox.auth0-extend.com/enterphone-inbound";

const PRIVATE_KEY_CONTENTS = "-----BEGIN PRIVATE KEY-----" + "..." + "-----END PRIVATE KEY-----";

module.exports = function(context, cb) {

  cb(null, resp);
};
```

> Note: I’ve used my private key directly in the code here for the sake of simplicity but it should be stored on a server and this should be the URL for the file itself.

## Handling the Call

Now that all my constants are defined, it’s time to write the code that will handle the calls. In order to create a conversation, I can use [NCCO (Nexmo Call Control Object)](https://developer.nexmo.com/voice/voice-api/guides/ncco). NCCO are the instructions that are returned to the Nexmo API in JSON format.

When a call comes into the virtual number, I can return the following JSON from my Webtask to create a conference call.

```javascript
module.exports = function(context, cb) {
  let ncco = [];
  
  ncco.push({
    "action": "conversation",
    "name": "enterphone"
  });

  cb(null, ncco);
};
```

Now everyone that dials into this number will be connected to the conversation called “enterphone”. That could work if I knew that someone was coming but I would need to be connected to the conference number at all times. This was not very convenient for what I was trying to accomplish.

The next step was to verify who was calling. If it was the Enterphone, it would call both cell phones from the Nexmo virtual number. This way, when they answer, they are connected to the conference call. In order to call the numbers, I used the npm library for the [Nexmo API](https://www.npmjs.com/package/nexmo). At the top of my Webtask, I imported the npm module.

```javascript
const Nexmo = require('nexmo');
```

I also added the module to my Webtask from the “NPM Modules” section of the settings.

Then, in my main function, I added the code to call the two numbers.

```javascript
nexmo.calls.create({
    to: [{
      type: 'phone',
      number: JOEL_NUMBER
    }],
    from: {
      type: 'phone',
      number: NEXMO_NUMBER
    },
    answer_url: [ANSWER_URL]
  });
```

Because the configuration to call both numbers was exactly the same for our two cell phones (apart from the number, obviously), I added a quick helper function that would generate the configuration object:

```javascript
function callOptions(number) {
  return {
    to: [{
      type: 'phone',
      number: number
    }],
    from: {
      type: 'phone',
      number: NEXMO_NUMBER
    },
    machine_detection: "hangup",
    answer_url: [ANSWER_URL]
  }
}
```

I then added the code to call our two numbers:

```javascript
nexmo.calls.create(callOptions(JOEL_NUMBER));
nexmo.calls.create(callOptions(NATACHA_NUMBER));
```

## Testing My Setup

When I tested this call, I realized that I had sent the whole system into an infinite loop. Each time it called one of the two numbers, the serverless function would dial the two numbers again, which would then call the two numbers and so on… I ended up filling up my voicemail with messages of my own voicemail asking me to leave a message.

In order to fix this issue, I needed to change this code so that it would only call the two cell phones when the call was from the Enterphone. My code now looked like this:

```javascript
const Nexmo = require('nexmo');

// Define numbers

// Define API keys

// Define Answer URL

function callOptions(number) {
  return {
    to: [{
      type: 'phone',
      number: number
    }],
    from: {
      type: 'phone',
      number: NEXMO_NUMBER
    },
    answer_url: [ANSWER_URL]
  }
}

module.exports = function(context, cb) {

  let ncco = [];
  
  // When the enterphone calls this number, dial in Joel and Natacha
  if (context.data.from == ENTERPHONE_NUMBER) {
    const nexmo = new Nexmo({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
      applicationId: APP_ID,
      privateKey: (PRIVATE_KEY_CONTENTS),
    });
    
    nexmo.calls.create(callOptions(JOEL_NUMBER));
    nexmo.calls.create(callOptions(NATACHA_NUMBER));
  }

  // In either case, go ahead add connect to the conference call
  ncco.push({
    "action": "conversation",
    "name": "enterphone"
  });

  cb(null, ncco);
};
```

## It Works, But…

The code now works. I was able to use this code on my virtual number to get my Enterphone to work. It calls both of our phone numbers and we are both able to dial “9” to unlock the front door. All of this was fairly easy and without a lot of configuration but now I had a few minor problems.

First, when one of us didn’t answer, the other phone’s voicemail would connect to the conference call and record the conversation and about a minute of silence. It was also weird to hear the “Hi, you’ve reached the voicemail of Joel” in the Enterphone.

The other issue we had was with the time it took to actually initiate the conference call. It took a few seconds to initiate the call from the Enterphone, then the Nexmo virtual number would silently answer and dial us in, and then we would answer after a few rings. All of this lead up to having about 30 seconds of silence before someone actually answered the Enterphone. Surely we can do better.

## Avoiding the Voicemail

During my latest conference, I actually ran into one of the developer advocates from Nexmo. It turns out that avoiding the voicemail is actually quite simple. All I had to do was to add an option to my `nexmo.call.create` method. Because I am using a helper function for this, it was just a matter of adding this:

```javascript
machine_detection: "hangup",
```

...into the object that is returned by the `callOptions` function. This tells Nexmo to hang up when it detects that whatever answers the call is a machine. 

Problem fixed!

## Fixing That Long Wait

All of that waiting is a little bit awkward when you dial the Enterphone and you just stand there in the entrance. But there is not much we can do, right? All of those waiting times are kind of a necessary evil. 

It’s always about the perception. That wait only feels long because you look at a blank screen, listening to some silence. In order to help with this, I added a new item to my NCCO. When the number calling in is the Enterphone, I added the following:

```javascript
ncco.push({
  "action": "talk",
  "text": "Calling Joel and Natacha"
});
```

This way, the person waiting downstairs actually hears the Enterphone say something before it calls our cell phones. It definitely helps with the sense of, “Is something happening?”.

## A Little Bonus

As I was working on this code, I got a spam call to the number that is connected to my Enterphone. Those are so annoying. Now if I had a landline, there wouldn’t be much I could do about it. But thanks to the magic of the Internet and with a little bit of JavaScript, I simply check who the caller is and reject the calls right at the beginning of my function:

```javascript
let authorizedNumbers = [NEXMO_NUMBER, JOEL_NUMBER, NATACHA_NUMBER, ENTERPHONE_NUMBER];
  if (authorizedNumbers.indexOf(context.data.from) == -1) {
    // Spam caller ! Abort !
    return cb("Unauthorized number");
  }
```

So now, if a spam caller tries the number, it simply hangs up.

Here's an idea for a future project: connect the spammers to a machine learning algorithm and a conversational interface that will mislead them into a conversation that would last as long as possible to waste their time.

## In Summary

The Nexmo API is very easy to use and made all of this call management possible with very minimal configuration. I was able to use Webtask to easily create a serverless function and to use JavaScript, which I am familiar with. The two together worked like a charm. Most importantly, I now have a working Enterphone and both myself or my wife can unlock the building front door, even when we are not at home.
