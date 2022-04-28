---
path: "/blog/post/2022-03-14_stored_procedures_mongodb"
date: "2022-03-14"
title: "Stored Procedures in MongoDB"
summary: "Stored procedures are used in relational databases to ensure that complex query operations are executed at the database layer. Nowadays, the need for stored procedures is replaced by other more advanced techniques, such as the aggregation pipelines available in MongoDB."
abstract: "Stored procedures are used in relational databases to ensure that complex query operations are executed at the database layer. Nowadays, the need for stored procedures is replaced by other more advanced techniques, such as the aggregation pipelines available in MongoDB."
author: "Joel Lord"
formattedDate: "March 14, 2022"
keywords: ["mongodb", "stored procedures"]
banner: "puzzle"
---
Stored procedures are used in relational databases to ensure that complex query operations are executed at the database layer. Nowadays, the need for stored procedures is replaced by other more advanced techniques, such as the aggregation pipelines available in MongoDB.

What is a stored procedure?
---------------------------

A stored procedure is SQL code stored on a database for repeated usage. You can think of a stored procedure as equivalent to functions for databases. Stored procedures were typically used in RDBMS (relational database management systems), such as SQL Server, for complex queries that required access to multiple tables. However, modern databases such as MongoDB have solved this problem by using a [document model](https://www.mongodb.com/document-databases).

Does MongoDB support stored procedures?
---------------------------------------

MongoDB does not support stored procedures in the traditional sense. It does, however, offer different mechanisms to provide similar results. For high-performance queries that should be performed on the database server, MongoDB provides the [aggregation pipelines](https://docs.mongodb.com/manual/aggregation/) framework. For functions that need to be stored on the server, you can use [Realm Functions](https://docs.mongodb.com/realm/functions/). Those functions can then be used in [HTTPS endpoints](https://docs.mongodb.com/realm/endpoints/) to create serverless functions or in [Triggers](https://docs.mongodb.com/realm/triggers/overview/) to be automatically used under specific conditions.

Stored functions in MongoDB
---------------------------

Early versions of MongoDB tried to implement a concept similar to stored procedures as stored functions. These JavaScript functions could be stored on the server and later reused as part of a [Map-Reduce](https://docs.mongodb.com/manual/core/map-reduce/) API. However, these stored functions are now slowly being phased out.

Alternatives to stored procedures in MongoDB
--------------------------------------------

In MongoDB, stored procedures are not supported like in relational databases. Instead, it offers other ways to palliate this need.

### Aggregation pipelines

Stored procedures are often used when complex queries need to be performed on the database server. In MongoDB, this is where aggregation pipelines shine. With aggregation pipelines, you use a series of [stages](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/) to build a sequence of tasks where the output of a stage is the input for the next one. The aggregation pipelines framework is a fully Turing complete programming language and can be used for many things, ranging from complex data analytics to [mining bitcoins](https://github.com/johnlpage/MongoAggMiner).

Aggregation pipelines can be called directly from your application using one of the [native drivers](https://docs.mongodb.com/drivers/) to connect to your database.

The [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) web UI (user interface) provides an easy-to-use interface to learn how to build aggregation pipelines. [Compass](https://www.mongodb.com/products/compass), the GUI for MongoDB, also offers an interface to build pipelines. It even includes previews at each of the stages to better understand how to optimize your queries.

The [Practical MongoDB Aggregation book](https://www.practical-mongodb-aggregations.com/) is a valuable resource for learning more about aggregation pipelines and how to use them optimally.

### Realm Functions

When functions need to be stored on the database server, you can use Realm Functions. You can then invoke these functions from the [Realm SDK](https://docs.mongodb.com/realm/sdk/) via HTTPS endpoints or Atlas Triggers. Using functions is a straightforward way to implement a serverless architecture directly from the MongoDB Atlas [data platform](https://www.mongodb.com/what-is-a-data-platform).

Because functions are running on the database server, they provide low-latency access to the data. These functions are often used when details of an implementation need to be abstracted away from the client application.

Realm functions use ES6+ JavaScript and can [import Node.js modules](https://docs.mongodb.com/realm/functions/import-external-dependencies/), just like any other Node.js application that you would run on your server.

Summary
-------

While MongoDB does not offer stored procedures as traditional relational databases do, it provides multiple tools that you can use to achieve the same result. By using aggregation pipelines with the proper indexes, you can perform resource-intensive queries from the database server. You can also use Realm Functions to write full JavaScript functions that you can then use from your applications or as serverless endpoints. All of these features are available on the MongoDB Atlas free tier. Why not try it out right now?