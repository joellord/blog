---
path: "/blog/post/2022-01-12_search_indexes"
date: "2022-01-12"
title: "Search Indexes"
summary: "Whether you are building an e-commerce website, a game, or a ride-hailing application, all modern applications require some sort of data. And the more data there is, the longer it might take to parse all of it to find a specific piece of information. This is where search indexes come into play. Having good search indexes is crucial in optimizing a database for fast and efficient queries."
abstract: "Whether you are building an e-commerce website, a game, or a ride-hailing application, all modern applications require some sort of data. And the more data there is, the longer it might take to parse all of it to find a specific piece of information. This is where search indexes come into play. Having good search indexes is crucial in optimizing a database for fast and efficient queries."
author: "Joel Lord"
formattedDate: "January 12, 2022"
keywords: ["mongodb", "search", "index"]
banner: "shelf"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/search-index"
---
Whether you are building an e-commerce website, a game, or a ride-hailing application, all modern applications require some sort of data. And the more data there is, the longer it might take to parse all of it to find a specific piece of information. This is where search indexes come into play. Having good search indexes is crucial in optimizing a database for fast and efficient queries.

What is a search index?
-----------------------

A [search index](https://docs.mongodb.com/manual/indexes/) is a way to categorize data in an easily searchable format. One example is how librarians use the Dewey Decimal classification to store non-fiction books. Books on a specific topic are grouped and assigned numbers that follow a particular sequence. If you look for a book on celestial mechanics, it starts with 521.x. To consult it, you will need to look after the books about languages (400) and before the books on technology (600). However, fiction books use a different index. They are usually organized by author in alphabetical order. This grouping makes it easier for users to find related books if they like an author. Classifying by title or release date would make no sense for a user browsing the bookshelves.

In the same way, search indexes are a way to find data in an electronic context. Data is stored in different ways in databases, based on the [type of database](https://www.mongodb.com/databases/types) you use. Without an index, the database needs to browse all the records to find a specific record. The fields you regularly use to filter the data should be indexed to help the database find the information quicker.

Keep in mind that indexes also come at a cost. Building indexes can be time-consuming, and take up a lot of your resources. Additionally, the database will need to store those indexes somewhere, and this takes up more disk space.

Search index examples
---------------------

You can use search indexes in [many different ways](https://docs.mongodb.com/manual/applications/indexes/) in a database. Most importantly, fields used frequently for sorting or filtering should be indexed.

If you have a collection of documents for all of your invoices, chances are that you will want to query those invoices using the issued date. You will most likely want to query all of your invoices to get your quarterly sales totals every quarter. To help your database find those invoices faster, you could add a search index to the issued date field. The database will create an index where all documents are ordered by the date field. This way, the database engine will only need to go through the documents related to the last quarter and stop querying once it reaches the beginning of the quarter.

![](https://webimages.mongodb.com/_com_assets/cms/ky4wt4vnybz5ytqk2-image3.gif)

You might regularly want to see which of your customers made the most significant orders in this same collection. In addition to the date index, you could add an index on the total invoice amount. This way, the database engine will easily find the top largest invoices and return those to you quickly, without looking at all individual documents.

![](https://webimages.mongodb.com/_com_assets/cms/ky4wwqya9vmwsnokd-image2.gif)

Search index and MongoDB
------------------------

In MongoDB, just like any other database management system, indexes are used to increase your database performance. You can [create indexes](https://docs.atlas.mongodb.com/reference/atlas-search/tutorial/) on any field. Indexes can be on a [single field](https://docs.mongodb.com/manual/core/index-single/), [multiple fields](https://docs.mongodb.com/manual/core/index-multikey/), or even [wildcards](https://docs.mongodb.com/manual/core/index-wildcard/) for arrays.

The [Performance Advisor](https://www.mongodb.com/cloud/atlas/performance) available in [MongoDB Atlas](https://www.mongodb.com/atlas/database) can provide you with recommendations on which collections and fields would benefit from indexing. Using those recommendations can significantly improve the performance of your database and reduce the costs associated with inefficient hardware resources usage.

MongoDB Atlas Search
--------------------

In addition to regular indexes, MongoDB Atlas offers full-text search capabilities. Like traditional search indexes, full-text search indexes help speed up the queries on text fields. You can enable [Atlas Search](https://docs.atlas.mongodb.com/atlas-search/) with a few clicks from the Atlas UI or a single call to the [Administration API](https://docs.atlas.mongodb.com/configure-api-access/).

Using Atlas Search will let you perform queries using the same [MongoDB Query API](https://www.mongodb.com/mongodb-query-api) you are already familiar with to return relevant results. You can even add [fuzzy text](https://docs.atlas.mongodb.com/atlas-search/text/) searching or lists of [synonyms](https://docs.atlas.mongodb.com/reference/atlas-search/synonyms/) to deliver accurate results to your users every time.

To learn more about Atlas Search, you can watch the [introduction video](https://www.youtube.com/watch?v=kZ77X67GUfk) or check out the [MongoDB Atlas Search page](https://www.mongodb.com/atlas/search) for more information.

In summary
----------

Search indexes are essential to ensure a good performance from your database. They guarantee that the data is easy to find and that your hardware resources aren't used inefficiently. In addition to traditional search indexes, MongoDB Atlas offers you text search indexes. These indexes will help you add full-text search capabilities to your application to create a better user experience for your customers. You can try out Atlas Search in [MongoDB Atlas for free](https://www.mongodb.com/cloud/atlas/register) today.

Many more hands-on examples and tutorials are available on the [MongoDB Dev Hub](https://www.mongodb.com/developer/learn/?products=Atlas%20Search).