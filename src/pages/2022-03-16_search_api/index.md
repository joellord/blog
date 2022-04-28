---
path: "/blog/post/2022-03-16_search_api"
date: "2022-03-16"
title: "Search API Support and Compatibility"
summary: "Implementing an entire search engine is not trivial. A lot of thinking goes into ensuring that all the data is indexed correctly and that the returned results are relevant."
abstract: "Implementing an entire search engine is not trivial. A lot of thinking goes into ensuring that all the data is indexed correctly and that the returned results are relevant."
author: "Joel Lord"
formattedDate: "March 16, 2022"
keywords: ["mongodb", "search", "support"]
banner: "goal"
---

Implementing an entire search engine is not trivial. A lot of thinking goes into ensuring that all the data is indexed correctly and that the returned results are relevant. This complexity is why more and more companies are looking to implement a search API rather than their in-house solution. In this article, you will learn what a search API is, the benefits of using one, and the considerations to keep in mind when picking one.

What is a search API?
---------------------

A search API (Application Programming Interface) is a tool used to interface with a search engine. It is used to send requests to a search engine and refine the returned results. The idea behind a search API is to make it easier for software developers to interact with the engine itself.

The engine behind the API takes care of indexing, managing, and processing the data. An engineer can then use the API to connect their application to that engine and get the relevant information.

What is a search API used for?
------------------------------

Databases provide ways to query the data, but a good search engine will do more than just return perfect matches. A good search engine will provide relevant, optimized results for the users. The search API is the gateway to that engine.

![Multiple data sources are indexed by a search engine. The search API exposes those resources to the end-user applications.](https://webimages.mongodb.com/_com_assets/cms/kzydjj50z2d85xau7-image2.png?auto=format%252Ccompress)

The user interface used by the end-user will connect to the search API either directly or via a back end. The search API then interfaces with the search engine to retrieve the best possible results from potential data sources.

The search API provides software developers with an easy-to-use interface to tweak and optimize the results based on the use case.

Benefits of using a search API
------------------------------

A search API has many benefits for software developers.

-   Faster to implement. Creating all the necessary tooling to collect the information from multiple data sources, index that data, and store it efficiently is complex. Using existing solutions drastically reduces the time to implement the solution, keeping your team focused on value-added tasks.

-   More relevant results. A good search API will have the ability to refine results based on the current user context rather than returning random matches. Better results will yield a better customer experience.

-   Lower costs. Implementing a full search solution can incur significant infrastructure costs if not optimized due to additional hardware and maintenance costs.

What to look for when choosing a search API
-------------------------------------------

While any search API will most likely bring you benefits over an in-house solution, not all search APIs are made equal. When choosing your search API, make sure to consider these factors.

-   Data integration. To have the best developer experience possible, seamless integration with all of your data sources is essential to avoid losing time and money over configuration issues. In addition to gathering the appropriate data, you need to ensure that your data sources are always synchronized to have the latest possible information.

-   Developer friendly. A search API is, before anything else, a tool that should make your software engineers more productive. Having a tool with a syntax that is familiar to your developers makes the adoption more straightforward and faster.

-   Speed and performance. Most modern applications provide auto-completion and suggestions for the end-user as they start typing search terms. Your search solution will need to be blazing fast to deliver those suggestions quickly from a back-end to a front-end application.

-   Flexibility. Returning relevant results is not always as simple as returning the first result found in a database; sometimes, sponsored content might be bumped to the top, or results might be prioritized based on geographic location. Your search API will need to include the necessary tooling to provide custom scoring options to return the most relevant results.

Integrate search with MongoDB Atlas Search
------------------------------------------

MongoDB Atlas Search is top of its class when it comes to search APIs. It offers everything you might expect from a search tool.

-   Atlas Search is powered by Lucene Search for its [full-text search](https://www.mongodb.com/basics/full-text-search) and connects directly to your MongoDB collection in Atlas. No need to manage additional software or infrastructure. Enable it with the toggle of a button or [with an API call](https://docs.atlas.mongodb.com/atlas-search/tutorial/create-index-api/) and search through all of your collections.

-   Atlas search uses the same familiar MongoDB Query API that your software developers already use to query other MongoDB collections.

-   With the appropriate configuration, Atlas Search can provide your engineers with an easy-to-integrate [auto-complete](https://docs.atlas.mongodb.com/atlas-search/autocomplete/) tool that will instantly deliver suggestions to your end-users.

-   [Custom scoring](https://docs.atlas.mongodb.com/atlas-search/scoring/) ensures that the results found by the search engine are the most relevant to your users.

Summary
-------

A search API is a tool to connect and find relevant results from a search engine easily. A good search API will make it easier for your software developers to implement a solution that integrates with your existing data sources. MongoDB Atlas Search provides you with all the necessary features to deliver the best possible experience to your users without compromising developer experience. Try it out now for free on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register), or check out how to implement an Atlas Search solution in this [quick start](https://docs.atlas.mongodb.com/atlas-search/) guide.