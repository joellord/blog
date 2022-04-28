---
path: "/blog/post/2022-03-07_scraper"
date: "2022-03-07"
title: "Build a Web Scraper with MongoDB"
summary: "A document database is a natural fit for web scraping. Using MongoDB removes the need to normalize data to accommodate the database. Instead, you can store the same objects you are using in the code."
abstract: "A document database is a natural fit for web scraping. Using MongoDB removes the need to normalize data to accommodate the database. Instead, you can store the same objects you are using in the code."
author: "Joel Lord"
formattedDate: "March 7, 2022"
keywords: ["python", "scraper", "mongodb"]
banner: "bench"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/how-to-use-mongodb-to-store-scraped-data"
---

A document database is a natural fit for web scraping. Using MongoDB removes the need to normalize data to accommodate the database. Instead, you can store the same objects you are using in the code. MongoDB Atlas, the database-as-a-service offering by MongoDB, makes it easy to store scraped data from websites without setting up a local database.

Web scraping is a way to extract some data from different sources on the web programmatically. While web scraping is sometimes associated with nefarious usage, there are some legitimate use cases. Search engines, for example, perform a crawl of all the websites to index them and make them available for search. Price comparison websites are another example of legitimate web scraping.

*Note: While web scraping itself is legal in most places, you need to keep in mind that publicly available data is still personal data. Therefore, repurposing the data without consent from the owner is not permitted in most countries.*

