---
path: "/blog/post/2015-11-24-wp_moves_to_js"
date: "2015-11-24"
title: "WordPress moves to Javascript"
summary: "Javascript everything !"
abstract: "WordPress is migrating to a Javascript interface, so what?."
author: "Joel Lord"
formattedDate: "November 24th, 2015"
banner: "shelf"
keywords: ["wordpress", "javascript", "react"]
---
Javascript applications are now one step closer to dominate the Web \!
WordPress released their new version today and it's built with
Javascript. With [about 25% of the web sites in the
world](http://w3techs.com/technologies/history_overview/content_management/all/y)
built with this CMS, this is a huge step for Javascript applications.
But what does this really means? Let's take a quick look at the guts of
this new WordPress version named Calypso.

## The Front End

The Automattic team (the company behind WordPress) has chosen React and
Flux for their main front end library. This is interesting because it
will place React as one of the most used frameworks out there. With
Facebook still backing this framework, we will see more and more of it
(although it was pretty much already the flavor of the month.

## The Fun Parts

As I went through the [WordPress Calypso
Github](https://github.com/Automattic/wp-calypso) repository (yup, it's
open source), what I found to be the most interesting part is their
whole build process. They are now using a full Node process to manage
all their packages. Webpack, Babel, Jade and Uglify and just some of the
100+ packages that they are using.

## Will I use WP from now on ?

Well, probably not right now. This is for their admin interface. It
seems very interesting and it might make it easier to create an
interface that is easy to use for the WP administrators. Thing is, I
kinda like this interface that I built myself for this site :).
