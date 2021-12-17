---
path: "/blog/post/2021-10-27_virtual_machines"
date: "2021-10-27"
title: "What Is a Virtual Machine (VM)?"
summary: "A virtual machine is an application that emulates a whole computer and runs inside your physical computer. It works as a separate independent machine, but it runs as a process on your host operating system. It’s a convenient way to dedicate a portion of your computer resources to a specific task or software."
abstract: "A virtual machine is an application that emulates a whole computer and runs inside your physical computer. It works as a separate independent machine, but it runs as a process on your host operating system. It’s a convenient way to dedicate a portion of your computer resources to a specific task or software."
author: "Joel Lord"
formattedDate: "October 27, 2021"
keywords: ["mongodb", "virtual machines", "cloud"]
banner: "machine"
originalSource: "MongoDB.com Website"
originalUrl: "https://www.mongodb.com/cloud-explained/virtual-machines"
---
What Is a Virtual Machine (VM)?
===============================

[Try Atlas Free](https://www.mongodb.com/cloud/atlas/register)

A virtual machine is an application that emulates a whole computer and runs inside your physical computer. It works as a separate independent machine, but it runs as a process on your host operating system. It's a convenient way to dedicate a portion of your computer resources to a specific task or software.

Virtual machines are used to dedicate a portion of a host's resources to a specific task. This machine will run in an isolated environment without any risks of conflicting with the host. If the guest virtual machine crashes, it can be rebooted or recovered without impacting the host.

This article will cover what virtual machines are, and when they should be used, in greater detail.

How does a virtual machine work?
--------------------------------

A virtual machine is a complete operating system and any installed applications running as a process in a physical computer. A hypervisor is used to dedicate a portion of the physical hardware to the virtual machine, allowing this guest machine to run like any other application on the host computer.

![Image showing that a host's physical resources (CPU, RAM and Storage) are shared across three VMs through a hypervisor.](https://webimages.mongodb.com/_com_assets/cms/kv9x1k4chb4pmf4ys-image2.png?auto=format%252Ccompress)

*Physical machines use a hypervisor to virtualize hardware available to virtual machines.*

The virtual machine itself runs as if it was running on its own independent hardware, and is not aware that it is running on virtualized hardware.

What are virtual machines used for?
-----------------------------------

There are many reasons to use virtual machines. On a personal computer, you can use a virtual machine to run software that requires a different operating system than the one running on the host computer. This way, a user running a laptop with a Linux OS would be able to run games built for the Windows OS.

For businesses, you can use virtual machines to perform operations that would otherwise be dangerous or risky. For example, a system administrator could try running a virtual machine with a new version of Linux to validate that the web servers used by the enterprise can run without any bugs that would cause service interruptions.

Virtual machines are prevalent in the cloud computing industry. These VMs allow system administrators to take large servers and separate them into smaller entities that cloud providers can then rent out. This has the advantage of isolating any content running in the virtual machine from the physical server. As an example, MongoDB runs tens of thousands of VMs across AWS, Azure, and Google to offer [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), a database-as-a-service that comes with built-in automation and operational best practices so developers don't have to worry about managing VMs themselves.

The different types of virtual machines
---------------------------------------

Virtual machines are generally classified into two different types: system virtual machines and process virtual machines.

### System virtual machines

When people use the term "virtual machines," they're generally referring to system virtual machines, also called full virtualization VMs. A system VM is an entire operating system that runs on virtual hardware inside a host computer. You must use a hypervisor, a software that creates and runs VMs, to allocate resources to the system virtual machines.

### Process virtual machines

A process VM, or application VM, is an abstraction layer that enables code written in a specific programming language to run on any operating system. Popular examples include the [Java Virtual Machine](https://en.wikipedia.org/wiki/Java_virtual_machine) and the .NET framework, which use the [Common Language Runtime](https://en.wikipedia.org/wiki/Common_Language_Runtime).

What is virtualization?
-----------------------

Virtualization is the process of taking one or more components of a computer, such as CPUs, RAM, and storage, and tricking a piece of software into thinking those components are their physical counterparts. When discussing virtual machines, we usually refer to an entire computer being virtualized, but many components can be individually virtualized.

The different types of virtualization
-------------------------------------

Virtualization can take multiple forms but falls under five main types.

-   Software. All the computer resources such as CPU and RAM can be virtualized using a software called a hypervisor. This allows a powerful server to run multiple virtual machines, all acting like their own smaller computers.
-   Hardware. Some hardware components have built-in capabilities to provide virtualization and workload isolation directly at the hardware level. Examples of these are the AMD-V and Intel-VT on-chip features.
-   Storage. Disk space can be split up into smaller pieces dedicated to a virtual machine. In the same vein, a server can also combine virtual storage spaces to create much larger virtual disks.
-   Network. Virtual sub-networks can be created in a software network. These networks can be used to route traffic across different resources in an extensive infrastructure.
-   Desktop. Some operating systems decouple the desktop environment and the physical hardware. By doing so, many lightweight desktops can run on a shared physical machine.

When you would use a virtual machine
------------------------------------

Virtual machines can be used whenever you need a different operating system to run an application. A mobile app developer, for example, might want to test out their application, but their computer may be running a Windows operating system. To test out the mobile app, the developer can use a virtual machine running Android OS.

Another everyday use case for virtual machines is to run software in an isolated environment. A duplicate of the production environment can be created to test out a new version of a software application in development. A QA team can then perform tests without conflicting with the actual production environment.

The pros and cons of virtual machines
-------------------------------------

Using virtual machines can provide some advantages over a physical computer. It generally does a better job at managing resources, lowering the overall costs. On the other hand, it also comes at a cost in performance.

### Advantages of virtual machines

Virtual machines are great for splitting physical resources to be used by smaller virtual computers. Instead of having computers with largely unutilized resources, it is possible to distribute the CPU and RAM across multiple virtual computers. When done properly, this can significantly reduce the cost of infrastructure.

Virtual machines can also be part of server provision programs. Because virtual machines are stored on a hard drive, it is easy to copy them to recreate identical environments over and over.

Finally, the isolation provided by the virtualization can let system administrators run riskier operations in a virtual environment that can easily be thrown away.

### Disadvantages of virtual machines

The main disadvantage of running virtual machines is the performance cost. A VM is slower than a physical machine because it needs to run a host operating system and a hypervisor in the background. This performance hit is especially true when compared to [containers](https://www.mongodb.com/compatibility/docker).

Is a virtual machine easy to set up?
------------------------------------

All major cloud providers offer virtual machines that you can use for personal or business use cases. If you are looking for a virtual machine to run a MongoDB database, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) abstracts the process of creating a dedicated cluster on virtual machines so that developers don't have to manage them.

If you would instead prefer to run a virtual machine on your personal computer, many software applications, such as [VirtualBox](https://www.virtualbox.org/), can help you set up and run virtual machines.

Summary
-------

Virtual machines can be a convenient way to manage large clusters of computers, but they also come at a certain performance cost. This is why most enterprises managing large infrastructures will use a mix of physical and virtual machines based on their use cases. If you don't want to manage your own virtual machines, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) makes it easier for you to create, run, and manage your cloud-based databases.