This article will show you how to use [Scrapy](https://scrapy.org/), a Python library, to scrape data from a website and store this information in a MongoDB database.

Storing data scraped from Scrapy in a MongoDB database is done with the following steps:

-   [Create a basic spider.](https://www.mongodb.com/basics/how-to-use-mongodb-to-store-scraped-data#create-a-spider-to-scrape-a-website)
-   [Create Items to manipulate the data.](https://www.mongodb.com/basics/how-to-use-mongodb-to-store-scraped-data#create-an-item)
-   [Create an Item Pipeline that saves the Items to MongoDB.](https://www.mongodb.com/basics/how-to-use-mongodb-to-store-scraped-data#create-an-item-pipeline)

Getting started
---------------

If you simply want access to this project's source code, you can find it on [Github](https://github.com/mongodb-developer/scrapy).

For this project, you will need:

-   A MongoDB Atlas database.
-   Python 3.3+.

### Set up a MongoDB Atlas cluster

For this project, you'll use a MongoDB Atlas database. Using the cloud-based offering from MongoDB is the easiest way to get started. You can find instructions to create your forever-free cluster in the [documentation](https://docs.atlas.mongodb.com/getting-started/). Once you have your database setup, note your [connection string](https://docs.mongodb.com/upcoming/reference/connection-string/) for later on.

### Set up your project

To ensure that your project is isolated from other Python projects, you should use a virtual environment. To create one, you can use `venv`.

```
python3 -m venv env-scrapy-mongodb
source env-scrapy-mongodb/bin/activate
```

*Note: You might have to run this first command using the `python3` executable on macOS. This is because, on some operating systems, both Python 2 and 3 are installed. Once you've logged into your virtual environment, the `python` executable will use Version 3 automatically.*

Once your virtual environment is ready, you can install the project dependencies using `pip install`.

```
python -m pip install scrapy ​​'pymongo[srv]'
```

This command will install `scrapy` and `pymongo[srv]`, along with other required dependencies for those two packages. Once the installation is completed, you are ready to start writing your web crawler.

Create a spider to scrape a website
-----------------------------------

Scrapy uses classes called spiders to define what pages to crawl and how to parse the information on that page. This tutorial will scrape quotes from the [Quotes to Scrape](https://quotes.toscrape.com/) website provided by [Zyte](https://www.zyte.com/).

To create your first spider, use the `scrapy startproject` command. This will provide you with all the scaffolding necessary to build your web scraping project. Next, go to the newly created directory and use the `scrapy genspider` command to generate your first spider.

```
scrapy startproject mongodb_crawler .
cd mongodb_crawler
scrapy genspider quotes quotes.toscrape.com
```

You now have all the necessary files for your project. With your favorite code editor, open up your project, and edit the `quotes.py` file. Replace the content of the `parse()` function with the following.

mongodb_crawler/spiders/quotes.py

```
    def parse(self, response):
        # Parse each quote div
        for quote in response.css('div.quote'):
            item = {}

            item['author'] = quote.css('small.author::text').get()
            item['text'] = quote.css('span.text::text').re(r'"(.+)"')[0]
            item['tags'] = quote.css('div.tags a.tag::text').getall()

            yield item

        # Find the "Next ->" button and follow the link
        for a in response.css('ul.pager a'):
            yield response.follow(a, callback=self.parse)
```

This new parse function will iterate through each div on the page with the class name `quote`.

Each quote block has

-   A `small` element with the class `author` which contains the author of the quote.
-   A `span` element with the class `text` which contains the quote itself. Note how a regular expression is used to remove the quotation marks around the quote.
-   A series of anchors---`a` elements representing the various tags associated with the quote. Here, we use `getall()` to get an array of all the tags.

![A screenshot of the quotes page, showing the HTML next to it.](https://webimages.mongodb.com/_com_assets/cms/l1qkqw1mkj8vfk74o-image3.png?auto=format%252Ccompress)

*Using the code inspector in your browser can show you the structure of the elements you are trying to scrape*

You can explore the website's content structure you want to crawl by using the code inspector in your browser's developer tools.

You can now run this spider to scrape all the 110 quotes from the website.

```
scrapy crawl quotes
```

You should see the quotes printed out to your terminal if everything goes well. Now that we can successfully extract the data, let's create a standard Scrapy Item that we'll save to the MongoDB database.

Create an Item
--------------

Scrapy has this concept of items with a dictionary-like API and some additional features to help you structure data that would generally be unstructured. For this example, you'll have a single item, defined in `items.py`. You can replace the content of the file with the following.

mongodb_crawler/items.py

```
import scrapy

class QuoteItem(scrapy.Item):
    author = scrapy.Field()
    text = scrapy.Field()
    tags = scrapy.Field()
```

Here, you've defined a `QuoteItem` class with the author, text, and tags fields. Now go back to the `QuotesSpider`, and use this new Item rather than a regular Item. Start by importing this class, then define the `item` variable as a `QuoteItem`. Your final file should now look like this.

mongodb`_`crawler/spiders/quotes.py

```
import scrapy
from ..items import QuoteItem

class QuotesSpider(scrapy.Spider):
    name = 'quotes'
    allowed_domains = ['quotes.toscrape.com']
    start_urls = ['http://quotes.toscrape.com/']

    def parse(self, response):
        # Parse each quote div
        for quote in response.css('div.quote'):
            item = QuoteItem()

            item['author'] = quote.css('small.author::text').get()
            item['text'] = quote.css('span.text::text').re(r'"(.+)"')[0]
            item['tags'] = quote.css('div.tags a.tag::text').getall()

            yield item

        # Find the "Next ->" button and follow the link
        for a in response.css('ul.pager a'):
            yield response.follow(a, callback=self.parse)
```

You should still have the same result if you start the crawl again. Now that you have items in place, it's time to add an Item Pipeline to save those to MongoDB.

Create an Item Pipeline
-----------------------

Item Pipelines in Scrapy are used to process the items that have been scraped from a web page. Once an item is yielded, it goes through all the pipelines you've defined in the crawler settings.

Let's start by adding a `MongoDBPipeline` to the `pipelines.py` file.

mongodb_crawler/pipelines.py

```
import pymongo
import sys
from .items import QuoteItem

class MongoDBPipeline:

    collection = 'scrapy_items'

    def __init__(self, mongodb_uri, mongodb_db):
        self.mongodb_uri = mongodb_uri
        self.mongodb_db = mongodb_db
        if not self.mongodb_uri: sys.exit("You need to provide a Connection String.")

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongodb_uri=crawler.settings.get('MONGODB_URI'),
            mongodb_db=crawler.settings.get('MONGODB_DATABASE', 'items')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongodb_uri)
        self.db = self.client[self.mongodb_db]
        # Start with a clean database
        self.db[self.collection].delete_many({})

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        data = dict(QuoteItem(item))
        self.db[self.collection].insert_one(data)
        return item
```

There is a lot of code here, so let's look at it little bits at a time.

```
    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongodb_uri=crawler.settings.get('MONGODB_URI'),
            mongodb_db=crawler.settings.get('MONGODB_DATABASE', 'items')
        )
```

The `from_crawler()` function here enables you to inject parameters from the CLI into the `__init__()` function. Here, the function looks for the `MONGODB_URI` and `MONGODB_DATABASE` settings that will be passed using the `-s` argument with the `scrapy crawl` command.

```
    def __init__(self, mongodb_uri, mongodb_db):
        self.mongodb_uri = mongodb_uri
        self.mongodb_db = mongodb_db
        if not self.mongodb_uri: sys.exit("You need to provide a MongoDB Connection String.")
```

The `__init__()` method gets those two variables from the crawler settings and stores them for later use. A check is made right away to see if a connection string is provided. If not, the application stops here.

Next up are the `open_spider()` and `close_spider()` functions.

```
    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongodb_uri)
        self.db = self.client[self.mongodb_db]
        # Start with a clean database
        self.db[self.collection].delete_many({})

    def close_spider(self, spider):
        self.client.close()
```

These functions use [PyMongo](https://docs.mongodb.com/drivers/pymongo/) to open a client that Scrapy will use throughout the whole lifecycle of the spider. Using the `open_spider()` and `close_spider()` functions here has the benefit of keeping a single database connection shared for any processed item rather than creating a new connection every time.

The `delete_many()` method is used here to drop all the documents from the collection, so your collection is clean before every run.

```
    def process_item(self, item, spider):
        data = dict(QuoteItem(item))
        self.db[self.collection].insert_one(data)
        return item
```

Finally, the `process_item()` function processes every item passed to this pipeline. Here, items are saved to the database using `insert_one()` and then returned to be processed by the next pipeline, if any.

Because MongoDB uses BSON, an extended version of JSON, to store data, it can handle embedded arrays within documents. This is a huge benefit over traditional databases when you want to store data scraped from a website. Without this document model, you would first need to save the quote and all the tags in a separate table. In MongoDB, you can insert the same objects that you use in your codebase.

The last step is to connect this pipeline with the spider. To do so, open up the crawler settings and add the following.

mongodb_crawler/settings.py

```
ITEM_PIPELINES = {
  "mongodb_crawler.pipelines.MongoDBPipeline": 500
}
```

The number indicates in which order to run this pipeline if there was more than one pipeline in the array.

You are now ready to rerun your crawler. This time, you will also need to specify the connection string and database to use for the MongoDB pipeline. Make sure to replace the connection string placeholders with your own credentials.

```
scrapy crawl -s MONGODB_URI="mongodb+srv://<YOUR_CONNECTION_STRING>" -s MONGODB_DATABASE="scrapy" quotes
```

The spider now goes to the website, finds all the quotes, and stores them in your database.

![A screenshot of Compass listing some documents from the scrapy database.](https://webimages.mongodb.com/_com_assets/cms/l1qjtcw89x53fmypz-image1.png?auto=format%252Ccompress)

*Compass, the MongoDB GUI, can be used to visualize the documents*

If you look at your `scrapy` database using [Compass](https://www.mongodb.com/products/compass) or the [Atlas UI](https://cloud.mongodb.com/), you should see 110 documents in your collection.

Next steps
----------

You have learned how to create a web crawler in Python using Scrapy and MongoDB. Now that the initially unstructured data is stored in a MongoDB database, you can query this data or analyze it. MongoDB Atlas is more than a database; it's a complete application data platform.

You could, for example, use [MongoDB Charts](https://www.mongodb.com/products/charts) to create visualizations of this data or use [Atlas Search](https://www.mongodb.com/atlas/search) to add full-text search capabilities to your new quotes database. Why not get started with a [free account](https://www.mongodb.com/cloud/atlas/register) if you haven't already?