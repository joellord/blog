---
path: "/blog/post/2022-10-04_realtime_change_streams"
date: "2022-10-04"
title: "Real Time Data in a React JavaScript Front-End with Change Streams"
summary: "Whether an IoT sensor reporting a value, a stock value that you want to track, or a chat application, you will want the data to automatically update your UI."
abstract: "Whether an IoT sensor reporting a value, a stock value that you want to track, or a chat application, you will want the data to automatically update your UI."
author: "Joel Lord"
formattedDate: "October 4, 2022"
keywords: ["mongodb", "change streams", "react"]
banner: "shelf"
originalSource: "MongoDB Dev Center"
originalUrl: "https://www.mongodb.com/developer/products/mongodb/real-time-data-javascript/"
---

In many applications nowadays, you want data to be displayed in real time. Whether an IoT sensor reporting a value, a stock value that you want to track, or a chat application, you will want the data to automatically update your UI. This is possible using MongoDB Change Streams with the Realm Web SDK.

In this tutorial, you will learn how to use the Realm Web SDK to display changes in a collection as they happen.

Pre requisites
--------------

To follow this tutorial, you will need an Atlas cluster. The free tier will be more than enough for the needs of this tutorial. If you don't already have one, you can find the instructions on creating a cluster in the [documentation](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/).

