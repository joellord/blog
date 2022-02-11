---
path: "/blog/post/2022-01-31_full_text_search"
date: "2022-01-31"
title: "What is Full-Text Search and How Does it Work?"
summary: "Full-text search refers to searching some text inside extensive text data stored electronically and returning results that contain some or all of the words from the query. In contrast, traditional search would return exact matches."
abstract: "Full-text search refers to searching some text inside extensive text data stored electronically and returning results that contain some or all of the words from the query. In contrast, traditional search would return exact matches."
author: "Joel Lord"
formattedDate: "January 31st, 2021"
keywords: ["mongodb", "full-text search", "index"]
banner: "machine"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/full-text-search"
---

Full-text search refers to searching some text inside extensive text data stored electronically and returning results that contain some or all of the words from the query. In contrast, traditional search would return exact matches.

While traditional databases are great for storing and retrieving general data, performing full-text searches has been challenging. Frequently, additional tooling is required to achieve this.

In this article, you will learn what a full-text search is, how it works, and how to implement it in MongoDB.

Full-text search examples
-------------------------

Full-text search can have many different usages---for example, looking for a dish on a restaurant menu or looking for a specific feature in the description of an item on an e-commerce website. In addition to searching for particular keywords, you can augment a full-text search with search features like fuzzy-text and synonyms. Therefore, the results for a word such as "pasta" would return not only items such as "Pasta with meatballs" but could also return items like "Fettuccine Carbonara" using a synonym, or "Bacon and pesto flatbread" using a fuzzy search.

