---
title: "Site Update: Total Overhaul"
author: njm
date: 2022-11-06 14:30:00 -0500
categories: [Site Updates]
tags: [site updates]
---

Some of you may have noticed that the site looks a bit different than when it originally launched. I've spent the last couple of weeks completely overhauling the site from the ground up. While it may look different, the goals and content of I Loot the Body have remained the same. The update has just added some bells and whistles that will make my life easier and will hopefully make your experience as the user much better. For those (like me) who always enjoy a little peek under the hood, read on for the nitty gritty details.

## First Steps

As I've mentioned in [previous posts](https://www.ilootthebody.com/posts/welcome/), I Loot the Body is basically my first attempt at making a website. I dove into web development head first and created just about everything for this site from scratch. While I learned a lot during this process, it soon became clear that the route I was taking would soon become unsustainable if I wanted this site to be anything more than a single page web application.

![Version 1 of I Loot the Body](/assets/img/iltb_v1.PNG)
*Version 1 of I Loot the Body*

Pictured above is what the first iteration of this site looked like. The front end of the site consisted of HTML, CSS, and JavaScript thrown together in the most basic ways to achieve the functionality I needed. Amazon Web Services (AWS) was used on the back end for hosting as well as the logic and database for the magic item generator. At a high level, clicking the "Loot the Body" button on the generator would send a request to AWS. AWS would run some code to pull a random item from the database then sent the result back to the web browser to be displayed to the user.

I am quite proud that I was able to produce a somewhat clean looking site that actually worked. However, several limitations to my "from scratch" approach soon began to crop up. First, scalability and maintenance was becoming an issue. As I added more pages (new generators, blog posts, etc.), any time a change needed to be made to the layout of the site I would need to make that change to each individual page. For a 1-3 page website that wasn't so bad but as the site grew so too would the level of effort to make even basic changes.

Second, I am not a professional web developer and I don't plan on becoming a professional web developer. One of my main goals with this project was to learn more about programming and web development but I had no idea just how much effort building a robust, modern website from scratch would be. Even relatively simple features were simply taking me too much time to implement. This project is purely a labor of love at this point and as such it competes for my time and energy against my family, my day job, and my other hobbies. I was dedicating more time to simply making the website than I was to creating tools and content to actually fill it with. Something had to change.

## The Overhaul

I spent some time researching different website generators and frameworks and eventual settled on one that addressed the problems I was having: jekyll. [Jekyll](https://jekyllrb.com/) is a static site generator that takes the content your write, applies a theme/template to it, and creates a static website with most of the modern features we've come to expect. Right out of the box I was able to recreate I Loot the Body with 90% of the site up and running in a state that would have likely taken me over a year to get to on my own. I was then able to implement the last 10% of the functionality I needed by building upon the base that it provided. For me, it's the right balance of ease of use while also giving me the flexibility I need to adapt it to my needs.

Just about everything that you as the user see on this website was automatically generated by jekyll, specifically a theme called [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy). Not much actually changed on the back end. The website is still hosted on AWS along with all of the code and databases that make the generator function. With the technical side of this project much more streamlined I am now able to focus my energy on the really fun stuff - creating more D&D/TTRPG tools and content!