---
title: 'RSS feed in static svelte on Github pages'
tagline: 'And you can do it too'
updatedAt: '2024-12-25T16:29+02:00'
tags: ['webdev', 'pet-project']
---

# The short version

You can find the source code [here](https://github.com/haihala/haihala.github.io/blob/main/src/routes/rss.xml/%2Bserver.ts), but in short:

- Add a folder called `rss.xml` (.xml is relevant) under `routes`
- Add a file called `+server.ts`, (.js probably also works) in the newly created folder
- Export `prerender = true` and a `GET` function from `+server.ts`
- Make the `GET` function return a response object with xml as the body
  - I'm pretty sure the headers don't matter after build

# How I did it

I cheated off of [Scott
Spence](https://scottspence.com/posts/make-an-rss-feed-with-sveltekit)'s post,
hallowed be his name. Got it to work locally pretty quickly, but it didnt work
in pages, as Github served it as an octet stream because had the feed at `/rss`.
I tried changing it to `/rss.xml` to see if github would guess the
`Content-Type` correctly and it did.

A short one today, this was surprisingly easy at the end of the day.
