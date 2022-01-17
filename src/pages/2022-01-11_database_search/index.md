---
path: "/blog/post/2022-01-11_database_search"
date: "2022-01-11"
title: "Database Search Introduction"
summary: "Databases have been used to persist data in an organized and structured way for many years. As data is added to a database, it will eventually need to be searched to find individual pieces of information. This article explains some of the ways a database can be searched."
abstract: "Databases have been used to persist data in an organized and structured way for many years. As data is added to a database, it will eventually need to be searched to find individual pieces of information. This article explains some of the ways a database can be searched."
author: "Joel Lord"
formattedDate: "January 11, 2022"
keywords: ["mongodb", "database", "search"]
banner: "puzzle"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/database-search"
---
Databases have been used to persist data in an organized and structured way for many years. As data is added to a database, it will eventually need to be searched to find individual pieces of information. This article explains some of the ways a database can be searched.

What is a Database Search?
--------------------------

A database search is performed whenever an application wants to extract specific information from the database. This search is usually performed by a driver that can communicate with the database. The search query provided by the application or the user is expressed in a query language that the database can understand. Traditional relational databases use a language called SQL, while MongoDB uses the MongoDB Query API to produce powerful queries.

Database Search Examples
------------------------

Any application that uses some data needs to perform database searches, also known as queries.

Take a library, for example. An application connected to a database lets you search the collection of books using different criteria. Depending on what you need, you can search by author, book title, or subject. Any of these searches will return some results from the database.

Another typical example of database search would be an e-commerce catalog. An e-commerce website will generally have a search input element. This search engine uses a more complex query to search larger text fields and multiple keywords to provide the most relevant items. Such a website would need to use a full-text search to search through the description of the items in the catalog.

How Do Database Searches Work?
------------------------------

Databases store information in logical units. MongoDB, for example, stores units of data, called documents, and groups them together in collections. When you perform a database search, you go through all the collection documents to find a match with the search terms.

However, searching through all the documents can be very inefficient and require a lot of computing resources.

This is where [search indexes](https://www.mongodb.com/basics/search-index) come into play. When you create a search index on a collection, you create the database equivalent of a book glossary. This glossary contains a list of the searchable fields and the associated documents. This way, the database can find the matching documents without searching each record every time you make a query.

How Do You Search a Database?
-----------------------------

The way you will search a database will depend on the language used by the database itself. The key to an effective search is creating the proper indexes before the search is executed against the database.

[Modeling data for keyword](https://docs.mongodb.com/manual/tutorial/model-data-for-keyword-search/) searches can also help perform database searches that return more relevant results.

When advanced search capabilities are needed, such as full-text search, additional tooling might be required to generate and parse indexes. If you are using MongoDB Atlas, you are in luck as you can use Atlas Search to help you perform those searches.

### SQL

To perform a query in a SQL database, you will need to use the SELECT statement. For example, if you want to search for all the records in the books table, you will use the following query.

```
SELECT * FROM books
```

If you want to filter out some of the records, you can add a WHERE statement to refine your search results.

```
SELECT * FROM books WHERE author = "Joel Lord"
```

SQL provides other methods to further refine your queries and works well for simple database searches.

### MongoDB Query Language

MongoDB uses a slightly different approach to searches. To fetch all the books from a collection, you can use the [find()](https://docs.mongodb.com/manual/reference/method/db.collection.find/) method.

```
db.books.find()
```

You can specify the search parameters as a JSON object passed to the find function to filter out the results.

```
db.books.find({"author": "Joel Lord"})
```

For an advanced explanation on how to query data, along with how to create, update, and delete records, you can follow the tutorial from the [documentation](https://docs.mongodb.com/manual/crud/). You can also use [aggregation pipelines](https://docs.mongodb.com/manual/core/aggregation-pipeline/) to build complex queries to search and process your data to deliver more accurate results.

### Advanced Searches with Atlas Search

When you need to perform advanced searches, you can use [MongoDB Atlas Search](https://www.mongodb.com/atlas/search). Atlas Search lets you create an index that can be used for [full-text searches](https://www.mongodb.com/basics/full-text-search). To search for any book that mentions "Tom Bombadil" in its text would require a lot of computational power as each record would need to be compared, character by character. Using a full-text search will significantly improve this database search. Using MongoDB Atlas, you could do this search using the following method.

```
db.books.aggregate([
  {
    $search: {
      text: {
        query: "Tom Bombadil",
        path:"full_book_text"
      }
    }
  }
]);
```

Using Atlas Search can greatly improve your database searches, especially when searching across large sets of text data. You can find out more about MongoDB Atlas Search in the [documentation](https://docs.atlas.mongodb.com/atlas-search/).

### Using HTTPS Endpoints

A very convenient way to search a database is using HTTPS endpoints. MongoDB offers this powerful feature with its Data API. A curl command to fetch all documents from the books collection would look like this.

```
curl --request POST\
  'https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/beta/action/find'\
  --header 'Content-Type: application/json'\
  --header 'Access-Control-Request-Headers: *'\
  --header 'api-key: <Data API Key>'\
  --data-raw '{
      "dataSource": "<cluster name>",
      "database": "library",
      "collection": "books",
      "filter": { }
  }'
```

Using the Data API, you can send an HTTPS request directly to the database, by-passing all needs for a server.

Conclusion
----------

Whenever you need to extract data from a database, you need to do a database search. Those database searches, called queries, can be straightforward (find all the books in a collection) or very complex (find all the books grouped by published year, sorted by author).

Databases provide you with query languages that you can use to perform those searches. As your database searches become more complex, using Atlas Search can make it much more manageable. You can [try out Atlas Search](https://www.mongodb.com/cloud/atlas/register) now for free in MongoDB Atlas.