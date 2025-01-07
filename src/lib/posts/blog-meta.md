---
title: 'I made a blog with svelte'
tagline: 'In magic we trust'
createdAt: '2024-01-08T13:23+02:00'
tags: ['webdev', 'pet-project']
---

First things first, you can find the source code at
[GitHub](https://github.com/haihala/haihala.github.io)

At my job, I'm full stack / devops-y engineer which occasionally involves a
lot of React. All cards on the table, I don't think there is a reason to use
React as of today (2024-01-08). It's difficult to onboard, simultaneously in
flux and behind the curve, hard to reason about (useEffect) and the insistence
on being a library has made for one of the worst ecosystems ever if you consider
the user count. I've been trying to find a tool that better suits my purposes
and interests, and this time I picked Svelte.

## How the sausage gets made.

I used some of [Josh collins' wisdom](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog)
and used a system where markdown files with front matter get parsed and rendered with
[MsveX](https://github.com/pngwn/MDsveX). The whole site is then compiled into
static files and served from [GitHub pages](https://pages.github.com/).
You can take a look at the source if you'd like to know more.

I also considered something like [HTMX](https://htmx.org/) + [Loco](https://loco.rs/),
but the static hosting of GitHub pages was too tempting.

I really like how the page loading turned out. The front matter contains things
like if a post is a favorite (shown on the front page) or what tags it has
(what posts get recommended at the bottom)

## About Svelte

Svelte is yet another front-end JS framework, but along with solid and quik are
of a generation that comes after React has stumbled itself through several
rounds of rethinking of how a UI ought to work. I'll try to keep this brief:

### What I Liked

- The [tutorial](https://learn.svelte.dev), it's short, clear, and illustrative
  - Occasionally even funny
- How it eliminates lots of boilerplate
- It comes with **all** the batteries
- The reactivity model (This blog is largely static but I could introduce some reactivity if I wanted to)

### What I disliked

- How much of a struggle it was to get the static adapter to pick up on the blog posts
  - The end result is pretty simple, but the path there was not
- Typescript
  - It seems to only sometimes work with my LSP (svelteserver)
  - Using TS requires some boilerplate
  - I couldn't get it to pick up common types

### What I'm unsure as of yet

- Some of the magic syntax
  - Keywords like `let` and `export` take on additional meanings
  - A `<script>` or a `<style>` tag in a `.svelte` file is not really that
- Svelte 5
  - When starting a project it prompts if I want to use it
  - I'm not sure if I'll have to migrate, when and will that be a pain

## Learning a new framework

Overall it took me about 10 hours of work to get the site up including doing the
first two parts of the Svelte tutorial. It was at times frustrating but I feel
equipped to produce alright code with Svelte now, even with tools like the inbuilt
tweening tools or SSR.

I was going to put a long rant about how the software development industry is
stupid for refusing to adapt and why everything being built with stable tools
is the death of the industry and the expert but it came across as gloating and
whining so I'll maybe do that on a separate post, likely not at all.