![An image showing a box with the search term pasta with matching results.](https://webimages.mongodb.com/_com_assets/cms/kyxaoi2tgr4hrpfpv-image7.png?auto=format%252Ccompress)

You can find a fully functional demo of a similar full-text search for menu items at <http://atlassearchrestaurants.com/>.

Types of full-text search
-------------------------

Search on text fields can be done in many different ways. First, traditional string searches can be performed on smaller text fields. These methods are not as efficient as modern indexed searches but require fewer resources. Full-text searches provide more rich options for advanced querying but can be more complex to set up.

### String searches

String searches are algorithms that search for consecutive characters in a larger text field. Those searches will be performed character per character and can be relatively slow.

![An animation showing the process of string searches.](https://webimages.mongodb.com/_com_assets/cms/kyxfgxzai0lvtslf0-image2.gif)

Another technique often used for string searches is the use of regular expressions. Those expressions represent a search pattern and are supported by most modern programming languages.

Some algorithms exist to increase the speed of those searches if the text to be searched is more significant. The [Rabin-Karp](https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm) algorithm, which looks for matching substrings, is fast and easy to implement. The [Knuth-Morris-Pratt](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) algorithm looks for all instances of a matching character, increasing the speed for multiple matches in a string. Other advanced techniques can be used to perform fuzzy searches.

In a SQL database, a search on a text field in a record is usually done using a LIKE operator.

```
SELECT * FROM menus WHERE item LIKE "%pasta%";
```

In MongoDB, a similar search can be done using the $regex operator.

```
db.menus.find({"item": {"$regex": /pasta/i }});
```

These searches are easy to use and can work well on small data sets. However, because they are not utilizing indexes optimally, those could quickly become problematic once you need blazing fast results for autocomplete suggestions, for example.

### Full-text search

Full-text search is meant to search large amounts of text. For example, a search engine will use a full-text search to look for keywords in all the web pages that it indexed. The key to this technique is indexing.

Indexing can be done in different ways, such as batch indexing or incremental indexing. The index then acts as an extensive glossary for any matching documents. Various techniques can then be used to extract the data. [Apache Lucene](https://lucene.apache.org/), the open sourced search library, uses an inversed index to find the matching items. In the case of our menu search, each word links to the matching menu item.

![An animation showing the process of full-text search](https://webimages.mongodb.com/_com_assets/cms/kyxgeyiqchgh6gbmz-image9.gif)

This technique is much faster than string searches for large amounts of data. However, these indexes require some disk space and can consume a lot of resources when created.

Full-text search indexing process
---------------------------------

The key to an efficient full-text search is index creation. Essentially, the index creation process goes through each text field of a dataset. For each word, it will start by removing any diacritics (marks placed above or below letters, such as é, à, and ç in French). Then, based on the used [language](https://docs.mongodb.com/v5.1/reference/text-search-languages/), the algorithms will remove filler words and only keep the stem of the terms. This way, "to eat," "eating," and "ate" are all classified as the same "eat" keyword. It then changes the casing to use only either uppercase or lowercase. The exact indexing process is determined by the [analyzer](https://docs.atlas.mongodb.com/atlas-search/analyzers/) that is used.

![A series of tables showing the different steps to create an index.](https://webimages.mongodb.com/_com_assets/cms/kyxgo9mxv0usmm4y7-image14.png?auto=format%252Ccompress)

The index is then created by adding each of these words with a reference to which document it can be found in.

![Two tables showing the dictionary built in the previous diagram, along with the resulting index.](https://webimages.mongodb.com/_com_assets/cms/kyxgsdp2fpjke49oc-image4.png?auto=format%252Ccompress)

### Implement full-text search in SQL

To implement a full-text search in a SQL database, you must create a full-text index on each column you want to be indexed. In MySQL, this would be done with the FULLTEXT keyword.

Then you will be able to query the database using MATCH and AGAINST.

```
ALTER TABLE menus ADD FULLTEXT(item);
SELECT * FROM menus WHERE MATCH(item) AGAINST("pasta");
```

While this index will increase the search speed for your queries, it does not provide you with all the additional capabilities that you might expect. To use features such as fuzzy search, typo tolerance, or synonyms, you will need to add a core search engine such as Apache Lucene on top of your database.

### Implement full-text search in MongoDB Atlas

Implementing a full-text search engine in MongoDB Atlas is just a question of [clicking on a button](https://docs.atlas.mongodb.com/atlas-search/). Go to any cluster and select the "Search" tab to do so. From there, you can click on "Create Search Index" to launch the process.

![A screenshot of the Atlas Search UI.](https://webimages.mongodb.com/_com_assets/cms/kyxh2s86z9jgtqj7c-image6.png?auto=format%252Ccompress)

Once the index is created, you can use the $search operator to perform full-text searches.

```
db.menus.aggregate([
  {
    $search: {
      text: {
        query: "pasta",
        path:"item"
      }
    }
  }
]);
```

This aggregation is the most simple query you can use with Atlas Search. You could also build rich queries that would include [typo-tolerance](https://docs.atlas.mongodb.com/atlas-search/text/#fuzzy-examples), search terms [highlighting](https://docs.atlas.mongodb.com/atlas-search/highlighting/), [synonyms](https://docs.atlas.mongodb.com/atlas-search/synonyms/) search, and much more. Behind the scenes, Atlas Search uses Apache Lucene, so you don't have to add the engine yourself. You can find out more about Atlas Search on the [official page](https://www.mongodb.com/atlas/search).

Considerations before using full-text search
--------------------------------------------

No matter which database you are using, before implementing a full-text search solution, you will have to take these considerations into mind.

-   Necessary features. Adding a full-text index to your database will help you optimize text search. Still, you might need additional features such as auto-complete suggestions, synonym search, or custom scoring for relevant results.

-   Architectural complexity. Adding additional software to your architecture means separate systems to maintain and additional software complexity to query two different sources.

-   Costs. Whether a solution is built in-house or uses a third-party tool, additional charges are to be expected.

MongoDB Atlas Search features and capabilities
----------------------------------------------

Atlas Search is an easy-to-use solution for all of your search needs. It includes a great developer experience making it easier for your team to get up and running---all of this at a lower cost than other solutions.

### Features

MongoDB Atlas Search offers you all the features you can expect from a modern search engine.

![](https://webimages.mongodb.com/_com_assets/cms/kyyny4w3ir6u6ksyu-Technical_MDB_Query3x.png?auto=format%2Ccompress&ch=DPR&fix=max&h=48)

#### Rich Querying Capabilities

Using a wide range of [operators](https://docs.atlas.mongodb.com/atlas-search/operators/#std-label-operators-ref), Atlas Search can do more than just search for text. You can also search for geo points and dates.

![](https://webimages.mongodb.com/_com_assets/cms/kyyqnqtrmo5nsdbxo-image12.png?auto=format%2Ccompress&ch=DPR&fix=max&h=48)

#### Fuzzy Search

Users sometimes make mistakes as they type. With Atlas Search [typo-tolerance](https://docs.atlas.mongodb.com/atlas-search/text/#fuzzy-examples), you can deliver accurate results, even with a typo or a spelling mistake.

![](https://webimages.mongodb.com/_com_assets/cms/kyyqr29xb07r04me6-image13.png?auto=format%2Ccompress&ch=DPR&fix=max&h=48)

#### Synonyms

Your data might use wording different from what your users are searching for. You can use [synonyms](https://docs.atlas.mongodb.com/atlas-search/synonyms/) to define lists of equivalent words to deliver more relevant results to your users.

![](https://webimages.mongodb.com/_com_assets/cms/kyyqve3ocfr91nrbo-image10.png?auto=format%2Ccompress&ch=DPR&fix=max&h=48)

#### Custom Scoring

If you have promoted content or content that is more relevant based on different variables (for example, at different times of the year), you can define that in a custom [scoring](https://docs.atlas.mongodb.com/atlas-search/scoring/) function. This score will help push prioritized results at the top of the search results.

![](https://webimages.mongodb.com/_com_assets/cms/kyyr0x2721tdz3p0a-image1.png?auto=format%2Ccompress&ch=DPR&fix=max&h=48)

#### Autocomplete

Provide your users with [suggestions ](https://docs.atlas.mongodb.com/atlas-search/autocomplete/)to make their experience more seamless as they type.

![](https://webimages.mongodb.com/_com_assets/cms/kyyr3lkenuodkuf69-image5.png?auto=format%2Ccompress&ch=DPR&fix=max&h=48)

#### Highlights

As the search results come back from your database, have them automatically [highlight](https://docs.atlas.mongodb.com/atlas-search/highlighting/) the searched words to help your users find more context on the results.

You can find the complete list of features of MongoDB Atlas Search in the [documentation](https://docs.atlas.mongodb.com/atlas-search/).

### Architectural complexity

Adding additional components adds complexity to your application. To provide full-text search capabilities to your application, you will need an extra layer to take care of the indexing and provide you with the results.

![A diagram depicting the architecture using a third party search engine such as Lucene.](https://webimages.mongodb.com/_com_assets/cms/kyxieoduxiw1jogio-image11.png?auto=format%252Ccompress)

With MongoDB Atlas Search, everything is integrated into your database. Software developers don't need to worry about where to query; they can access data with a regular aggregation pipeline, just as they would with traditional data.

![A diagram showing the architecture of a full-text search done with Atlas Search.](https://webimages.mongodb.com/_com_assets/cms/kyxiinythqgv8cbee-image3.png?auto=format%252Ccompress)

By removing that additional layer, you simplify software development and associated overhead with implementing and maintaining different components in the architecture.

### Costs

Developing a solution from the ground up might incur high costs. This is why most software development teams will go with an off-the-shelf solution. However, even an open source solution comes at a price. When evaluating solutions, you should consider the cost of maintaining the software.

Another substantial cost is the expense associated with the developer's productivity. Using a third-party tool that developers are not used to and necessary training can quickly accumulate.

Using a solution such as MongoDB Atlas Search reduces the costs by removing any need for you and your team to maintain the underlying infrastructure. It also makes it easier to ramp up for your development team as they are already familiar with using MongoDB to query their data.

Conclusion
----------

Full-text search is a complex topic. It requires a good amount of expertise to set up correctly. Adding additional features such as fuzzy search, highlights, or synonyms might also require a lot of extra work.

Using a fully integrated solution such as MongoDB Atlas Search makes it easy for your team to add those features to your application in a matter of minutes.

If you don't have a [MongoDB Atlas account](https://docs.atlas.mongodb.com/getting-started/), you can sign up for one for free right now. Once you have your account set up, you'll be able to try out Atlas Search in this demo at [the Atlas Search Restaurant Finder](http://atlassearchrestaurants.com/), or you can learn how to implement it using this tutorial on [how to build a movie search application](https://www.mongodb.com/developer/how-to/build-movie-search-application/).