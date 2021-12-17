---
path: "/blog/post/2021-12-13_container_orchestration"
date: "2021-12-13"
title: "What is Container Orchestration?"
summary: "Microservices architecture has emerged to help businesses break down their monolith applications into smaller pieces, reducing the risk of breaking critical parts with each quick deployment cycle. Those microservices are typically deployed using containers, and with more and more containers deployed comes the need to have a container orchestration tool."
abstract: "Microservices architecture has emerged to help businesses break down their monolith applications into smaller pieces, reducing the risk of breaking critical parts with each quick deployment cycle. Those microservices are typically deployed using containers, and with more and more containers deployed comes the need to have a container orchestration tool."
author: "Joel Lord"
formattedDate: "December 13, 2021"
keywords: ["mongodb", "container", "orchestration"]
banner: "machine"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/basics/container-orchestration"
---
In today's world, applications need to be deployed frequently and promptly to be competitive. Microservices architecture has emerged to help businesses break down their monolith applications into smaller pieces, reducing the risk of breaking critical parts with each quick deployment cycle. Those microservices are typically deployed using containers, and with more and more containers deployed comes the need to have a container orchestration tool. The role of the orchestrator is to ensure that all containers are running and can communicate with each other if needed.

In this article, you will learn about containers and how to use container orchestration tools to manage them.

What are containers?
--------------------

A container is a package that contains everything necessary to run an application. Imagine a ZIP file that would include your application's source code, along with everything needed to run this application. This package would also contain any necessary configuration files or additional software required to run your software. This package is what you would then deploy to your servers.

For example, take an application written in PHP. Instead of dropping your files on an FTP server and hoping that your server has the correct version and modules, you would package everything in a container. This container would have the PHP files, along with a specific version of the `php` executable. It could also contain a fully configured Apache `httpd` server, ready to be used with this particular PHP runtime.

Because all the runtimes necessary for the application are included in the container, software developers can ensure that an application runs precisely the same in the production environment as it does in the development environment.

Another significant benefit of containers is that they run in complete isolation from each other. This isolation means that a container running on a host has no knowledge of the underlying operating system or other containers. Essentially, whatever happens in the container stays in the container.

One last thing to keep in mind with containers is that they are ephemeral in nature. This means that when a container is restarted, it will always be the same. Any changes that were done while it was running are lost when the container stops. This is a great feature that ensures that if something corrupts the container, it can always be restarted and have the expected behaviour.

What is container orchestration?
--------------------------------

As you have more and more microservices running in your servers, you will need a way to manage those containers throughout their lifecycle. There are many things that you might want to manage on those containers.

-   Deployment: Specify how many containers you want running at any given time.
-   Management: Some containers might need additional configuration, which will have to be individually managed.
-   Resource allocation: Some containers might have access to only limited resources from the server to help flatten an otherwise spiky workload.
-   Scaling: As more traffic is expected, you might want to scale up your application. You can also scale down once this traffic bump is done.
-   Networking: Containers will need to communicate with each other internally or be exposed externally. Load balancing across duplicate containers is also often required.
-   Scheduling: Some containers might run on a specific schedule, like a cron job.
-   Monitoring: Monitoring needs to be done on each container to verify that containers are running and are healthy.

Container orchestration is the automation of all the processes needed to run, manage, and monitor a collection of containers.

Why do we need container orchestration?
---------------------------------------

When you have a limited number of containers, it is possible to perform those management tasks manually or with simple scripting. However, as the number of containers increases, it becomes harder and harder to do so. This is where container orchestration tools will come into play.

