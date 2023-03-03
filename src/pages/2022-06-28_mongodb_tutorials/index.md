---
path: "/blog/post/2022-06-28_mongodb_tutorials"
date: "2022-06-28"
title: "MongoDB Tutorials: Basic & Advanced Guides"
summary: "MongoDB is a database that is both natural and intuitive for software developers. However, there are some key differences between MongoDB and traditional SQL databases."
abstract: "MongoDB is a database that is both natural and intuitive for software developers. However, there are some key differences between MongoDB and traditional SQL databases."
author: "Joel Lord"
formattedDate: "June 28, 2022"
keywords: ["mongodb", "tutorials"]
banner: "facade"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/mongodb-tutorials"
---

MongoDB is a database that is both natural and intuitive for software developers. However, there are some key differences between MongoDB and traditional SQL databases. This page contains a collection of MongoDB [tutorials](https://www.mongodb.com/developer/tutorials/) that will help you get started with MongoDB.

Learn MongoDB basics
--------------------

If you are new to MongoDB, you can get started with these tutorials aimed at developers with little to no experience of MongoDB.

### Getting started with MongoDB

The [Getting Started page](https://docs.mongodb.com/manual/tutorial/getting-started/) from the MongoDB documentation explains how to insert and query data from a MongoDB collection. If you are new to MongoDB, this is an excellent place to start to understand how to use the document database.

### Create a database in MongoDB

If you prefer to explore MongoDB by yourself, you can start by following the tutorial to [create a database](https://www.mongodb.com/basics/create-database). The easiest way to use MongoDB is with Atlas, the cloud offering by MongoDB. A tutorial is available to guide you through the steps of creating your Atlas instance for free. Once you have a database up and running, you can follow the steps to [load some sample data](https://www.mongodb.com/docs/atlas/sample-data/) for you to explore.

### Import data to your database

If you already have a dataset that you want to use, you can use mongoimport to help you import this data into your collection. We also have a tutorial that will guide you step by step on how to [import data into MongoDB](https://www.mongodb.com/developer/products/mongodb/mongoimport-guide/) with the mongoimport tool.

Advanced MongoDB tutorials
--------------------------

If you are a more experienced MongoDB user, you might want to look into some of these more advanced tutorials.

### Integrating MongoDB Change Streams with Socket.IO

In this post, you will learn [how to use change streams](https://www.mongodb.com/developer/products/mongodb/mongo-socket-chat-example/) and Socket.io, a Node.js library for WebSocket communication, to build a chat application. This tutorial covers the basics of the library, along with all the code needed to use it with MongoDB change streams.

### Building a multi-environment continuous delivery pipeline for MongoDB Atlas

If you would like to learn more about how to automate Atlas cluster creation in your CI/CD pipeline, this MongoDB tutorial is for you. Here, the authors describe using AWS to [create multi-environment databases](https://www.mongodb.com/developer/products/atlas/building-multi-environment-continuous-delivery-pipeline-mongodb-atlas/) using a CI/CD pipeline.

### How to query from multiple MongoDB databases using MongoDB Atlas Data Lake

MongoDB offers many options when it comes to querying your data. You can even query multiple databases using the Atlas Data Federation---previously known as Data Lake. You can find out more by following this [tutorial](https://www.mongodb.com/developer/products/atlas/query-multiple-databases-with-atlas-data-lake/).

Connect to MongoDB
------------------

MongoDB is a flexible solution that enables multiple sources and third parties to connect directly to it. You can integrate with MongoDB through different applications using the various [connectors](https://www.mongodb.com/connectors) available.

### Kafka to MongoDB Atlas end-to-end tutorial

Apache Kafka is an event streaming platform that can process vast amounts of data. It can connect directly to a MongoDB database by using the provided connectors. This tutorial will teach you [how to use MongoDB as a sink and a source](https://www.mongodb.com/developer/products/mongodb/kafka-mongodb-atlas-tutorial/) with a Kafka instance.

### Manage Atlas from the Atlas CLI

There are many ways to connect to an Atlas cluster. If you are looking for CLI alternatives, the new Atlas CLI is a tool that lets you create, manage, and configure Atlas clusters from your terminal. You can find out more about it by following this MongoDB [tutorial](https://www.mongodb.com/docs/atlas/cli/stable/atlas-cli-tutorials/).

### How to use the MongoDB Visual Studio Code plugin

Even your favorite IDE can connect to a MongoDB database. Using the Visual Studio Code plugin, you can connect to a MongoDB database and work with your data directly from your code editor. Learn [how to connect to MongoDB within VS Code](https://www.mongodb.com/developer/products/mongodb/mongodb-visual-studio-code-plugin/).

Installation and setup guides
-----------------------------

With MongoDB Atlas, the cloud offering by MongoDB, you don't need to bother about installation and complex setup. It offers a multitude of configuration options out of the box.

These tutorials show you how to make the most of your Atlas clusters.

### Create a multi-cloud cluster with MongoDB Atlas

To ensure that your data is always available, you will need to use multiple clouds. This way, you don't have a single point of failure. This tutorial shows you [how to deploy Atlas across multiple clouds](https://www.mongodb.com/developer/products/atlas/setup-multi-cloud-cluster-mongodb-atlas/) to ensure maximal availability, even if one of the major cloud providers goes down.

### CIDR subnet selection for MongoDB Atlas

When your database is hosted on the same cloud provider as your back-end application, you can create a secure communication channel between your app and your database. Learn [how to add VPC peering to your cluster](https://www.mongodb.com/developer/products/atlas/cidr-subnet-selection-atlas/) by following the steps in the tutorial.

### Setting up sharding

One of the main advantages of MongoDB is its ability to scale horizontally easily. This is called sharding. In this guide, you can find [all the information about sharding](https://www.mongodb.com/docs/manual/sharding/) and how to implement it in your cluster.

Tutorials with MongoDB supported languages
------------------------------------------

Once you know the basics of MongoDB, you will want to connect your application to a MongoDB database. Most languages have a tutorial available in the [developer center](https://www.mongodb.com/developer/) or the [documentation](https://www.mongodb.com/docs/drivers/). MongoDB offers quickstarts and tutorials for many popular programming languages such as [Node.js](https://www.mongodb.com/docs/drivers/node/current/quick-start/), [Python](https://pymongo.readthedocs.io/en/stable/tutorial.html), [C#](https://www.mongodb.com/languages/how-to-use-mongodb-with-dotnet), and [many more](https://www.mongodb.com/languages). Tutorials are also available for popular frameworks and libraries.

### How to use MERN Stack: a complete guide

MongoDB works well with JavaScript, both on the front end and the back end. In this guide, learn [how to use MongoDB with Express](https://www.mongodb.com/languages/mern-stack-tutorial), Node.js, and React to build MERN stack applications.

### Create a RESTful API with .NET Core and MongoDB

If you want to learn more about using MongoDB with C#, this tutorial is perfect for you. This guide will teach you [how to perform CRUD operations](https://www.mongodb.com/developer/languages/csharp/create-restful-api-dotnet-core-mongodb/) in C# against a MongoDB database.

### How to integrate MongoDB into your Next.js app

Next.js is a new React framework that helps developers work faster. In this MongoDB tutorial, you will learn [how to use the Next.js and MongoDB integration](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/) to make it as easy as possible to use the document database in your Next.js application.

MongoDB Atlas products and features
-----------------------------------

MongoDB is more than just a database; it's an entire developer data platform with products that facilitate software development regarding anything that has to do with data. Check out these tutorials to learn more about those features.

### Building an E-commerce content catalog with Atlas Search

In this tutorial, you will learn [how to add full-text search capabilities to your application](https://www.mongodb.com/developer/products/atlas/building-e-commerce-content-catalog-atlas-search/) so your users can browse through a catalog of products. You will also learn how to use Atlas Search, a full-text search engine built on top of Lucene, to add fuzzy search and autocompletion to your search form.

### Accessing Atlas data in Postman with the Data API

MongoDB offers a REST-like interface to access your data. This tutorial guides you through the [process of enabling the Data API](https://www.mongodb.com/developer/products/atlas/data-api-postman/) on your cluster and how to test it using Postman, the API platform for software developers.

### MongoDB Atlas Data Lake setup

MongoDB Atlas Data Lake, now called [Data Federation](https://www.mongodb.com/docs/atlas/data-federation/), is a way to store data across multiple sources---including S3 buckets, Atlas clusters, and data lakes---and query it as if it was another collection in your database. Learn [how to set up Data Federation](https://www.mongodb.com/developer/products/atlas/atlas-data-lake-setup/) with the step-by-step tutorial.

Summary
-------

MongoDB provides a lot of tutorials and free online courses to help you quickly learn about the data developer platform. From basic content to advanced topics, you're sure to find the information you need in the Dev Center, our documentation, or on our [Youtube channel](https://www.youtube.com/user/mongodb). If you are ready to try it out with an actual MongoDB instance, you can get started right away for free on Atlas.