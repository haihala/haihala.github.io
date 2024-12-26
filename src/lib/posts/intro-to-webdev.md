---
title: 'So you want to learn the web'
tagline: 'Start here'
updatedAt: '2024-01-08T14:05+02:00'
tags: ['webdev', 'teaching']
---

# So you want to learn web dev

This is meant as a resource for people with some software development basics like
loops and variables down, but little to no understanding of how the web works.
Also this is a resource I can share with people when they ask me about web dev.

## Lay of the land.

At first we must understand what we're dealing with at a high level. Like a
[fractal](https://en.wikipedia.org/wiki/Fractal), the details just keep on coming
but if we can anchor ourselves to a vague idea of what is where, we can start to
fill in the gaps as is necessary. I also encourage you not to learn for the sake
of learning, but learn so you can do something cool.
[Tutorial hell](https://www.reddit.com/r/learnprogramming/comments/qrlx5m/what_exactly_is_tutorial_hell/)
is a silly place, let's not go there.

I find that best way to learn is to participate, and an easy way to participate
is to ask questions. I've made a list of questions, organized in a way where you will
build understanding of the topic as you answer them.

1. What is the difference between front end and back end?
2. What do these words (and their letters) mean? Try to explain them to an imaginary child:
   - HTML
   - HTTP
   - CSS
   - JS
   - DOM
   - API
   - JSON
   - REST
   - DNS
   - URL
3. What does the browser do when you a type 'google.com' in the address field and press enter?
   - Figure out all of the steps.
   - How they relate to the list in the previous step?

## Build something with HTML/CSS/JS

For a while, all websites were built by writing HTML/CSS/JS and you can still do that.
In a lot of cases you _should_ do that. The hardest part about a site like this is
probably making it interactive, so I would probably either use a canvas element
and draw entirely in JavaScript, or pick a project so that it has limited interaction.

Here are a few starter examples:

- Recipe site
- Simple calculator
- To-do list
- Clone of some existing website like https://wordcounter.net/ or https://www.nytimes.com/games/wordle

Limit the scope so that you can get it done within a day or two at most.

## Build a full stack app

For certain things, one needs a front end and a back end. For others it's nice to
be able to easily change the user interface a lot. Both of these are somewhat answered
by Next.js and React.

I'm not the biggest fan of either of those, but I'm not a fan of English either. Oddly
enough, the reasons are quite similar, though through tough thought they can get gotten.
The reason I'm recommending it is that it's more or less the [lingua franca](https://en.wikipedia.org/wiki/Lingua_franca)
of front end web development.

At this point, you should familiarize yourself with the following concepts:

- Architecture (in context of an application)
- Databases
- REST APIs

Ideas for an example project:

- Phone book that saves contact details in a database
- A simple store that keeps count of items in stock
- Redo the one you did in the previous phase using new tools. Maybe even add a feature or two.

Just remember, the primary goal is to learn, which requires trying which comes with failing.
Don't get discouraged if you can't do it. Try to learn as you go and don't be afraid to go
back to the drawing board if an earlier decision makes life hard, code is cheap and your
frustration is the most likely cause to cause you to quit.

## Further reading

After that you can do web apps. Congrats!

Here are some things you could look into:

- Docker
- Running the site somewhere so that it can be used by others.
- ORMs
- Other web frameworks, both front end and back end
