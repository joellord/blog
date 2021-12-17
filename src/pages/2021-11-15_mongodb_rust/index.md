---
path: "/blog/post/2021-11-15_mongodb_rust"
date: "2021-11-15"
title: "Rust & MongoDB"
summary: "Rust can connect to any MongoDB instance, including MongoDB Atlas. To experiment with Rust, you can try creating a cluster in MongoDB Atlas."
abstract: "Rust can connect to any MongoDB instance, including MongoDB Atlas. To experiment with Rust, you can try creating a cluster in MongoDB Atlas."
author: "Joel Lord"
formattedDate: "November 15, 2021"
keywords: ["mongodb", "rust", "programming"]
banner: "puzzle"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/languages/rust"
---
Rust is a programming language that has been gaining in popularity over the last few years. It is a statically-typed language that is focused on efficiency and speed.

MongoDB provides drivers for most modern programming languages, including a native driver for connecting your Rust application to any MongoDB clusters, such as servers on MongoDB Atlas, the Database-as-a-Service offering by MongoDB.

This article will cover the main benefits of using Rust and how you can use it to access your databases in MongoDB.

Table of Contents

-   [What is the Rust programming language?](https://www.mongodb.com/languages/rust#what-is-the-rust-programming-language)
-   [What are the benefits of using Rust?](https://www.mongodb.com/languages/rust#what-are-the-benefits-of-using-rust)
-   [Can you use Rust with MongoDB?](https://www.mongodb.com/languages/rust#can-you-use-rust-with-mongodb)
-   [Rust and MongoDB Atlas](https://www.mongodb.com/languages/rust#rust-and-mongodb-atlas)

What is the Rust programming language?
--------------------------------------

Rust is a statically typed programming language that is used to make the most of your available resources. It is a great programming language to write CLI (command line interface) tools, embedded device applications, or any other application where you need access to system resources, such as web browsers.

Rust was created in 2006 by Graydon Hoare, a Mozilla employee. Since then, the language has evolved into its current form. In 2009, Mozilla officially started to sponsor the project. The first stable release (v1.0) was in 2015. Since then, a new release has come out every six weeks.

What are the benefits of using Rust?
------------------------------------

Rust has been gaining more and more popularity amongst software developers. The ecosystem of frameworks is not as mature as other languages, but Rust still provides many benefits.

It is often used as an alternative to C/C++ because of the many benefits to software developers, such as zero-cost abstraction, memory management, support for concurrency, and the large and active community around it.

### Zero-cost abstractions

Simply put, because Rust tracks the memory at compile time rather than at runtime, the code consistently compiles to the same assembly code.

This compiler optimization means there is almost no difference in resource usage whether you use low-level code or multiple abstraction layers.

### Memory management

As a software developer, you might need to have low-level control over the memory management of your applications. Doing so can potentially cause memory problems which will lead to poor performance.

Rust's memory management keeps track of which variable is in memory. It then knows when the data is no longer needed and immediately frees the used memory. This ownership system removes the need for garbage collection and reduces the overhead cost in resources for the applications.

### Support for concurrency

Another significant benefit of using Rust is the built-in support for multi-threading.

Rust's ownership system helps to manage the memory at compile time. This system ensures that only one variable can own a specific piece of data. This ownership prevents a second thread from operating on the same data, thus mutating the content of a variable, while the first thread reads from it. This system avoids data races that could cause fatal errors in your application.

### Active community

Rust has a somewhat steep learning curve for newcomers. However, it also has a great community where users are willing to help each other.

Amongst the available resources to you are the [Discord channel](https://discord.com/invite/rust), an active [official forum](https://users.rust-lang.org/), and excellent [documentation](https://www.rust-lang.org/learn).

This project is actively maintained by a dedicated group of contributors and is backed by the Mozilla Foundation.

Can you use Rust with MongoDB?
------------------------------

You can use Rust with MongoDB by using the [Rust driver](https://docs.mongodb.com/drivers/rust/), available on the [drivers' page](https://docs.mongodb.com/drivers/). To get started with Rust and MongoDB, you can add the `mongodb` crate to your dependencies, and you are good to go. Follow the [getting started guides](https://www.mongodb.com/developer/quickstart/rust-crud-tutorial/) to learn how to connect and perform CRUD (Create, Read, Update, and Delete) operations on your Atlas cluster.

MongoDB uses [BSON](https://www.mongodb.com/json-and-bson) to store the data and transforms the data into JSON to make it human-readable. Many programming languages, such as JavaScript, can directly use the JSON format. Unfortunately, this JSON format, along with its dynamic schema, does not work well with the static typing system of Rust. To palliate this problem, the `mongodb` dependency includes the `bson` crate with helpers to generate BSON documents. You can also use [serde](https://serde.rs/) to serialize and deserialize data between Rust structs and JSON.

To connect to a MongoDB database, start by creating a new Rust project with the following command:

```
# cargo new --bin rust_quickstart
```

Next, add the `mongodb` dependency in your `Cargo.toml` file. You will also need to add `tokio` to be able to use the asynchronous methods.

`Cargo.toml`

```
[dependencies]
tokio = "1.12"
mongodb = "2.0"
```

Finally, you can overwrite the `main.rs` file with the following code.

`main.rs`

```
use mongodb::{options::ClientOptions, Collection, bson::Document, bson::doc};
use std::error::Error;
use tokio;
#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
 // Create a client that connects to the computer_scientists collection
 let options = ClientOptions::parse("<CONN_STRING>").await?;
 let client = mongodb::Client::with_options(options)?;
 let theaters: Collection<Document> = client.database("sample_mflix").collection("theaters");
 // Look up one document:
 let theater = theaters
                 .find_one(doc! {"theaterId": 1043}, None,)
                 .await
                 ?.expect("No matching documents found.");
 println!("Theater: {}", theater);
 Ok(())
}
```

You will need to change `<CONN_STRING>` with your [connection string](https://docs.mongodb.com/upcoming/reference/connection-string/).

You can test out the application by running:

```
# cargo run
```

Assuming that you have the [sample dataset](https://docs.atlas.mongodb.com/sample-data/available-sample-datasets/) installed on your cluster, this code snippet will create a client and access the `theaters` collection from the `sample_mflix` database. The `find_one` method is then used on the `theaters` collection to fetch the first record and output the document to the screen.

```
  Compiling rust_quickstart v0.1.0 (/opt/app/rust_quickstart)
   Finished dev [unoptimized + debuginfo] target(s) in 4.68s
    Running `target/debug/rust_quickstart`
Theater: { "_id": ObjectId("59a47286cfa9a3a73e51e752"), "theaterId": 1043, "location": { "address": { "street1": "1240 Marvin Rd Ne", "city": "Lacey", "state": "WA", "zipcode": "98516" }, "geo": { "type": "Point", "coordinates": [-122.76134, 47.058128] } } }
```

You can check out the source code on [Github](https://github.com/mongodb-developer/mongodb-rust), or find out more about how to do more advanced operations in the [Rust quick start guide](https://www.mongodb.com/developer/quickstart/rust-crud-tutorial/).

Rust and MongoDB Atlas
----------------------

Using Rust, you can connect to any MongoDB instance, including [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), the Database-as-a-Service offering by MongoDB. To experiment with Rust, you can try [creating a cluster](https://www.mongodb.com/cloud/atlas/register) in MongoDB Atlas.

With MongoDB Atlas, you can focus entirely on the application you develop and not worry about MongoDB installation or configuration. Get the [connection string](https://docs.mongodb.com/upcoming/reference/connection-string/) to your cluster from the Atlas Web UI, and use it in your code to connect to the database. That's it. You are now ready to [write your Rust application](https://www.mongodb.com/presentations/an-introduction-to-using-mongodb-with-rust).