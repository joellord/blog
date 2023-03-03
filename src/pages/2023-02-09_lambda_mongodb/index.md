---
path: "/blog/post/2023-02-09_lambda_mongodb"
date: "2023-02-09"
title: "Morphia Java ODM for MongoDB"
summary: "Writing a serverless function using JavaScript is straightforward and similar to writing a route handler in Express.js."
abstract: "Writing a serverless function using JavaScript is straightforward and similar to writing a route handler in Express.js."
author: "Joel Lord"
formattedDate: "February 9, 2023"
keywords: ["mongodb", "aws", "lambda"]
banner: "puzzle"
originalSource: "MongoDB Dev Center"
originalUrl: "https://www.mongodb.com/developer/languages/javascript/lambda-nodejs/"
---

JavaScript has come a long way since its modest debut in the 1990s. It has been the most popular language, according to the [Stack Overflow Developer Survey](https://survey.stackoverflow.co/2022/), for 10 years in a row now. So it's no surprise that it has emerged as the most popular language for writing serverless functions.

Writing a serverless function using JavaScript is straightforward and similar to writing a [route handler](https://expressjs.com/en/guide/routing.html) in [Express.js](https://expressjs.com/). The main difference is how the server will handle the code. As a developer, you only need to focus on the handler itself, and the cloud provider will maintain all the infrastructure required to run this function. This is why serverless is getting more and more traction. There is almost no overhead that comes with server management; you simply write your code and deploy it to the cloud provider of your choice.

This article will show you how to write an AWS Lambda serverless function that connects to  MongoDB Atlas to query some data and how to avoid common pitfalls that would cause poor performance.

## Prerequisites

For this article, you will need basic JavaScript knowledge. You will also need:

-   A [MongoDB Atlas database](https://mdb.link/try) loaded with [sample data](https://www.mongodb.com/docs/atlas/sample-data/) ([a free tier is good](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)).

-   An [AWS](https://aws.amazon.com/) account.

## Creating your first Lambda function

To get started, let's create a basic lambda function. This function will be used later on to connect to our MongoDB instance.

In AWS, go to the Lambda service. From there, you can click on the "Create Function" button. Fill in the form with a name for your function, and open the advanced settings.

Because you'll want to access this function from a browser, you will need to change these settings:

-   Check the "Enable function URL" option.

-   Under "Auth Type," pick "NONE."

-   Check the "Configure cross-origin resource sharing (CORS)" box.

Now click "Create Function" and you're ready to go. You will then be presented with a screen similar to the following.

![A screenshot of the AWS Lambda code editor](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2023_02_01_at_3_33_19_PM_4f02084fb5.png)

You can see a window with some code. This function will return a 200 (OK) status code, and the body of the request will be "Hello from Lambda!".

You can test this function by going to the "Configuration" above the code editor. Then choose "Function URL" from the left navigation menu. You will then see a link labeled "Function URL." Clicking this link will open a new tab with the expected message.

If you change the code to return a different body, click "Deploy" at the top, and refresh that second tab, you will see your new message.

You've just created your first HTTPS endpoint that will serve the response generated from your function.

## Common pitfalls with the Node.js driver for MongoDB

While it can be trivial to write simple functions, there are some considerations that you'll want to keep in mind when dealing with AWS Lambda and MongoDB.

### Storing environment variables

You can write your functions directly in the code editor provided by AWS Lambda, but chances are you will want to store your code in a repository to share with your team. When you push your code, you will want to be careful not to upload some of your secret keys. With your database, for example, you wouldn't want to push your connection string accidentally. You could use an environment variable for this.

From the AWS Lambda screen, go into the "Configuration" tab at the top, and pick "Environment Variables" from the left navigation bar. Click "Edit," and you will be presented with the option to add a new environment variable. Fill in the form with the following values:

-   Key: MONGODB_CONNECTION_STRING

-   Value: This is a connection string

Now go back to the code editor, and use the `process.env` to return the newly created environment variable as the body of your request.

```javascript
export const handler = async(event) => {
    const response = {
        statusCode: 200,
        body: process.env.MONGODB_CONNECTION_STRING,
    };
    return response;
};
```

If you refresh the tab you opened earlier, you will see the value of that environment variable. In the example below, you will change the value of that environment variable to connect to your MongoDB Atlas database.

### Connection pool

When you initialize a `MongoClient` with the Node.js driver, it will create a pool of connections that can be used by your application. The MongoClient ensures that those connections are closed after a while so you don't reach your limit.

A common mistake when using MongoDB Atlas with AWS Lambda is creating a new connection pool every time your function gets a request. A poorly written function can lead to new connections being created every time, as displayed in the following diagram from the Atlas monitoring screen.

![A chart showing a sudden peak in the number of connections to the database](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2022_12_21_at_11_37_00_AM_81c05d431a.png)

That sudden peak in connections comes from hitting a Lambda function every second for approximately two minutes.

The secret to fixing this is to move the creation of the MongoDB client outside the handler. This will be shown in the example below. Once the code has been fixed, you can see a significant improvement in the number of simultaneous connections.

![A chart showing a peak in the number of connections, followed by a normal trend](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/Screen_Shot_2022_12_21_at_12_00_46_PM_fd21e08607.png)

Now that you know the pitfalls to avoid, it's time to create a function that connects to MongoDB Atlas.

## Using the MongoDB Node.js driver on AWS Lambda

For this example, you can use the same function you created earlier. Go to the "Environment Variables" settings, and put the connection string for your MongoDB database as the value for the "MONGODB_CONNECTION_STRING" environment variable. You can find your connection string in the [Atlas UI](https://www.mongodb.com/docs/guides/atlas/connection-string/).

Because you'll need additional packages to run this function, you won't be able to use the code editor anymore.

Create a new folder on your machine, initialize a new Node.js project using `npm`, and install the `mongodb` package.

```bash
npm init -y
npm install mongodb
```

Create a new `index.mjs` file in this directory, and paste in the following code.

```javascript
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING);
export const handler = async(event) => {
    const db = await client.db("sample_mflix");
    const collection = await db.collection("movies");
    const body = await collection.find().limit(10).toArray();
    const response = {
        statusCode: 200,
        body
    };
    return response;
};
```

This code will start by creating a new MongoClient. Note how the client is declared *outside* the handler function. This is how you'll avoid problems with your connection pool. Also, notice how it uses the connection string provided in the Lambda configuration rather than a hard-coded value.

Inside the handler, the code connects to the `sample_mflix` database and the `movies` collection. It then finds the first 10 results and converts them into an array.

The 10 results are then returned as the body of the Lambda function.

Your function is now ready to be deployed. This time, you will need to zip the content of this folder. To do so, you can use your favorite GUI or the following command if you have the `zip` utility installed.

```bash
zip -r output.zip .
```

Go back to the Lambda code editor, and look for the "Upload from" button in the upper right corner of the editor. Choose your newly created `output.zip` file, and click "Save."

Now go back to the tab with the result of the function, and hit refresh. You should see the first 10 documents from the `movies` collection.

## Summary

Using AWS Lambda is a great way to write small functions that can run efficiently without worrying about configuring servers. It's also a very cost-effective way to host your application since you only pay per usage. You can find more details on how to build Lambda functions to connect to your MongoDB database in the [documentation](https://www.mongodb.com/docs/atlas/manage-connections-aws-lambda/).

If you want a fully serverless solution, you can also run MongoDB as a [serverless](https://www.mongodb.com/use-cases/serverless) service. Like the Lambda functions, you will only pay for a serverless database instance based on usage.

If you want to learn more about how to use MongoDB, check out our [Community Forums](https://community.mongodb.com).