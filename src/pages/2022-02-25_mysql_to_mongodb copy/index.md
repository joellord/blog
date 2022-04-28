---
path: "/blog/post/2022-02-25_mysql_to_mongodb"
date: "2022-02-25"
title: "MySQL to MongoDB Migration Guide"
summary: "When modernizing an application, your database is a crucial element to keep in mind. Migrating to a more flexible and scalable database helps ensure that your application is future-proof."
abstract: "When modernizing an application, your database is a crucial element to keep in mind. Migrating to a more flexible and scalable database helps ensure that your application is future-proof."
author: "Joel Lord"
formattedDate: "February 25th, 2022"
keywords: ["database", "migration", "mysql"]
banner: "bench"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/mysql-to-mongodb"
---

When modernizing an application, your database is a crucial element to keep in mind. Migrating to a more flexible and scalable database helps ensure that your application is future-proof. MongoDB Atlas is a perfect solution if you think about moving to the cloud. However, migrating from MySQL to a MongoDB database can have some challenges. In this article, we will explain how you can achieve such a migration successfully.

Prerequisites to migration
--------------------------

Migration from MySQL to MongoDB is no simple task, and you will want to make sure you have all the necessary information before proceeding to the migration. This article aims to explain the steps to migrate at a general level, but it is assumed that you are familiar with the following.

### Document database schema designs

While migrating your traditional database schema exactly as it is and using [$lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/) to perform joins is possible, this might not be the best approach to this migration. To ensure the best possible performance with MongoDB, you must change your mindset to your [document database](https://www.mongodb.com/document-databases) schema.

You can learn more about document database schema design with the following resources:

-   [SQL to MongoDB Mapping Chart](https://docs.mongodb.com/manual/reference/sql-comparison/)
-   [Data Model Design](https://docs.mongodb.com/manual/core/data-model-design/)
-   [Building with Patterns: A Summary](https://www.mongodb.com/blog/post/building-with-patterns-a-summary)

### Basic scripting knowledge

If your current MySQL database schema contains more than one table, chances are that you will need some basic scripting or programming knowledge. If you are not familiar with using MongoDB already, look at the [drivers](https://docs.mongodb.com/drivers/) page, where you can find examples for any major programming language.

MySQL and MongoDB compatibility
-------------------------------

MySQL and MongoDB are both databases, but that does not mean you can swap one for the other. You will need a migration plan to move from one database to the other. Here are some of the key differences between the databases.

### Querying language

While MySQL uses SQL to perform most queries on its data, MongoDB uses a different approach. The [MongoDB Query API](https://www.mongodb.com/mongodb-query-api) lets you query data and perform advanced queries and data processing through [aggregation pipelines](https://docs.mongodb.com/manual/core/aggregation-pipeline/). Your application's code will need to be retrofitted to use this new language.

### Data structures

It is somewhat of a myth that MongoDB does not support relationships across data. However, to unleash all the potential MongoDB has to offer, you might want to explore other data structures. In MongoDB, you can embed documents directly into others rather than relying on expensive JOINs. This type of change makes it much faster to query your data, uses fewer hardware resources, and returns data in a natural format for software developers.

How to migrate from MySQL to MongoDB
------------------------------------

The migration from MySQL to MongoDB is done in four steps.

1.  Review your data schemas.

2.  Export data from MySQL.

3.  Transform data.

4.  Import data to MongoDB.

### Review your data schemas

Plan ahead and decide what your new data schemas will look like. MongoDB lets you have a [flexible data schema](https://docs.mongodb.com/manual/data-modeling/). However, planning helps you create the proper indexes to search your data blazing fast.

-   One-to-one relationships can be merged into the same document.
-   One-to-many relationships can be embedded into a document when the number of elements is known and restricted.
-   Many-to-many relationships can use some of the advanced patterns available in MongoDB..

### Export your data from MySQL

The next step is to export data from MySQL. There are multiple ways to export the data from MySQL into a format that you can import into a MongoDB database. Many tools, such as phpMyAdmin and MySQL workbench, enable you to export data into a CSV (Comma Separated Values) format. This format can be convenient to import the file into a MongoDB database directly. If you need to transform your data to format it in a more MongoDB-friendly format, you might want to use a scripting language of choice to extract the data, transform it, and write the result to a JSON (JavaScript Object Notation) file.

### Transform data

As stated before, it is certainly possible to transfer your data directly from MySQL to MongoDB, but using a document database in a relational way is not the most optimal way to ensure that your queries will be efficient. At this point in your migration journey, you should transform data in a format that is better suited for MongoDB. Use arrays and embedded objects to limit the necessary queries and lookups. In general, any data accessed together in a single call to your database should be grouped in a single document.

This transformation can be done using the exported files from MySQL with some custom code or using an ETL (Extract Transform Load) tool. The goal here is to take the normalized data from MySQL and transform it so MongoDB can consume it.

### Import your data to MongoDB

The last step of the migration is to insert the newly formatted data into a MongoDB instance.

Again, you can use a custom tool written in a language of your choice or use an existing tool such as [mongoimport](https://docs.mongodb.com/database-tools/mongoimport/). The latter is a CLI (Command Line Interface) tool that can import data into MongoDB directly from a CSV, TSV, or JSON format.

If you are not comfortable with writing a custom script or using mongoimport, you can also use the graphical interface in [MongoDB Compass](https://docs.mongodb.com/compass/current/import-export/) to upload data from a file to your database.

When to use MongoDB
-------------------

You might be wondering when you should make the jump from MySQL to MongoDB. MongoDB is a general-purpose document database that you can use in many different ways. It is a modern database with a cloud offering that lets you easily scale and geographically distribute your data as you see fit. With MongoDB Atlas, you can have the confidence that your application will scale up and out as needed. In addition to that, MongoDB offers an unparalleled developer experience which significantly increases your software engineers' productivity. For these reasons, you will want to migrate to MongoDB as soon as possible in your development cycles to make the best use of all the advanced features that MongoDB provides you.

When to use MySQL
-----------------

MySQL is an easy-to-set-up and very popular database offered with many low-end web hosting solutions. It works exceptionally well with PHP, and some well-known frameworks such as WordPress integrate with it out-of-the-box.

However, as your application gets more traffic, it might be harder to scale up your MySQL instances. For this reason, it is sometimes easier to start directly with MongoDB to avoid having to perform a complex migration down the path.

Conclusion
----------

While MongoDB and MySQL are not exactly compatible, migrating your data from one database to another is possible. To do so, you will need to write your migration scripts and rethink how you want to structure your data. Once you have migrated, you can be sure that your application will have everything needed to scale as large as your ambitions will take you.