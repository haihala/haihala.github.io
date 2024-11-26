---
title: 'WAG first external playtest'
tagline: 'Local fgc to the rescue'
updatedAt: '2024-11-22T19:31+02:00'
tags: ['wag']
favourite: true
---

# WAG playtest 1

Work in progress, video link will be here.

[Link to the Github release](https://github.com/haihala/whoops-all-grapplers/releases/tag/pp-playtest),
from which you can find the commit link

[Previous post](/blog/WAG-pre-polish-update) was made after
[this commit](https://github.com/haihala/whoops-all-grapplers/commit/3e9ae4fe82d8ff7ad7869e9cb79609d735aadec2)
I think I'll use tags from now on, hunting that down was unpleasant. This is
roughly a period of three months, during which I was relatively active.
There were lots of smaller things, but some highlights include:

Big external ones

- Menus
- Online play
- Presentation improvements

Big internal ones

- Rewrite move descriptions twice
- Rewrite input parser (for the last time I hope)
- Move to an observer based event propagation system

I really cannot overstate how many bugs were squashed in the making of this
version. This period is about 50% fixes by commit volume. In addition to the
fixes, there were lots of little updates. Removal of a few uninteresting items
and addition of a handful of new ones. I've really gotten to a point where I can
bang out a new item in half an hour or so, 25 mins of which are making the icon.
There were also a few small improvements to the dev tooling, such as
configurable starting wealth and more/better binds.

Big thanks to the local fgc grinders who volunteered to test the game and
despite numerous game-breaking bugs didn't complain.

## Menus

It may be a bit silly starting with the menus, as to an outside observer, they
are insignificant. Despite their measly nature, they make the game _feel_ a lot
more like a game than a toy to me. Booting up to a main menu seems oddly normal
compared to the years of going directly to a match. I did add a script to start
directly to a match to keep the dev cycle short, but the effect of a simple main
menu is hard to describe.

The main menu structure is roughly the following:

- Main menu
  - Local play
    - Controller selection
      - Two player character select
        - Match
  - Online play
    - One player character select
      - Lobby
        - Match
  - Quit the game

I managed to get a few clever bits. Any controller can control the menus, which
is sadly not the norm in fighting games. The controller that pressed the button
to enter online play is designated as the main controller for the online mode.
These generally reduce inputs required to do what you want, which is a personal
pet peeve of mine in a lot of games. I also added a post match screen with
options:

- Rematch (Requires both players to click it)
- Quit to main menu
- Quit the game

With both of these, you can actually operate the game without dev binds which is
fantastic.

## Online play

Online play is the biggest feature update of this release. Before the reader
gets too excited, the current setup is not good enough to playtest, but just
about good enough to serve as a proof of concept.

As a technical summary, I used an Oracle free tier virtual machine that is
running [matchbox](https://github.com/johanhelsing/matchbox). Then I have a
[dy.fi](https://www.dy.fi/) free dns that I use to refer to the Oracle VM. On
the client I run
[bevy_ggrs](https://github.com/johanhelsing/matchbox/tree/main/examples/bevy_ggrs),
the Bevy plugin for [GGRS](https://github.com/gschup/ggrs), a rust
implementation of [GGPO](https://www.ggpo.net/) rollback netcode. Upon selecting
a character in online mode, the client connects to the matchbox server and shows
a lobby screen. When a second player connects, the players will get informed of
one another, communicate some information like character picks and the match
will start.

For anyone interested in implementing something like this, I cannot recommend
[Johan Helsing's "Extreme bevy"
-series](https://johanhelsing.studio/posts/extreme-bevy-desync-detection)
enough. It was greatly helpful in not only implementing, but debugging the
system. Especially the synctest sessions proved really helpful.

A common problem in rollback netcode are desyncs. Ideally, the system works by
just sending over inputs and the frames they were made on, but to check that the
systems are still in sync, they send a small hash of the game state as well. Any
difference in the hash means there is a difference between the players and the
sessions are no longer in sync. This can be as small as some rounding on
floating point numbers, or as big as a hit connecting on one end but not the
other.

There are roughly three types of desyncs:

1. How some math is done is inherently tied to the delta time and fluctuates
2. The rollback components need to be added to an item
3. A component needs to be designated as something that needs to be rolled back

Point 1 is the most difficult one and time wise probably the one that comes up
most often. I have two examples that may help understand it.

Example 1: I had a system where hurtboxes and hitboxes could be described using
character model joint locations. This way the boxes would follow the animations
without further code. What a fantastic, low effort solution! At least until
online play became relevant. If there are small delta time variations, the
animation frames get interpolated differently, which leads to slightly different
box positions, which is a desync.

Example 2: I wanted to make sure the characters remained on screen at all times.
In the physics system, running in a fixed update loop, the character positions
are clamped around the camera. I then had another system running in non-fixed
update, that lerped the camera towards the midpoint of the characters. Slight
difference in when the lerp gets run causes a slight difference in the camera
position, which causes a slight difference in the player clamp area, which is a
desync.

Points 2 and 3 are simply mistakes in using the tool. How bevy_ggrs handles
things is that if an entity gets despawned and respawned due to a rollback, only
the components designated as rollbackable are actually re-added to the entity.
This means that most components should be designated. There is also an entity
command thing provided by bevy_ggrs that adds a component to the entity that
tells bevy_ggrs to even consider that entity in the first place. All gameplay
relevant entities should probably be included in the rollback simulations, but
it's easy to miss some.

Synctest sessions are a tool provided by bevy_ggrs that trigger a rollback on
each frame, meaning if there will be a potential desync on that frame, it will
happen. Invaluable when debugging. To once again re-iterate. The in client
handling of the desyncs is questionable at best, as the game simply keeps going
after having detected a desync. Alternatively one of the players has their game
crash. I guarantee that there are desyncs. Some of the more obvious ones got the
axe, but more could've crept in during the refactors. One of the goals of the
next period is to hammer down on these so I can get people to test the game
online.

## Presentation

One of the goals of the last period was to make the game feel more like a game.
This included adding more effects, both visual and audio to make it more
responsive. I ditched hanabi, as I found it hard to work with and wrote my own
effects using a custom intermediate system that accepts human readable
descriptions of effects and then makes them happen. Action events can easily
generate both visual and sound effects.

Some of the effects that I added / edited:

- Visual
  - First hit spark (indicates attack height)
  - Subsequent hit spark
  - Visual trail for sword swings
  - Speed lines for dashes and jumps
  - Blocking
  - Better meter usage indicator (fresnel on character)
  - Darken out the character to basically a silhouette (status effect)
- Audio
  - Attacking (generic and specific for each special move)
  - Connecting an attack
  - Blocking
  - Taking damage (three tiers)
  - Losing a round
  - Sharpening the sword
  - Announcer round start / end

This also makes it seem more like a game, which feels nice. Especially the
character sounds are very temporary, but I wanted them in the game, as the
actual assets are pretty easy to switch out.

I highly suggest getting a few takes of each sound and then randomly picking one
at runtime. This makes repeatedly hearing the same sounds way less jarring. I
also pitch shift the sound up or down by about 10%, which is maybe a bit
extreme, but also adds variety.

## Move descriptions

Figuring out a consise and informative way to describe the moves of a character
has been an ongoing problem. Similarly to input parsing, I've gone through
several implementations, and except for a month or so after the most recent
rewrite, they all feel problematic.

The difficult thing is describing somewhat dynamic things with a few internal
dependencies that take place over some time. The usual cases are pretty easy.
Start an animation, wait a while, spawn a hitbox, wait a while, free up the
character. When it comes to more complex behavior, most of the systems struggle.
For example, if a move can be held for some time, it has been quite difficult to
encode. If a move does several things at different times, that has also been
difficult. The previous system had these things called action blocks, each of
which was supposed to describe a period of time. The script (effect) of an
action consisted of a linear series of action blocks. Each action block
contained information on what action events to send out when entering, when to
exit the block, and whether or not the block can be cancelled into something and
if so, what. This solution was pretty cumbersome to work with, especially with
more dynamic actions. There was an enum with a variant for each type of an exit
condition a block could have. One for simply taking some time, one for input
state, one for whatever. The block structure also didn't handle conditional
effects well. If a thing only happens if the user owns an item, I most often had
to implement a pretty ugly solution for that.

The first redesign I tried used function pointers to generate the events and the
rust macro system to hide the boilerplate. This was an improvement in some ways.
This was half-right, as the functions made dynamic things more easy, but since a
function pointer (fn) can't capture any variables in rust, I had to use macros
to put the values in the fn at compile time.

Call me what you will and proclaim my skill issues, but fuck macros in rust.
They were ok to write, but impossible to debug. Because of the flexibility of
the system, you can very easily make a lot of small mistakes, like relying on
imports outside the macro. Rust analyzer completely gives up with macros and I
had plenty of cases where simple operations like go to defintion simply don't
work. The macros I had made also lacked variety to describe different types of
moves, so I ended up with lots of overloads for the same macro with differing
amounts of arguments, rest filled with defaults.

The solution was to learn. Instead of an fn, I used Arc<dyn Fn> and life became
a lot easier. Now I could implement builder patterns to construct all sorts of
actions and the sun rose once again. I have a generic action builder for when
you just want any action, it gets used internally for the others and some moves
like the sword stance use it directly. I have a separate builder for attacks,
which allows entering the relative frame advantage instead of manually
calculated block stun duration. I also implemented builders for jumps, dashes
and throws. All of the builders can enforce things and fail their asserts if
I've made a mistake. If I try to describe relative block stun before assigning a
recovery duration, the system crashes whenever that character is spawned. I
could probably use lazy static and get it to do that compile time, but haven't
gotten around to doing that yet.

This new system sparks joy. I can use human legible builder methods to assign
aspects to moves and it feels incredible to know that I can't make simple
mistakes. I can't for example add a meter requirement to a move without also
making it consume that meter, which was an occasional blunder in the old
systems.

In the process I removed the old dummy character, as they didn't really even
work and it took a lot of effort keeping it up to date with the updates.
Considering this character was never going to be a part of the game, it was a
smart move to simply remove them. May they be forever remembered for their
contributions to the core system developments.

## Rewrite input parser

One must imagine Sisyphus happy. I've yet again redone the input parsing system
and I think this is a good opportunity to go over the various approaches I've
had and document the corner cases that makes them difficult to operate.

Some of the problems along the way:

- Picking which of the moves to start
- Encoding the move requirements
- False positives / negatives
- Too lenient / not lenient enough

For this next bit, my life is a bit easier if you understand [numpad
notation](https://www.dustloop.com/w/Notation). Essentially, the movement stick
can be in one of nine positions (4 cardinal directions + 4 diagonals + neutral).
These can be described using numbers, and the convention that stuck was to use
the layout of a keyboard number pad. Confusingly, it is inverted from the numpad
most phones use.

![numpad picture from dustloop](https://www.dustloop.com/wiki/images/a/a0/Numpad.png)

The notation also assumes the character is facing right, so 236 is a quarter
circle forward, 214 is a quarter circle back.

There are roughly three generations of input parsers, each of which contain some
work that went into it just to satisfy the needs of the game.

### Parser gen 1: Dumb af

### Parser gen 2: Parser heads

### Parser gen 3: Current one

## Observer based input event parsing

Bevy 0.14 introduced an observer system. With it, you can observe for
"Triggers", either in general or on a specific entity. This was a great system
for my game, but unfortunately Bevy added it years into the project. Being the
compulsive type, I did end up biting the bullet and refactoring the events
emited by the moves to use this pattern.

Old system:

- Action produces action events (enum with variant for each effect a move could have)
- Action events get stored in the main state component
- Related systems

  - Take mutable access to the main state
  - Use a drain-filter to scoop the events that system wants to handle

- Action produces action events
  - Action events are also bevy events
- Action events trigger main observer
- Main observer matches against the incoming events and invokes smaller events
  - Smaller events match 1-1 with action event variants
- Smaller events trigger specific systems

Benefits:

- No need to poll the main state
  - Code to poll was ugly
  - Handlers run on demand
- Some events were not really player specific, like hitstop
  - This is now handled better
- Handlers are in general smaller

Cons:

- Easy to forget something when making a new event
  - Bevy allows triggering events that have no observers
- There is some duplication in the propagation process
- Potentially inconsistent ordering

Overall, I like it, as the less read access to the main state, the fewer hard to
debug desyncs there are.

## Closing thoughts

I'm really proud of how much I got done here. Especially considering how
efficient it was. The app is really starting to feel like the foundations are
solid, which has been a high priority goal for a while.

I think I'll put some more effort into the online feature and try playtesting a
bit more, almost certainly with internet strangers. Character #2 has also been
stirring in the gray for quite a while and I think I'll begin work on them soon.
As [user "NoisyChain" on the FGC dev discord
](https://discordapp.com/channels/721738548759232593/721859206621429761/1295648598914109551)
pointed me towards it, I will probably try animating with [a simpler
rig](https://www.cgtrader.com/free-3d-models/character/other/humanoid-character-rig-for-blender).
If that then fixes my animation problems, I will redo the existing character
with that rig for easy compatibility and then proceed to use just that from then
on. Most likely I will snap back to the blender meta rig as that is probably
easier to find external animators for.