You can use other tools such as Kafka to let the containers communicate with each other. You can find out more about using Docker, Kubernetes, and Kafka with MongoDB in this [blog post](https://www.mongodb.com/presentations/mongodb-and-microservices-part-1-powering-microservices-with-docker-kubernetes-kafka-and-mongodb).

Container orchestration enables system administrators and DevOps engineers to maintain large server farms with thousands of containers. Without container orchestration, everything would need to be done manually and would quickly become unmanageable.

What are the benefits of container orchestration?
-------------------------------------------------

There are many benefits to using containers with container orchestration tooling.

-   DevOps and Continuous Delivery. When the application consists of multiple containers with clear interfaces between them, it is a low-risk and straightforward matter to update a container, assess the impact, and revert to the old version or roll the update out across similar containers. By having multiple containers provide the same capability, upgrading each container can be done without negatively affecting service.
-   Scalability. By architecting an application built from multiple container instances, adding more containers scales out capacity and throughput. Similarly, containers can be removed when demand falls. Using orchestration frameworks further simplifies elastic scaling.
-   Isolation. Every container running on the same host is independent and isolated from the others and the host itself. The same equipment can simultaneously host development, support, test, and production versions of your application---even running different versions of tools, languages, databases, and libraries without any risk that one environment will impact another.
-   High Availability. By running multiple containers, redundancy can be built into the application. If one container fails, then the surviving peers continue to provide service. With some automation, failed containers can be automatically recreated, restoring full capacity and redundancy.

How does container orchestration work?
--------------------------------------

Most modern container orchestration tools use configuration files, typically written in YAML, to describe the configuration for the containers. This configuration would include the name and location of the containers, the numbers of containers needed, the necessary network configurations, and so on.

Once this configuration file is applied to the orchestration tool, the tool will automatically manage the container based on the given specifications in the file.

The orchestrator will also monitor the health of the containers and restart them if needed, ensuring high availability and minimal downtime for your containers.

Introduction to container orchestration tools
---------------------------------------------

There are many orchestration tools available for containers; some of the most common are described here.

-   [Docker Compose](https://docs.docker.com/compose/): Takes a file defining a multi-container application (including dependencies) and deploys the described application by creating the required containers. It is mainly aimed at development, testing, and staging environments.
-   [Docker Swarm](https://docs.docker.com/get-started/swarm-deploy/): Produces a single, virtual Docker host by clustering multiple Docker hosts together. It presents the same Docker API, allowing it to integrate with any tool that works with a single Docker host.
-   [Kubernetes](https://kubernetes.io/): Created by Google and one of the most feature-rich and widely used orchestration frameworks; its key features include:
    -   Automated deployment and replication of containers.
    -   Online scale-in or scale-out of container clusters.
    -   Load balancing over groups of containers.
    -   Rolling upgrades of application containers.
    -   Resilience, with the automated rescheduling of failed containers.
    -   Controlled exposure of network ports to systems outside of the cluster.
-   [Apache Mesos](http://mesos.apache.org/): Designed to scale to tens of thousands of physical machines. Mesos is in production with some large enterprises such as Twitter, Airbnb, and Netflix. An application running on top of Mesos comprises one or more containers and is referred to as a framework. Mesos offers resources to each framework, and each framework must then decide which to accept. Mesos is less feature-rich than Kubernetes and may involve extra integration work.

Container orchestration with Kubernetes
---------------------------------------

Kubernetes has gained much traction throughout the last few years and is now the most popular container orchestration tool available. Kubernetes is designed to work in multiple environments, including bare metal, on-premises VMs, and public clouds. These are the key components making up Kubernetes:

-   A cluster is a collection of one or more bare-metal servers or virtual machines (referred to as nodes) providing the resources used by Kubernetes to run one or more applications.
-   Pods are groups of containers and volumes co-located on the same host. Containers in the same pod share the same network namespace and can communicate with each other using localhost. Pods are considered to be temporary rather than durable entities and are the basic scheduling unit.
-   Deployments are a description of the state of pods. The Deployment Controller is then taking care of performing the changes and ensuring that the described state is always maintained.
-   Services act as basic load balancers and ambassadors for other containers, exposing them internally or to the outside world using an Ingress.
-   Labels are tags assigned to entities such as containers that allow them to be managed as a group.

While MongoDB works very well with [Kubernetes](https://www.mongodb.com/kubernetes), setting up everything can be a lot of work. Thankfully, the [Atlas Kubernetes Operator](https://www.mongodb.com/kubernetes/atlas-operator) exists to make it much easier to add your Atlas instances to your Kubernetes environment.

Enabling container orchestration with microservices
---------------------------------------------------

Want to try out MongoDB on your laptop? [Execute a single command](https://www.mongodb.com/compatibility/docker), and you have a lightweight, self-contained sandbox; another command removes all traces when you're done. Need an identical copy of your application stack in multiple environments? Build your container image, and then your entire development, test, operations, and support teams can launch an identical clone environment.

Orchestration tools manage how multiple containers are created, upgraded, and made highly available. Orchestration also controls how containers are connected to build sophisticated applications from numerous microservice containers.

The rich functionality, simple tools, and powerful APIs make container and orchestration functionality a favorite for DevOps teams, integrating them into Continuous Integration (CI) and Continuous Delivery (CD) workflows.

Enterprise container orchestration considerations for MongoDB Atlas
-------------------------------------------------------------------

Running MongoDB with containers and orchestration introduces some additional considerations:

-   MongoDB database nodes are stateful. If a container fails and is rescheduled, the data shouldn't be lost. To solve this, features such as the volume abstraction in Kubernetes can map what would otherwise be an ephemeral MongoDB data directory in the container to a persistent location where the data survives container failure and rescheduling.
-   MongoDB database nodes within a replica set must communicate with each other---including after rescheduling. All nodes within a replica set must know their peers' addresses, but when a container is rescheduled, it will likely be restarted with a different IP address. For example, all containers within a Kubernetes pod share a single IP address, which changes when the pod is rescheduled. With Kubernetes, this can be handled by associating a Kubernetes service with each MongoDB node, which uses the Kubernetes DNS service to provide a hostname for the service that remains constant through rescheduling.
-   Once each MongoDB node is running (each within its container), the replica set must be initialized, and each node added. This is likely to require some additional logic beyond that offered by off-the-shelf orchestration tools. Specifically, one MongoDB node within the intended replica set must execute the `rs.initiate` and `rs.add` commands.
-   Suppose the orchestration framework provides automated rescheduling of containers (as Kubernetes does, for instance). In that case, this can increase MongoDB's resiliency as a failed replica set member can be automatically recreated, restoring full redundancy levels without human intervention.

It should be noted that while the orchestration framework might monitor the state of the containers, it is unlikely to monitor the applications running within the containers or backup their data. That means it's essential to use a robust monitoring and backup solution such as [MongoDB Cloud Manager](https://www.mongodb.com/cloud), included with [MongoDB Enterprise Advanced](https://www.mongodb.com/products/mongodb-enterprise-advanced). You can also use [Kubernetes with Ops Manager](https://www.mongodb.com/blog/post/introducing-mongodb-ops-manager-in-kubernetes) in your infrastructure.

![A diagram representing how MongoDB can be deployed in a Kubernetes cluster with specific operators for each cloud.](https://webimages.mongodb.com/_com_assets/cms/kx4te2j3l0t6v51cf-image1.png?auto=format%252Ccompress)

MongoDB container orchestration case studies
--------------------------------------------

[fuboTV](https://www.fubo.tv/welcome) provides a soccer streaming service in North America, and they run their full stack (including MongoDB) on Docker and Kubernetes; find out the benefits they see from this and how it's achieved in this [case study](https://www.mongodb.com/blog/post/leaf-in-the-wild-leading-soccer-streaming-service-fubotv-scales-its-business-with-mongodb-docker-containers-and-kubernetes).

Square Enix is one of the world's leading providers of gaming experiences, publishing such iconic titles as Tomb Raider and Final Fantasy. They have produced an internal multi-tenant Database-as-a-Service using MongoDB and Docker---find out more in this [case study](https://www.mongodb.com/blog/post/leaf-in-the-wild-leading-soccer-streaming-service-fubotv-scales-its-business-with-mongodb-docker-containers-and-kubernetes).