---
title: 'Zombie game'
tagline: 'Trying out pixi.js'
updatedAt: '2024-06-17T15:15+03:00'
tags: ['webdev', 'pet-project']
---

So I got baited to make a zombie game with Pixi.js

[Link to game](/zombie-game)

TLDR: For simpler games, it's a wrapper around canvas that requires jumping
through additional hoops.

Tried out [pixi.js](https://pixijs.com) because a friend of mine piqued my
interest. However, after a short exploration period it seems like the latest in
a long line of HTML canvas element wrappers that add their own inch of
functionality and require learning a whole new set of tools to accomplish the
same features.

On a related note, I'm growing annoyed by how every technology nowadays comes
with an interactive tutorial for learning to use it. For cases like Svelte I
understand the necessity. An interactive tutorial can help a lot in
understanding a new paradigm, especially if a cursory glance makes it seem like
something familiar. By this description, pixi.js ought to have one, but the
differences between it and canvas are not of fundamental differences in the
model of thought, just of extensibility. Pixi won't ask you reconsider how the
nature of rendering works, it simply wants you to learn the boilerplate
specific to it. For these cases a simpler side by side comparison ought to do
the trick, but that's not nearly as sexy as an interactive tutorial with a live
preview. For the sake of completeness and honesty, I feel it necessary to note
the few bugs I found in the tutorials. There are cases where the instructions
leave out something the sample solution doesn't and a few unused variables the
sample solution throws in for good measure, but I feel this is easily fixable
and not a fault in the idea but the execution.

The idea for the game was to drive around in a car and interact with a
liquid-like horde of zombies. In my 2h I got the car movement working and felt
like I had enough material to form an initial opinion. I would like to
emphasize that I only spent about 2h with pixi.js, of which a significant
portion wasn't for pixi. Don't mistake my opinion for gospel. I'm sure it has
merits beyond what I found. Some of the frustrations stem from trying to insert
pixi.js into my svelte blog, but I find it also fails on its own.

For getting the car drawn, I created a pixi application, loaded an image I
whipped up in Gimp, and used keyboard input to steer the car. It has a simple
acceleration / drag physics model with pseudo tank controls. This took about 10
lines of svelte and 140 lines of TS to get going, which may be more than you'd
think for such a simple product. The reason for this is that pixi.js doesn't
provide any tooling for handling keyboard input, so I had to rely on the
browser key down / up handlers, which work just fine, but do require their fair
share of boilerplate. In a way this is understandable, as pixi doesn't aim to
be a game engine, as much as it seems to aim for a rendering solution, bringing
WebGL to the unwashed masses. In the end about third of the TS code is just for
getting the four input buttons to read in a nice way.

In the end, at this simple of a step, Pixi seemed more like a hindrance than
an aid. It's not difficult to draw a PNG, move it, and rotate it on a canvas,
so fair enough not the use case they are going for, but with a few slight
exceptions, this is pretty much all that is going on in their examples /
tutorials. In addition to these they seem to be focusing on replicating things
the web does pretty well as it is, such as rendering text and clicking on
elements.

In the [fish example](https://pixijs.com/8.x/tutorials/fish-pond#6) it seems
like the democratization of WebGL is in full swing, as that example
demonstrates a simple displacement effect that makes the fishes look like they
are being distorted by water. It however comes with the same problems as most
of these mechanisms. It doesn't actually teach how the underlying system works,
just provides a shorthand for it. There is no way for the fresh-faced
programmer to take what they have learned with the displacement map here and
apply it to for example give an object an outline or generate a height map with
the provided noise texture. It provides the learner with fish, instead of
teaching them to fish if you pardon the pun.

In the age of Wasm, I fail to see JavaScript based systems like pixi thriving.
Obviously there are always those who learned JS at 14 and never wavered from
that, so there will always be a market, but I don't see the long term
trajectory for games. For overpaid designers and web developers who want to add
increasingly invasive UI elements to their cooking blogs I foresee pixi having
a bright future, but even there it'll likely get lapped by even more obnoxious
3d options like Three.js. In game development I feel it'll go the way of
meteor.js, with maybe one or two half-notable products before falling to the
limbo of ember.js, never to completely die but slowly fading to obscurity. JS
just isn't a good option for game development. It's not fast like a compiled
language nor does it offer particularly good mechanics for handling concepts
such as vectors. The only thing going for it is being the lingua franca of the
web, so when that rug is pulled, no reason remains. I do acknowledge that Wasm
is still a long way from being there. Here is to hoping it will get here before
nuclear fission.

Maybe this project will continue, maybe even in this form, but for now I'm
satisfied in my experiment and not craving more of this..
