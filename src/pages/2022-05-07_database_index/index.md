---
path: "/blog/post/2022-05-07_database_index"
date: "2022-05-07"
title: "What is Indexing in a Database?"
summary: "A good indexing strategy is crucial to ensuring that your MongoDB database returns your results in the most efficient way possible."
abstract: "A good indexing strategy is crucial to ensuring that your MongoDB database returns your results in the most efficient way possible."
author: "Joel Lord"
formattedDate: "May 7, 2022"
keywords: ["database", "index", "mongodb"]
banner: "bench"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/database-index"
---

A good indexing strategy is crucial to ensuring that your MongoDB database returns your results in the most efficient way possible. To build a solid strategy, you need to consider factors like database schema, usage patterns, and database server configuration.

In this article, you will learn what database indexes are, how to use them in MongoDB, and how to leverage the MongoDB Atlas Performance Advisor to optimize your queries.

What is an index?
-----------------

A database index is a special data structure that provides faster access to data and helps create highly performant applications. An index usually consists of two columns: the search key and the data pointer. The key stores the value you want to search for and the pointer points to the block where the data resides. Let's say you have an index on the 'score' field (column) of a collection (table) named 'exam'. When you want to access the scores that are < 40, the index will scan through blocks rather than individual documents (rows).

![Simple database index](https://webimages.mongodb.com/_com_assets/cms/ldox71n9w5cycanyc-image3.png?auto=format%252Ccompress)

*An example to demonstrate a database index*

### Why indexing is important

Without an index, the database engine needs to go through each record to see if there is a match.

A database index is a way to organize information so that the database engine can quickly find the relevant results.

You can save significant time on grouping, sorting, and retrieving data. Databases allow you to add multiple indexes, further increasing the query efficiency.

How do you use a database index?
--------------------------------

Think of a database index to be similar to that of a book index (usually at the end of the book). Each keyword is mentioned in an alphabetical order along with the page numbers where the word is used, enabling users to search for the word quickly. Database indexes work in the same way. Suppose you have 1000 keyword names stored in the database. If they are sorted by name (a->z or z->a), it is easier for the query to look up for the last keyword, middle keyword, or a specific keyword, based on the sort.

![How index works](https://webimages.mongodb.com/_com_assets/cms/ldownuagucuf78dnj-image6.png?auto=format%252Ccompress)

*How indexing yields faster query results*

To decide what fields or collections you want to be indexed, think about data that is used more often in queries --- for example, name, ID, or a combination of both, based on the requirement. Similarly, index the fields that you are most likely to use for ordering, grouping, or sorting data.

Indexes in MongoDB
------------------

Just like traditional databases, MongoDB uses indexes to optimize queries. Any collection in MongoDB can have one or more indexes, and those indexes can be made on one or multiple fields. You cannot duplicate MongoDB indexes --- and that's great, because indexes do come at a cost, and that's why you need a good strategy to create one.

Say you have a sales collection, and you want to get the list of documents for the quarter. If you don't have an index, the database engine will need to go through every record in the database, validate that the date is within the specified range, and add it to the result if it is.

Querying all the documents in a collection is time-consuming and can take up many resources.

![An animated image showing the difference between querying data with and without an index.](https://webimages.mongodb.com/_com_assets/cms/l47dpmajmt8zyeutt-image4.gif)

If you have a database index created on the sale date, the database engine will quickly find the first matching document and go through the list until it hits the desired ending date. This is much more efficient than going through each record individually.

Follow our University course to learn more about [MongoDB Indexes](https://learn.mongodb.com/courses/mongodb-indexes).

Index types
-----------

There are many types of indexes available in MongoDB. The most common ones are the single field and compound index types. There are more advanced index types that you can use if you deal with arrays, aggregations, geospatial data, or full-text search. You can find more information about these index types in the [documentation](https://www.mongodb.com/docs/manual/indexes/#index-types).

### Single field

Each collection in MongoDB automatically has an index on the _id field. This index can then be used to fetch documents from the database efficiently.

However, you will need to query data on other specific fields most of the time. This is where a [single field index](https://www.mongodb.com/docs/manual/core/index-single/) will come in handy.

Say you want to get the top three sales regularly.

![An animated image showing the difference between querying data with and without an index.](https://webimages.mongodb.com/_com_assets/cms/l47dpmajmt8zyeutt-image4.gif)

A good index here would be on the amount field.

```
db.collection.createIndex( { amount: 1 });
```

The top three sales will always be the first three elements in the index, making it much faster than querying the whole collection every time.

### Compound index

You can also add a query on multiple fields. Say you wanted to get the top three sales, but on a specific day. Then, adding a [compound index](https://www.mongodb.com/docs/manual/core/index-compound/) that would include both the date and the amount would be the most efficient.

```
db.collection.createIndex( { date: 1, amount: 1 });
```

This will create an index where the sales are ordered by date and then by amount.

We can use indexes on [embedded arrays](https://www.mongodb.com/docs/manual/core/index-multikey/) too.

The ESR rule for index creation
-------------------------------

Creating the correct index for the queries is not always obvious. However, there is a general rule that you can use to help you, which is called the ESR (Equality, Sort, Range) rule.

This rule is a thought framework that describes how to build your compound indexes. Start with the fields that use an exact match, add the fields you use for sorting, and finally, add fields used for non-exact matches (i.e., $lt or $ne operators).

MongoDB Atlas index management
------------------------------

MongoDB Atlas uses the same indexing principles as MongoDB but gives tools to create indexes quickly.

### Create index

You use the [createIndex](https://www.mongodb.com/docs/manual/indexes/#create-an-index) method with [Mongo](https://www.mongodb.com/docs/manual/tutorial/getting-started/) to create an index.

```
db.collection.createIndex( <key and index type specification>, <options> )
```

The Atlas UI provides you with a graphical user interface to create your indexes. You can also add [full-text search](https://www.mongodb.com/basics/full-text-search) indexes with [Atlas Search](https://www.mongodb.com/atlas/search).

![A screenshot of the Create Index modal in the Atlas UI](https://webimages.mongodb.com/_com_assets/cms/l45xtbo92vhryrk9s-image5.png?auto=format%252Ccompress)

### Drop/delete index

You can also drop indexes as easily as you can create using the Atlas UI or using Mongosh.

```
db.collection.dropIndex(<index name>)
```

On Atlas, you can drop an index from the Indexes tab in the browse collections page.

![Dropping index via Atlas](https://webimages.mongodb.com/_com_assets/cms/ldovs0iseen1oiodd-image1.jpg?auto=format%252Ccompress)

*Dropping database index using the MongoDB Atlas UI*

Index optimization
------------------

Another great feature of Atlas is its [Performance Advisor](https://www.mongodb.com/docs/ops-manager/current/tutorial/performance-advisor/). This tool analyzes your frequent queries and suggests new indexes that you could create to increase performance.

![A screenshot of the Create Index modal in the Atlas UI](https://webimages.mongodb.com/_com_assets/cms/l45x8cww7uxg45pn5-image3.png?auto=format%252Ccompress)

It can also recommend redundant or unused indexes that can otherwise take up some disk space unnecessarily and impact write performance.

You can also [analyze your query plans](https://www.mongodb.com/docs/manual/core/query-plans/) individually using the explain method in the Mongo Shell.

Summary
-------

When a database has performance issues, an easy fix can often be to add the appropriate indexes. These indexes will create a sorted map of your collection to make it easier to retrieve your documents. To find out which indexes you need to create, you should use the ESR rule or the performance advisor in MongoDB Atlas. You can even [try it out now](https://www.mongodb.com/cloud/atlas/register) for free. Once you start adding the appropriate indexes to your collections, you should be able to see significant improvements in your query performance.