---
path: "/blog/post/2022-05-31_e-commerce_search"
date: "2022-05-31"
title: "Building an E-commerce Content Catalog with Atlas Search"
summary: "Search is now a fundamental part of applications across all industries—but especially so in the world of retail and e-commerce."
abstract: "Search is now a fundamental part of applications across all industries—but especially so in the world of retail and e-commerce."
author: "Joel Lord"
formattedDate: "May 31, 2022"
keywords: ["database", "atlas search", "e-commerce"]
banner: "bottle"
originalSource: "MongoDB Dev Center"
originalUrl: "https://www.mongodb.com/developer/products/atlas/building-e-commerce-content-catalog-atlas-search/"
---
Search is now a fundamental part of applications across all industries—but especially so in the world of retail and e-commerce. If your customers can’t find what they’re looking for, they’ll go to another website and buy it there instead. The best way to provide your customers with a great shopping experience is to provide a great search experience. As far as searching goes, Atlas Search, part of  MongoDB Atlas, is the easiest way to build rich, fast, and relevance-based search directly into your applications. In this tutorial, we’ll make a website that has a simple text search and use Atlas Search to integrate full-text search capabilities, add autocomplete to our search box, and even promote some of our products on sale.

## Pre-requisites

You can find the complete source code for this application on [Github](https://github.com/joellord/content-catalog). The application is built using the [MERN stack](https://www.mongodb.com/mern-stack). It has a Node.js back end running the express framework, a MongoDB Atlas database, and a React front end.

## Getting started

First, start by cloning the repository that contains the starting source code.

```bash
git clone https://github.com/mongodb-developer/content-catalog
cd content-catalog
```

In this repository, you will see three sub-folders:

* `mdbstore`: contains the front end
* `backend`: has the Node.js back end
* `data`: includes a dataset that you can use with this e-commerce application

### Create a database and import the dataset

First, start by creating a free MongoDB Atlas cluster by following the [instructions from the docs](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/). Once you have a cluster up and running, find your [connection string](https://www.mongodb.com/docs/guides/atlas/connection-string/). You will use this connection string with `mongorestore` to import the provided dataset into your cluster.

>You can find the installation instructions and usage information for `mongorestore` from the [MongoDB documentation](https://www.mongodb.com/docs/database-tools/mongorestore/).

Use your connection string without the database name at the end. It should look like `mongodb+srv://user:password@cluster0.xxxxx.mongodb.net`

```bash
cd data
mongorestore <CONNECTION_STRING>
```

This tool will automatically locate the BSON file from the dump folder and import these documents into the `items` collection inside the `grocery` database.

You now have a dataset of about 20,000 items to use and explore.

### Start the Node.js backend API

The Node.js back end will act as an API that your front end can use. It will be connecting to your database by using a connection string provided in a `.env` file. Start by creating that file.

```bash
cd backend
touch .env
```

Open your favourite code editor, and enter the following in the `.env` file. Change <CONNECTION_STRING> to your current connection string from MongoDB Atlas.

```
PORT=5050
MONGODB_URI=<CONNECTION_STRING>
```

Now, start your server. You can use the `node` executable to start your server, but it’s easier to use `nodemon` while in development. This tool will automatically reload your server when it detects a change to the source code. You can find out more about installing the tool from [the official website](https://nodemon.io/).

```bash
nodemon .
```

This command will start the server. You should see a message in your console confirming that the server is running and the database is connected.

### Start the React frontend application

It’s now time to start the front end of your application. In a new terminal window, go to the `mdbstore` folder, install all the dependencies for this project, and start the project using `npm`.

```bash
cd ../mdbstore
npm install
npm start
```

Once this is completed, a browser tab will open, and you will see your fully functioning store. The front end is a React application. Everything in the front end is already connected to the backend API, so we won’t be making any changes here. Feel free to explore the source code to learn more about using React with a Node.js back end.

### Explore the application

Your storefront is now up and running. A single page lets you search for and list all products. Try searching for `chicken`. Well, you probably don’t have a lot of results. As a matter of fact, you won't find any result. Now try `Boneless Chicken Thighs`. There’s a match! But that’s not very convenient. Your users don’t know the exact name of your products. Never mind possible typos or mistakes. This e-commerce offers a very poor experience to its customers and risks losing some business. In this tutorial, you will see how to leverage Atlas Search to provide a seamless experience to your users.

## Add full-text search capabilities

The first thing we’ll do for our users is to add full-text search capabilities to this e-commerce application. By adding a [search index](https://www.mongodb.com/docs/atlas/atlas-search/create-index/), we will have the ability to search through all the text fields from our documents. So, instead of searching only for a product name, we can search through the name, category, tags, and so on.

Start by creating a search index on your collection. Find your collection in the MongoDB Atlas UI and click on Search in the top navigation bar. This will bring you to the Atlas Search Index creation screen. Click on Create Index.

![The Create Search Index UI in Atlas](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/create_search_index_ui_be0dc64467.png)

From this screen, click Next to use the visual editor. Then, choose the newly imported data—‘grocery/items’, on the database and collection screen. Accept all the defaults and create that index.

While you’re there, you can also create the index that will be used later for autocomplete. Click Create Index again, and click Next to use the visual editor. Give this new index the name `autocomplete`, select ‘grocery/items’ again, and then click Next.

On the following screen, click the Refine Index button to add the autocomplete capabilities to the index. Click on the Add Field button to add a new field that will support autocomplete searches. Choose the `name` field in the dropdown. Then toggle off the `Enable Dynamic Mapping` option. Finally, click Add data type, and from the dropdown, pick autocomplete. You can save these settings and click on the Create Search Index button. You can find the detailed instructions to set up the index in this [tutorial](https://www.mongodb.com/docs/atlas/atlas-search/tutorial/autocomplete-tutorial/).

![The UI with the necessary settings](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/ui_with_necessary_settings_f9a0c5c7c5.png)

Once your index is created, you will be able to use the $search stage in an aggregation pipeline. The $search stage enables you to perform a full-text search in your collections. You can experiment by going to the Aggregations tab once you’ve selected your collection or [using Compass](https://www.mongodb.com/docs/atlas/compass-connection/), the MongoDB GUI.

The first aggregation pipeline we will create is for the search results. Rather than returning only results that have an exact match, we will use Altas Search to return all similar results or close to the user search intent.

In the Aggregation Builder screen, create a new pipeline by adding a first $search stage.

![The Aggregation Builder in Compass](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/aggregation_builder_compass_47cc8fe897.png)

You use the following JSON for the first stage of your pipeline.

```javascript
{
  index: 'default',
  text: {
    query: "chicken",
    path: ["name"]
  }
}
```

And voilà! You already have much better search results. You could also add other [stages](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/) here to limit the number of results or sort them in a specific order. For this application, this is all we need for now. Let’s try to import this into the API used for this project.

In the file _backend/index.js_, look for the route that listens for GET requests on `/search/:query`. Here, replace the code between the comments with the code you used for your aggregation pipeline. This time, rather than using the hard-coded value, use `req.params.query` to use the query string sent to the server.

```javascript
    /** TODO: Update this to use Atlas Search */
    results = await itemCollection.aggregate([
      { $search: {
          index: 'default',
          text: {
            query: req.params.query,
            path: ["name"]
          }
        }
      }
    ]).toArray();
    /** End */
```


The old code used the `find()` method to find an exact match. This new code uses the newly created Search index to return any records that would contain, in part or in full, the search term that we’ve passed to it.

If you try the application again with the word “Chicken,” you will get much more results this time. In addition to that, you might also notice that your searches are also case insensitive. But we can do even better. Sometimes, your users might be searching for more generic terms, such as one of the tags that describe the products or the brand name. Let’s add more fields to this search to return more relevant records.

In the `$search` stage that you added in the previous code snippet, change the value of the path field to contain all the fields you want to search.

```javascript
    /** TODO: Update this to use Atlas Search */
    results = await itemCollection.aggregate([
      { $search: {
          index: 'default',
          text: {
            query: req.params.query,
            path: ["name", "brand", "category", "tags"]
          }
        }
      }
    ]).toArray();
    /** End */
```

Experiment with your new application again. Try out some brand names that you know to see if you can find the product you are looking for.

Your search capabilities are now much better, and the user experience of your website is already improved, but let’s see if we can make this even better.

## Add autocomplete to your search box

A common feature of most modern search engines is an autocomplete dropdown that shows suggestions as you type. In fact, this is expected behaviour from users. They don’t want to scroll through an infinite list of possible matches; they’d rather find the right one quickly.

In this section, you will use the Atlas Search autocomplete capabilities to enable this in your search box. The UI already has this feature implemented, and you already created the required indexes, but it doesn’t show up because the API is sending back no results.

Open up the aggregation builder again to build a new pipeline. Start with a $search stage again, and use the following. Note how this $search stage uses the `autocomplete` stage that was created earlier.

```javascript
{
  'index': 'autocomplete',
  'autocomplete': {
    'query': "chic",
    'path': 'name'
  },
  'highlight': {
    'path': [
      'name'
    ]
  }
}
```

In the preview panel, you should see some results containing the string “chic” in their name. That’s a lot of potential matches. For our application, we won’t want to return all possible matches. Instead, we’ll only take the first five. To do so, a $limit stage is used to limit the results to five. Click on Add Stage, select $limit from the dropdown, and replace `number` with the value `5`.

![The autocomplete aggregation pipeline in Compass](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/autocomplete_aggregation_pipeline_compass_6cc4aa24fe.png)

Excellent! Now we only have five results. Since this request will be executed on each keypress, we want it to be as fast as possible and limit the required bandwidth as much as possible. A $project stage can be added to help with this—we will return only the ‘name’ field instead of the full documents. Click Add Stage again, select $project from the dropdown, and use the following JSON.

```javascript
{
  'name': 1,
  'highlights': {
    '$meta': 'searchHighlights'
  }
}
```

Note that we also added a new field named `highlights`. This field returns the metadata provided to us by Atlas Search. You can find much information in this metadata, such as each item's score. This can be useful to sort the data, for example.

Now that you have a working aggregation pipeline, you can use it in your application.

In the file _backend/index.js_, look for the route that listens for GET requests on `/autocomplete/:query`. After the `TODO` comment, add the following code to execute your aggregation pipeline. Don’t forget to replace the hard-coded query with `req.params.query`. You can [export the pipeline](https://www.mongodb.com/docs/compass/current/export-query-to-language/) directly from Compass or use the following code snippet.

```javascript
    // TODO: Insert the autocomplete functionality here
    results = await itemCollection.aggregate([
      {
        '$search': {
          'index': 'autocomplete',
          'autocomplete': {
            'query': req.params.query,
            'path': 'name'
          },
          'highlight': {
            'path': [
              'name'
            ]
          }
        }
      }, {
        '$limit': 5
      }, {
        '$project': {
          'name': 1,
          'highlights': {
            '$meta': 'searchHighlights'
          }
        }
      }
    ]).toArray();
    /** End */
```

Go back to your application, and test it out to see the new autocomplete functionality.

![The final application in action](https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/final_application_in_action_79650c4cc7.png)

And look at that! Your site now offers a much better experience to your developers with very little additional code.

## Add custom scoring to adjust search results

When delivering results to your users, you might want to push some products forward. Altas Search can help you promote specific results by giving you the power to change and tweak the relevance score of the results. A typical example is to put the currently on sale items at the top of the search results. Let’s do that right away.

In the _backend/index.js_ file, replace the database query for the `/search/:query` route again to use the following aggregation pipeline.

```javascript
    /** TODO: Update this to use Atlas Search */
    results = await itemCollection.aggregate([
      { $search: {
          index: 'default',
          compound: {
            must: [
              {text: {
                query: req.params.query,
                path: ["name", "brand", "category", "tags"]
              }},
              {exists: {
                path: "price_special",
                score: {
                  boost: {
                    value: 3
                  }
                }
              }}
            ]
          }
        }
      }
    ]).toArray();
    /** End */
```

This might seem like a lot; let’s look at it in more detail.

```javascript
      { $search: {
          index: 'default',
          compound: {
            must: [
              {...},
              {...}
            ]
          }
        }
      }
```

First, we added a `compound` object to the `$search` operator. This lets us use two or more operators to search on. Then we use the `must` operator, which is the equivalent of a logical `AND` operator. In this new array, we added two search operations. The first one is the same `text` as we had before. Let’s focus on that second one.

```javascript
{
exists: {
  path: "price_special",
  score: {
    boost: {
      value: 3
    }
  }
}
```

Here, we tell Atlas Search to boost the current relevance score by three if the field `price_special` exists in the document. By doing so, any document that is on sale will have a much higher relevance score and be at the top of the search results. If you try your application again, you should notice that all the first results have a sale price.

## Add fuzzy matching

Another common feature in product catalog search nowadays is fuzzy matching. Implementing a fuzzy matching feature can be somewhat complex, but Atlas Search makes it simpler. In a `text` search, you can add the `fuzzy` field to specify that you want to add this capability to your search results. You can tweak this functionality using [multiple options](https://www.mongodb.com/docs/atlas/atlas-search/text/#fuzzy-examples), but we’ll stick to the defaults for this application.

Once again, in the _backend/index.js_ file, change the `search/:query` route to the following.

```javascript
    /** TODO: Update this to use Atlas Search */
    results = await itemCollection.aggregate([
      { $search: {
          index: 'default',
          compound: {
            must: [
              {text: {
                query: req.params.query,
                path: ["name", "brand", "category", "tags"],
                fuzzy: {}
              }},
              {exists: {
                path: "price_special",
                score: {
                  boost: {
                    value: 3
                  }
                }
              }}
            ]
          }
        }
      }
    ]).toArray();
    /** End */
```

You’ll notice that the difference is very subtle. A single line was added.

```javascript
fuzzy: {}
```

This enables fuzzy matching for this `$search` operation. This means that the search engine will be looking for matching keywords, as well as matches that could differ slightly. Try out your application again, and this time, try searching for `chickn`. You should still be able to see some results.

A fuzzy search is a process that locates web pages that are likely to be relevant to a search argument even when the argument does not exactly correspond to the desired information.

## Summary

To ensure that your website is successful, you need to make it easy for your users to find what they are looking for. In addition to that, there might be some products that you want to push forward. Atlas Search offers all the necessary tooling to enable you to quickly add those features to your application, all by using the same MongoDB Query API you are already familiar with. In addition to that, there’s no need to maintain a second server and synchronize with a search engine.

All of these features are available right now on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register). If you haven’t already, why not give it a try right now on our free-to-use clusters?