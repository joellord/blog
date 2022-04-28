---
path: "/blog/post/2022-02-28_mongoengine"
date: "2022-02-28"
title: "MongoEngine vs Pymongo with Flask"
summary: "When it comes to connecting your Flask application to a MongoDB database, there are multiple options available. The two most common libraries to choose from are MongoEngine and PyMongo. Both of these libraries have pros and cons."
abstract: "When it comes to connecting your Flask application to a MongoDB database, there are multiple options available. The two most common libraries to choose from are MongoEngine and PyMongo. Both of these libraries have pros and cons."
author: "Joel Lord"
formattedDate: "February 28, 2022"
keywords: ["python", "mongoengine", "Flask"]
banner: "facade"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/compatibility/mongoengine-pymongo"
---

When it comes to connecting your Flask application to a MongoDB database, there are multiple options available. The two most common libraries to choose from are MongoEngine and PyMongo. Both of these libraries have pros and cons. This article will highlight the differences between them and help you choose the best library for your use case.

What is MongoEngine?
--------------------

MongoEngine is a library that lets you connect to a MongoDB database and use documents as if they were objects in your code. They dub themselves an ODM (Object-Document Mapper). The project's goal is to create a library similar to other ORM (Object-Relational Mapping) libraries, but for MongoDB.

It was first released in 2015 as an open-source project, and the current version is built on top of PyMongo, the official Python driver by MongoDB.

To help you get started, MongoEngine offers [extensive documentation](http://docs.mongoengine.org/), as well as a mailing list where you can ask questions.

What is PyMongo?
----------------

[PyMongo](https://docs.mongodb.com/drivers/pymongo/) is MongoDB's official native driver for Python. It's a library that lets you connect to a MongoDB database and query the data stored using the [MongoDB Query API](https://www.mongodb.com/mongodb-query-api). It is the recommended way to interface with the document database.

It is available as an open-source project on Github and can be installed using Python's familiar `pip` package installer.

In addition to comprehensive documentation on the MongoDB website, you can find help in the [community forums](https://www.mongodb.com/community/forums/tags/c/data/drivers-odms/7/python).

How to use MongoEngine and PyMongo in Flask
-------------------------------------------

Flask is a powerful Python micro framework used to create web servers with an intuitive syntax.

It is simple yet extremely powerful and can be used for applications of all sizes. Combined with a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database, it is easy to create APIs that can access your data.

To demonstrate how to use MongoEngine and PyMongo with Flask, here is the code for a simple web server with two routes written with both libraries.

In these examples, the `/create` route adds a user with a random name. The random name is generated with the `names` package. The `/list` route retrieves all the users from the database and lists them. You can access both routes from the browser.

### Project setup

First, start by installing the required packages.

```
python -m pip install flask mongoengine pymongo[srv] names
```

Then create a file that will contain the code from the examples below, set the `FLASK_APP` environment variable to match that file, and use the `flask` CLI (Command Line Interface) tool to start the server.

```
touch main.py
export FLASK_APP=main
python -m flask run
```

*Note: You will need to stop the server using Ctrl-C and use that last command again whenever you change the code in main.py to ensure that the server runs the latest code.*

Once the server is running, you can open up your browser at <http://127.0.0.1:5000/create> to add a new entry to the database, and <http://127.0.0.1:5000/list> to list all the documents from the users' collection.

You can find the two files in this [Github repository](https://github.com/mongodb-developer/flask-mongoengine-pymongo).

### MongoEngine with Flask

In MongoEngine, connecting to the database is done with the `connect` method, to which you pass the [connection string](https://docs.mongodb.com/upcoming/reference/connection-string/) provided by Atlas. Then, a `User` object needs to be created. This object has a single field to hold the name of the user. You can see in the Flask routes that this object is then used to create or list users in the database.

```
from flask import Flask
from mongoengine import *
import names

app = Flask(__name__)

connect(host="<CONNECTION_STRING>/flask_example_db")

class User(Document):
    name = StringField()

@app.route("/create")
def add_user():
    new_user = User(name=names.get_full_name())
    new_user.save()
    return str(new_user.id)

@app.route("/list")
def get_user():
    return User.objects.to_json()
```

### PyMongo with Flask

With PyMongo, a client is first created to connect to the database using the [connection string](https://docs.mongodb.com/upcoming/reference/connection-string/) provided by Atlas. Then, the familiar MongoDB Query API is used to create or retrieve data from the database. You will also note that this example requires conversion for the new object ids.

That is because PyMongo uses the [BSON](https://www.mongodb.com/json-and-bson) format rather than abstracting to a JSON format.

```
from pymongo import MongoClient
from flask import Flask
from bson.json_util import dumps
import names

app = Flask(__name__)

client = MongoClient("<CONNECTION_STRING>")
db = client.flask_example_db

@app.route("/create")
def add_user():
  result = db.users.insert_one({"name": names.get_full_name()})
  return str(result.inserted_id)

@app.route("/list")
def get_user():
  users = list(db.users.find({}))
  return dumps(users)
```

How does MongoEngine compare to PyMongo?
----------------------------------------

Both libraries offer different features. MongoEngine uses PyMongo behind the scenes to manage the connections to the database. It is meant to be an easy entryway for developers used to working with [SQLAlchemy](https://www.sqlalchemy.org/) or other similar ORMs. This can reduce the learning curve when software engineers are first introduced to MongoDB and its document model. However, using MongoEngine can come at an additional cost when misused.

PyMongo is the official native driver for MongoDB. It includes all the functionalities of the MongoDB Query API. It is a powerful way to perform CRUD (Create-Read-Update-Delete) operations on a database and provides an easy way to build aggregation pipelines.

When using PyMongo directly, leveraging the power of those pipelines, developers can use their database to its full potential. Using PyMongo could also avoid some bad habits that would cause performance issues, such as using the ORM in a `for` loop rather than batching up commands in PyMongo.

Summary
-------

Both PyMongo and MongoEngine can be used to access data from a MongoDB database.

However, they work in very different ways and offer different features. PyMongo is the MongoDB recommended library. It makes it easy to use MongoDB documents and maps directly to the familiar MongoDB Query Language. If you've used tools such as [mongosh](https://docs.mongodb.com/mongodb-shell/) in the past, the syntax will be very familiar to you.

In addition to a familiar syntax, you will be able to use all of the advanced features offered by Atlas when using PyMongo, such as [aggregation pipelines](https://docs.mongodb.com/manual/core/aggregation-pipeline/) and [Atlas Search](https://www.mongodb.com/atlas/search).

Learn more about using MongoDB with Python with the following resources.