Once you have a cluster, [create](https://www.mongodb.com/docs/atlas/atlas-ui/collections/#create-a-collection) a new database called `data`, with a collection `changestream`.

You will also need an app from Application Services. The instructions to create a new application can also be found in the [documentation](https://www.mongodb.com/docs/atlas/app-services/manage-apps/create/create-with-ui/). Follow the instructions to create a new app without a template.

Configuring your Atlas App Services application
-----------------------------------------------

This application will display any operation that is performed on a specific collection. To do so, we will need to configure rules about who has access to the data (everybody) and how the users will authenticate (anonymously).

### Note your application id

You will need your application ID when you start building your application. When you first open the application (or by clicking the navigation bar item with the name of your application), you will see the home page with the information about this application. Right at the top, you will notice a field labelled "App ID." This is your application id. 

![Screenshot of the application id field in Atlas App Services](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2022_09_22_at_3_32_41_PM_203e8b7a9d.png)
You can either copy and paste it somewhere or just come back to this screen later when you'll need it.

### Update the rules

From the left navigation menu in Atlas App Services, look for the "Rules" item. This will list all your databases and collections in the cluster associated with this application. Choose the `data` database and the `changestream` collection. You will be prompted to create a new role for this collection.

![Screenshot of the rules UI in Atlas App Services](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2022_09_22_at_3_12_19_PM_cf03e2f6f1.png)

Use the `readAll` preset, and then click on the "Add preset role" button. This will create a new role that will have complete read access to the data in this collection. If you wanted to create a role that has only access to data owned by the user, this could be done with a custom role here.

### Configure authentication

For this application, we won't require authentication, which means that any visitor to this website will have access to all the data. In our case, this is what we want, but in a production application, you might want to configure a real authentication provider.

In the left navigation bar, click on the "Authentication" item. In the displayed table, look for the "Allow users to log in anonymously" row.

![Screenshot of the authentication providers](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2022_09_22_at_3_16_23_PM_a0743cf1a8.png)

Click on the "Edit" button. On the next screen, toggle the "Provider Enabled" button to turn it on. After you click the Save button, go back to the authentication providers page and make sure it's enabled.

### Deploy your changes

That's all you need in the Atlas App Services UI for now. Look for the blue bar at the top of the screen.

![Screenshot of a message asking to review and deploy the changes](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2022_09_22_at_3_18_17_PM_b495a94da9.png)

Click that "Review draft & deploy" button, and accept the changes.

Your application is now ready to be used.

Build the React application
---------------------------

We will start with a blank React application generated with the `create-react-app` tool for this application.

In your terminal, run the following command.

```bash

npx create-react-app realm-web-changestreams

```

Next, install the required library to use the Realm Web SDK, and start the application.

```bash

cd realm-web-changestreams
npm install realm-web
npm start

```

This will open up a browser window with the application running in it. With your favourite code editor, open up the source code for this application, and look for the _App.js_ file.

You will replace the entire content of this file so you can go ahead and delete everything there.

Now, start with this boilerplate code for your _App.js_ file.

```js

import  React, {useState, useEffect} from  "react"
import  *  as  Realm  from  "realm-web";

// Create the Application

// Define the App component

const  App = () => {
 // Set state variables

 // This useEffect hook will run only once when the page is loaded

 useEffect(() => {

 }, []);

 // Return the JSX that will generate HTML for the page

 return (
   <div  className="App">

   </div>
 );
};

export  default  App;

```

Under the comment _Create the Application_, enter the following.

```js

// Create the Application

const  app = new  Realm.App({ id:  "<YOUR_APP_ID>"});

```

This will instantiate your Atlas application. Don't forget to change the id to the identifier for your application.

Next, we will need two state variables. The first one —`user`— will contain the user object created by the Realm SDK once authenticated. The second one —`events`— will contain any new event from the database. Those events will be operations (create, update, or delete) performed on the database, along with the `_id` of the document and the full document.

Add the following code after the _Set state variables_ comment.

```js

 // Set state variables
 const [user, setUser] = useState();
 const [events, setEvents] = useState([]);

```

Next up is the `useEffect` function. Here, you will create a function called `login` that will authenticate anonymously to the application. It will then update the user object in the state.

```js

 // This useEffect hook will run only once when the page is loaded

 useEffect(() => {
   const  login = async () => {
     // Authenticate anonymously
     const  user = await  app.logIn(Realm.Credentials.anonymous());
     setUser(user);

     // Connect to the database
     const  mongodb = app.currentUser.mongoClient("mongodb-atlas");
     const  collection = mongodb.db("data").collection("changestream");

     // Everytime a change happens in the stream, add it to the list of events
     for  await (const  change  of  collection.watch()) {
       setEvents(events  => [...events, change]);
     }
   }
   login();
 }, []);

```

Finally, change the JSX code to render a table with the events.

```js

// Return the JSX that will generate HTML for the page
 return (
   <div  className="App">
       {!!user &&
       <div  className="App-header">
         <h1>Connected as user ${user.id}</h1>
         <div>
           <p>Latest events:</p>
           <table>
             <thead>
             <tr><td>Operation</td><td>Document Key</td><td>Full Document</td></tr>
             </thead>
             <tbody>
           {events.map((e, i) => (
             <tr  key={i}><td>{e.operationType}</td><td>{e.documentKey._id.toString()}</td><td>{JSON.stringify(e.fullDocument)}</td></tr>
           ))}
           </tbody>
           </table>
         </div>
       </div>
       }
   </div>
 );

```

That's all you need for your application. If you look at your browser, you should see the application running.

Testing the application
-----------------------

In the Atlas UI, go ahead and create, edit, or delete items from the _changestream_ collection. As you do those operations, you should see your new web application displaying each of those operations in real time as they happen.

![Screenshot of the application in action](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2022_09_22_at_4_11_26_PM_33a81940e5.png)

>Note: When running this application, you might notice that some of the events are duplicated. This is due to the [React.StrictMode](https://reactjs.org/docs/strict-mode.html) tool which does a second pass on your code to notify you of any errors. This only happens in production, and won't happen if you run `npm run build`.

What about vanilla JavaScript?
------------------------------

The same application can be rewritten in plain old JavaScript under 50 lines. The main differences with the React application are that the `realm-web` is loaded via a script tag and that the code to build the table doesn't use JSX.

```html

<html>
 <body>
   <h1>Connected as user $<span  id="userId"></span></h1>
   <div>
     <p>Latest events:</p>
     <table>
       <thead>
         <tr><td>Operation</td><td>Document Key</td><td>Full Document</td></tr>
       </thead>
       <tbody  id="tableBody"></tbody>
     </table>
   </div>
 </body>

 <!-- Import the Realm Web SDK -->
 <script  src="https://unpkg.com/realm-web/dist/bundle.iife.js"></script>

 <script>
   const  main = async () => {
     //Create the application
     const  app = new  Realm.App({ id:  "application-1-abcde" });

     // Authenticate anonymously
     const  user = await  app.logIn(Realm.Credentials.anonymous());
     document.querySelector("#userId").textContent = user.id;

     // Connect to the database
     const  mongodb = app.currentUser.mongoClient("mongodb-atlas");
     const  collection = mongodb.db("data").collection("changestream");

     // Everytime a change happens in the stream, add it to the list of events
     for  await (const  change  of  collection.watch()) {
       let  operationCell = document.createElement("td");
       operationCell.textContent = change.operationType;
       let  keyCell = document.createElement("td");
       keyCell.textContent = change.documentKey._id.toString();
       let  fullDocumentCell = document.createElement("td");
       fullDocumentCell.textContent = JSON.stringify(change.fullDocument);
       let  eventRow = document.createElement("tr");
       eventRow.appendChild(operationCell);
       eventRow.appendChild(keyCell);
       eventRow.appendChild(fullDocumentCell);
       let  tableBody = document.querySelector("#tableBody");
       tableBody.appendChild(eventRow);
     }
   }
   main();
 </script>
</html>

```

Summary
-------

Change streams are a very powerful feature in MongoDB. They let you create applications that display and react to information in real time without needing a back-end.

If you want a little bit of an additional challenge, how about you build a chat application using Change Streams? Add a form that will use an [Atlas HTTPS endpoint](https://www.mongodb.com/docs/atlas/app-services/data-api/custom-endpoints/) to add entries to the database, and then list the chat messages by listening for new changes in the collection.