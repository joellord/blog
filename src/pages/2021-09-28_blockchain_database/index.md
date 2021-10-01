---
path: "/blog/post/2021-09-28_blockchain_database"
date: "2021-09-28"
title: "Blockchain Database: A Comprehensive Guide"
summary: "Learn what a blockchain is and how it can be used with MongoDB to create a blockchain database."
abstract: "Learn what a blockchain is and how it can be used with MongoDB to create a blockchain database."
author: "Joel Lord"
formattedDate: "September 28th, 2021"
keywords: ["mongodb", "blockchain", "database"]
banner: "puzzle"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/databases/blockchain-database"
---
Any data structure used to store information can be considered a database. Blockchain technology, at its core, is no more than a ledger to store information about transactions. To that point, blockchains can be considered databases. Blockchain databases bring the concept one step further and combine the best of both worlds. In this article, you will learn the benefits of blockchain databases and how they can be used in your IT infrastructure.

What is a blockchain database?
------------------------------

To understand what blockchain databases are, it is crucial to understand what a blockchain is. Blockchains are used as a digital ledger to store transactional information. The data is stored as signed blocks, which link to each other, creating a chain of immutable interconnected data entries.

![Three blocks show some metadata and transactions. Each block contains a hash. The following block has a field called prevHash linking back to the previous block.](https://webimages.mongodb.com/_com_assets/cms/ktug12123jr0gnu39-image4.png?auto=format%252Ccompress)

To sign a new block, a node needs to find an SHA-256 signature that matches specific criteria. To do so, it will use the nonce field to brute force possible solutions. Any new block needs to be validated with the majority of the validation nodes forming the blockchain. Once the block has been validated, it is added to all the nodes of the blockchain. This way of validating new blocks is called the proof of work (PoW) and was very prevalent in the early days of blockchain technology. Nowadays, other methods for validating have emerged, such as the [proof of stake](https://en.wikipedia.org/wiki/Proof_of_stake) (PoS).

If any of the information in the data inside the block is altered, the signature becomes invalid. To make the block valid again, this signature would need to change. To ensure that the following blocks still work, a new signature would also need to be generated for each of them. Even if a node could regenerate those signatures, the changes would need to be accepted by a majority of the nodes hosting the blockchain.

For these reasons, blockchains are immutable. No information that is included in the data of the blocks can be changed. They are also managed by a set of decentralized nodes, removing the need for a central authority to control all the transactions. This immutability is why blockchains have gained popularity in industries such as finances and real estate.

Thanks to the way that blockchains work, they are ideal for storing asset information. In a blockchain, one can create and transfer assets over to another entity. These movements are referred to as transactions.

Blockchains can seem like a great solution to store information, but they do come with a price. The main limitation is around the performance when it comes to querying the database. Any new transactions need to be validated by all the nodes, and this can be a lengthy process, depending on the size of the blockchain itself. Querying the data can also be challenging, and the speed of read operations is nowhere near that of a database. This is where blockchain databases come into play.

By combining the power of modern databases with the integrity of blockchains, blockchain databases offer a way to securely store data while still providing easy ways to query the data from the transactions.

What is the difference between blockchain and database?
-------------------------------------------------------

The ultimate goal of a blockchain is to store information, which makes it a database. Blockchains only differ from other database types by the way they store data.

While blockchains can be considered a database, a database is typically not a blockchain. Databases generally don't use signed blocks to store the data.

|  | Blockchain | Databases |
| --- | --- | --- |
| ![data integrity icon](https://webimages.mongodb.com/_com_assets/cms/ktugc66zn9945e3o5-image3.png?auto=format%252Ccompress)

Data Integrity

 | The blockchain structure makes it virtually impossible for someone to change the data without breaking the chain. | A malicious actor can potentially alter data if necessary measures are not taken. |
| ![transactions icon](https://webimages.mongodb.com/_com_assets/cms/ktugaqhm1w5emxc8s-image2.png?auto=format%252Ccompress)

Transactions

 | Data can only be read or added to the blockchain. | Data can be created, read, updated, or deleted (CRUD operations). |
| ![querying performance icon](https://webimages.mongodb.com/_com_assets/cms/ktug8nb17phwa14zl-image11.png?auto=format%252Ccompress)

Querying Performance

 | The verification methods to ensure data integrity can slow down the querying and general performance of a blockchain. | Databases provide blazing-fast access to the data. |
| ![structure icon](https://webimages.mongodb.com/_com_assets/cms/ktug9y9zwm9e58hkf-image9.png?auto=format%252Ccompress)

Structure

 | Blockchains can be fully decentralized and not rely on any central authority. | Databases are centrally managed, and an administrator owns and controls the data. |

Even though databases and blockchains are typically seen as two different items, it is possible to create a hybrid. Those hybrids are called blockchain databases and try to use the best of both worlds to create a secure and immutable chain of easily queryable blocks that offers excellent performance.

Using MongoDB Atlas in a blockchain
-----------------------------------

When a blockchain is created, each block needs to be stored in a central location so that the blockchain itself can be queried or add new blocks to the chain. MongoDB Atlas, the database-as-a-service cloud solution from MongoDB, is perfect for storing a blockchain ledger.

-   Its [flexible schema](https://docs.mongodb.com/manual/core/data-modeling-introduction/#flexible-schema) makes it easy to store complex objects such as transactions.
-   It provides [enterprise-grade security](https://docs.mongodb.com/manual/security/).
-   It has graph chain capabilities with [$graphLookup](https://docs.mongodb.com/manual/reference/operator/aggregation/graphLookup/) to help efficiently query the blockchain.
-   Drivers are available for popular languages used in blockchain development, such as [Go](https://docs.mongodb.com/drivers/go/), [JavaScript](https://docs.mongodb.com/drivers/node/current/), and [C++](https://docs.mongodb.com/drivers/cxx/).
-   [Change streams](https://www.mongodb.com/basics/change-streams) are available to trigger events when needed.
-   Automatic synchronization of databases is available for any mobile device with [MongoDB Realm](https://www.mongodb.com/realm).

The data stored in MongoDB can be used in different ways.

-   On-chain data: On-chain data is the data from the transactions in the blockchain.
-   Off-chain data: Off-chain data refers to information that is related to the blockchain, but not stored directly within the blocks. Using MongoDB for off-chain data storage can provide additional security and privacy.
-   Centralized ledger: MongoDB can be used to store all the information about the blocks. This information is stored with cryptographic evidence to avoid any tampering with the data.

How do I create a blockchain database?
--------------------------------------

Before [building a blockchain database](https://www.mongodb.com/presentations/webinar-building-a-blockchain-database-with-mongodb), there are some considerations to take into account. Each deployment scenario is described in deeper detail in the [Building Enterprise-Grade Blockchain Databases with MongoDB](https://www.mongodb.com/collateral/building-enterprise-grade-blockchain-databases-with-mongodb) whitepaper.

First is the database deployed in an enterprise or a consortium. Blockchains don't necessarily have to be decentralized. Sometimes, an enterprise can use a blockchain internally and act as the central authority controlling the data. In most cases, though, blockchains operate in a consortium. Cryptocurrencies use this consortium model to ensure that no single source owns the data. In this case, each validation node needs to have a copy of the data.

Secondly, how will the data be used? Data used directly by the clients connecting to the database is referred to as operational data. This is the case for cryptocurrencies. Anyone can query and perform actions on the blockchain. Non-operational, on the other hand, would be accessed via an intermediary.

![A grid with four boxes show the four deployment scenarios.](https://webimages.mongodb.com/_com_assets/cms/ktuhb7mwwjzceez9s-deployment-type.png?auto=format%252Ccompress)

*The blockchain architecture depends on the deployment type and data type.*

These two axes will decide which of the following four deployment models you will need to create.

### Centralized with operational data

If the database is deployed within an enterprise, it doesn't need to be decentralized. This centralization simplifies the overall deployment scenario. Although this might seem counterintuitive for a blockchain, it still provides advantages compared to other databases.

This blockchain database provides the enterprise with the immutability of the documents created and the possibility to create and transfer assets.

Such a deployment is more familiar to most development teams because it is similar to regular application deployment.

![Clients, both internal and external can access the blockchain database for operational data. The administrators inside the enterprise control the database.](https://webimages.mongodb.com/_com_assets/cms/ktuhdgm3pav3aazrb-centralized-operational.png.png?auto=format%252Ccompress)

*A centralized with operational data deployment architecture.*

This deployment scenario could be used inside an enterprise for data that later needs to be audited. It can provide a third-party auditor with a solid track for asset transfers.

### Centralized with non-operational data

Just like in the previous scenario, the deployment, in this case, would be centralized and maintained by a limited number of administrators. The main difference is that the data is not accessed directly by the clients. Instead, the clients connect to database instances that can connect and offload parts of the data to the blockchain.

This additional layer reduces the number of nodes needed to agree to accept a transaction, increasing the overall performance of the database. It also adds more privacy since the data is only accessible by a limited number of clients controlled by the enterprise.

![Clients, both internal and external can access data from a database, linked to the blockchain database. The administrators inside the enterprise control both databases.](https://webimages.mongodb.com/_com_assets/cms/ktuhhk2l3ug6zt9f9-centralized-non-operational.png?auto=format%252Ccompress)

*A centralized with non-operational data deployment architecture.*

The use cases for this scenario are similar to the previous method, but where speed or privacy is more important. Such would be the case for a system that manages customer credit status across finance and sales systems.

### Decentralized with operational data

In this scenario, a consortium is created, removing the need for a single entity to control the database infrastructure. This decentralization increases the immutability of the data since each member would own a node in the blockchain.

In a decentralized scenario, data privacy will need additional care. For example, a financial institution client might only want to give read permissions to its data on an as-needed basis to other consortium members.

![Clients, both internal and external can access the blockchain database for operational data. Administrators from different enterprises control the database.](https://webimages.mongodb.com/_com_assets/cms/ktuhkou1a82myu03y-decentralized-operational.png?auto=format%252Ccompress)

*A decentralized with operational data deployment architecture.*

This type of deployment can have multiple applications across various industries. Examples of this type of deployment in the wild include the [Open Music Initiative](https://open-music.org/) for musicians and [R3](https://www.r3.com/) for financial institutions.

### Decentralized with non-operational data

This deployment scenario is similar to its centralized counterpart but with multiple administrators from different consortium members controlling the blockchain.

![Clients, both internal and external can access data from a database, linked to the blockchain database. Administrators from different enterprises control the various databases.](https://webimages.mongodb.com/_com_assets/cms/ktuhodn9u71lf1v98-decentralized-non-operational.png?auto=format%252Ccompress)

*A decentralized with non-operational data deployment architecture.*

This scenario provides the blockchain with the benefits of a decentralized operational data scenario, with the increased speed and privacy resulting from the limited clients accessing the blockchain.

How to integrate blockchain within the enterprise IT stack
----------------------------------------------------------

Depending on the chosen deployment type, the blockchain integration in the IT stack will differ significantly.

When thinking about centralized blockchains, the IT stack is similar to a traditional one. The blockchain would sit next to the application on the enterprise infrastructure. On the other hand, a decentralized blockchain would live on multiple servers owned by different entities.

A fully decentralized architecture offers many benefits, such as avoiding interference by a single authority owning and controlling the blockchain. This is why this type of architecture has been successful for cryptocurrencies. However, the nature of a decentralized database makes it virtually impossible to integrate within an enterprise infrastructure.

![A list of possible IT stacks.](https://webimages.mongodb.com/_com_assets/cms/ktuhqt18jicv0tdac-centralized-decentralized.png?auto=format%252Ccompress)

*The spectrum of centralized vs decentralized deployments.*

For enterprise-grade applications, the ideal scenario would be one of a partially decentralized architecture. In this case, the application and some operational data would be owned and controlled as part of the traditional IT stack. Still, a blockchained database component could live across multiple distributed nodes.

Blockchain database design
--------------------------

Blockchains by themselves can contain transactional data but have very limited querying abilities. The other problem is with the work required to prove that a block is valid. To validate a block, a majority of nodes need to approve it. The more nodes in the system, the longer this can take. For this reason, it is hard to use a blockchain as a database in the traditional sense.

Instead, it is simpler to take an existing database and then add a blockchain feature on top of it. In this case, two database layers are used. The first layer utilizes a lightweight distributed consensus protocol that ensures some integrity level while providing good performance for querying. The second layer uses a [proof of work](https://en.wikipedia.org/wiki/Proof_of_work) (PoW) based blockchain to store evidence of the database operations from the first layer.

The two layers are connected through a blockchain [anchoring mechanism](https://research.csiro.au/blockchainpatterns/general-patterns/self-sovereign-identity-patterns/anchoring-to-blockchain/). This anchoring mechanism links parts of the first layer with blocks in the second layer. This creates a chain of evidence validating data from the first layer.

MongoDB: The database that the BigchainDB team chose
----------------------------------------------------

[BigchainDB](https://www.mongodb.com/partners/bigchaindb) is one of the first blockchain databases developed for general purposes. It offers powerful query functionalities and high performance, along with all the benefits of a classic blockchain to create decentralized and immutable data storage.

To implement their solution for a blockchain database, the BigchainDB team decided to use MongoDB as the distributed database under the hood of their product. This decision was based on many factors.

-   Popularity: MongoDB is the most popular document database and has been on developers' top wanted database lists for years.
-   Flexibility: The data is stored in Binary JSON (BSON) format, allowing for structured or unstructured data. Unlike relational databases, MongoDB offers developers a flexible schema model.
-   Performance: MongoDB is ready for vast quantities of data and was built with scalability in mind.
-   Ease of deployment: MongoDB can be easily deployed locally on each node in a system or directly in the cloud with MongoDB Atlas.

Next steps
----------

This article is meant to be a simple introduction to blockchain technology and blockchain databases. If you want to dig deeper into the topic of blockchain databases and deployment scenarios, take a look at the whitepaper [Building Enterprise-Grade Blockchain Databases with MongoDB](https://www.mongodb.com/collateral/building-enterprise-grade-blockchain-databases-with-mongodb). If you're going to try building your own blockchain, you can try reading [Identity management application using Blockchain, MongoDB Stitch & MongoDB Atlas - Part 1](https://www.mongodb.com/blog/post/identity-management-application-using-blockchain-mongodb-stitch--mongodb-atlas--part-1). Blockchains can take multiple forms, and now that you have a better understanding of how to use them, you might want to test it out in your own IT stack.