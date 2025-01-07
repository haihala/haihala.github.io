---
title: 'Squeli'
tagline: 'Wonky quake, in 2d!'
createdAt: '2025-01-07T10:01+02:00'
tags: ['pet-project']
---

<script>
	import Carousel from '$lib/components/Carousel.svelte';
</script>

A [game on Itch.io](https://hajhawa.itch.io/squeli) with [source available on
Github](https://github.com/haihala/SGH-winter-jam-2025) made for [SGH winter jam
2025](https://itch.io/jam/sgh-talvijami-2025)

## How it ended up

<Carousel elems={[
{src: "/blog-assets/squeli-crop-combat.png", alt: "Action picture"},
{src: "/blog-assets/squeli-action.png", alt: "Full screen action screenshot"},
{src: "/blog-assets/squeli-scores.png", alt: "Post-game scoreboard"},
]}/>

The theme of the jam was to pick an existing Finnish game and spin something off
of that. I went with [Speli](https://suomigamehub.com/pelit/speli/), a
text-rendered 1v1 pvp 2d game with weapon based combat. Pretty quickly I
realized that Speli is not that far off from being an arena shooter like Quake,
so the game pivoted by getting rid of the grid. The game quickly turned into a
one-stick shooter where you control movement with a joystick and the character
gradually rotates the way it's moving. This is the main source of the jank. I
liked the feeling of every combat being a struggle mechanically. It is pretty
easy to evade most attacks if you are paying attention. The end result is wonky
2d quake with an economy system or a top down [Duck
game](https://store.steampowered.com/app/312530/Duck_Game/).

There were other deliberate differences. I went with a white on black color
scheme instead of the black on white because it was more visually clear and the
terminal color scheme doesn't make sense when the graphics aren't ascii
characters. As far as I can tell based on [the video demo of
Speli](https://www.youtube.com/watch?v=9z_SigkGVIA), the game doesn't have
projectiles, which were a natural addition once the grid based movement was out.
I also added a timer to pace the game. This lead to a potential problem, where
you could get an early kill and then run away for the rest of time. I tried to
tackle this in two ways. I put a lot of the goodies in the middle of the map, if
you give control of that area to your opponent they will be able to stock up.
One of the items you can get from there is a landmine, so if you give your
opponent a lot of time, they can start filling the map with landmines, which can
block you in. I also made you run 20% faster when holding the melee weapon,
since you obviously run faster with a knife :D.

As my inspiration is old, I wanted to make my game a bit retro. In hindsight,
most of these decisions come across as incompetence rather than deliberate
decisions. For example, instead of recording any audio, I built a quick
synthesizer with python that could generate notes and chords using sine waves. I
then used these as the sound effects for everything in the game. Some sounds
like clicks and clacks are hard to generate this way, so the soundscape ended up
a bit dull. Instead of drawing sprites, for the first 70% of the jam I was
convinced I would do everything with simple geometric shapes. This is why the
player characters are triangles and the projectiles are round. This made
conveying more complicated concepts like money difficult.

The game is built with Godot, which was armed with uncharacteristically many
sharp corners this time around. The biggest one was a case when I created a
cycle of dependencies between some scenes (transitions between views). Godot
refused to open any of the scenes. The only solution I found for this was to
manually edit the scene files in a text editor to no longer contain references
to each other. I then load the scenes based on path strings. The reason I wanted
to use the inspector based reference mechanism was to ensure that all of the
paths are correct. If you move or rename a resource file, Godot automatically
updates the places that refer to that file in the inspector. You can also see a
list of references for each asset that is referenced this way. If you refer to a
scene with a path in code, Godot can't see the reference. I tested the game to
ensure the paths work, but if someone refactors and renames the tutorial scene,
they would not know the game is broken before trying to enter the tutorial from
the main menu.

Overall I don't think this was my best work, but I did get it done and refreshed
my Godot expertise while at it. Did complete the jam, which was something.
Learned about sound synthetization.
