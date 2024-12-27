---
title: 'WAG first playtests'
tagline: 'An eye opening experience'
updatedAt: '2024-11-30T09:09+02:00'
tags: ['wag']
favourite: false
---

[Short video](https://youtu.be/OdVJorNeXlM), [Github release](https://github.com/haihala/whoops-all-grapplers/releases/tag/11-2024-video)

[Previous post](/blog/wag-pre-polish-update) was made after
[this commit](https://github.com/haihala/whoops-all-grapplers/commit/3e9ae4fe82d8ff7ad7869e9cb79609d735aadec2)
I think I'll use tags from now on, hunting that down was unpleasant. This is
roughly a period of three months, during which I was relatively active.
There were lots of smaller things, but some highlights include:

Big external ones

- Menus
- Online play proof of concept
- Presentation improvements

Big internal ones

- Rewrite how moves are described (twice)
- Rewrite input parser (for the last time I hope)
- Move to an observer based event propagation system

I really cannot overstate how many bugs were squashed in the making of this
version. This period is about 50% fixes by commit volume. In addition to the
fixes, there were lots of little updates. Removal of a few uninteresting items
and addition of a handful of new ones. I've really gotten to a point where I can
bang out a new item in half an hour or so, 25 mins of which are making the icon.
There were also a few small improvements to the dev tooling, such as
configurable starting wealth and more/better binds.

Big thanks to my casual friends and local FGC grinders who volunteered to test
the game and despite numerous game-breaking bugs didn't complain.

## Menus

It may be a bit silly starting with the menus. To an outside observer, they are
insignificant. Despite their measly nature, they make the game _feel_ a lot more
like a "real" game rather than a toy. Booting up to a main menu seems oddly
normal compared to the years of going directly to a match. I did add a launch
option to start directly to a match to keep the dev cycle short, but the effect
of a simple main menu is hard to describe.

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

I, being the eternal pedant am really bothered by quirky menus in games that require
more inputs to operate than strictly necessary. The systems prioritize low
interactions to get to where you want over presentation. Some tricks I used:

- Any controller can control the menus
- The controller that pressed the button to enter online play is designated as
  the main controller for the online mode.
- The menu opens up pretty quick because it's not blasting you with videos

I also added a post match screen with options:

- Rematch (Requires both players to select it)
- Quit to main menu
- Quit the game

With both of these, you can actually operate the game without dev binds which is
fantastic.

## Online play

Online play is the biggest feature update of this release. Before the reader
gets too excited, the current setup is not good enough to playtest, but just
about good enough to serve as a proof of concept. It's just about good enough to
play a round or two with someone online before tech issues happen.

As a technical summary, I used an Oracle free tier virtual machine to run
[matchbox](https://github.com/johanhelsing/matchbox). Then I have a
[dy.fi](https://www.dy.fi/) configured to give it a free domain name. On the
client I run
[bevy_ggrs](https://github.com/johanhelsing/matchbox/tree/main/examples/bevy_ggrs),
the Bevy plugin for [GGRS](https://github.com/gschup/ggrs), a rust
implementation of [GGPO](https://www.ggpo.net/) rollback netcode. Upon selecting
a character in online mode, the client connects to the matchbox server and shows
a (blank) lobby screen. When a second player connects, the players will get
informed of one another, communicate some information like character picks and
the match will start.

For anyone interested in implementing something like this, I recommend [Johan
Helsing's "Extreme bevy"
-series](https://johanhelsing.studio/posts/extreme-bevy-desync-detection). It
was greatly helpful in not only implementing, but debugging the system. It
covers the matchbox/bevy side of the setup.

A common problem in rollback netcode are desyncs. Ideally, the system works by
sending over inputs and the frames they were produced on, but to check that the
systems are still in sync, a small hash of the game state is sent over as well.
Any difference in the hash means there is a difference between the players and
the sessions are no longer in sync. This can be as small as some rounding on
floating point numbers, or as big as a hit connecting on one end but not the
other. Generally, recovering from a desync is difficult, not dissimilar to
removing ingredients from a cake while it's in the oven. Thus it's best to
minimize the amount of desyncs in the first place.

There are roughly three types of desyncs:

1. Something is inherently tied to the delta time, which fluctuates
2. The bevy_ggrs components need to be added to an entity
3. Component needs to be registered with bevy_ggrs

Point 1 is the most difficult one and time wise probably the one that comes up
most often. I have two examples that may help understand it.

Example 1: I had a system where hurtboxes and hitboxes could be described using
character model joints and the actual locations were derived from the joint
locations at runtime. This way the boxes would follow the animations without
further code. What a fantastic, low effort solution! At least until online play
became relevant. If there are small delta time variations, the animation frames
get interpolated differently, which leads to slightly different box positions,
which is a desync. For most cases, the difference is negligible, but it can
theoretically lead to attacks connecting on one side but not the other so it has
to go.

Example 2: I wanted to make sure the characters remained on screen at all times.
In the physics system, running in a fixed update loop, the character positions
are clamped around the camera. I then had another system running in normal, fps
tied update for smoothly moving the camera towards the midpoint of the
characters. Exact camera position depends on fps, which causes a slight
difference in the player clamp area, which makes player positions desync.

Points 2 and 3 are simply mistakes in using the tool. How bevy_ggrs handles
things is that if an entity gets despawned and respawned due to a rollback, only
the components registered with it are re-added to the entity. This means that
most components should be designated. There is also an entity command provided
by bevy_ggrs that adds the required component(s?) bevy_ggrs to consider that
entity in the first place. All gameplay relevant entities should probably be
included in the rollback simulations, but it's easy to miss some. Custom hash
functions should also be added to make the sync hash a more comprehensive view
of the world state. Otherwise desyncs can go unnoticed. Transforms for example
are really important, so you should make the transform hashes a part of the sync
hash.

Synctest sessions are a tool provided by bevy_ggrs that trigger a rollback on
each frame, greatly increasing the likelihood of a desync if the code allows for
it. Desyncs can be inconsistent, so having a tool that bumps up the odds is
invaluable when debugging. To once again re-iterate. The handling of the desyncs
is still questionable at best, as the game simply keeps going after having
detected a desync until eventually one of the players has their game crash. I
don't know of any, but would be incredibly surprised if there were no desyncs
left in the game. Some of the more obvious ones got the axe, but more could've
crept in during the rewrites. One of the goals of the next period is to hammer
down on these so I can get people to test the game online.

## Presentation

One of the goals of the last period was to make the game feel more like a game.
This included adding more **pizzazz**. This took the form of visual and audio
effects. I ditched hanabi, as I found it hard to work with and wrote my own
visual effects using a custom system that accepts human readable descriptions of
effects and then spawns quads with shaders. Something similar for audio already
existed. Audio system has a bunch of small clever bits, like how it has very
easy variant voice line support or how it alters the pitch slightly to make audio
feel less repetitive.

Some of the effects that I added / edited:

- Visual
  - First hit spark (indicates attack height)
  - Subsequent hit spark (smaller)
  - Visual trail for sword swings
  - Speed lines for dashes and jumps
  - Blocking
  - Throw hit and avoid
  - Better meter usage indicator (Fresnel on character)
  - Darken out the character to basically a silhouette (status effect)
- Audio
  - Attacking (generic and specific for each special move)
    - This is usually a small exhale
  - Connecting an attack
  - Blocking
  - Taking damage (three levels, each level corresponds to a set of lines)
  - Losing a round
  - Sharpening the sword
  - Announcer round start / end

This also makes it seem more like a game, which feels nice. Especially the
character sounds are very temporary, but I wanted them in the game, as the
actual assets are pretty easy to switch out.

I highly recommend getting a few takes of each sound and then randomly picking
one at runtime. This makes repeatedly hearing the same sounds way less jarring.
I also pitch shift the sound up or down by about 10%, which is maybe a bit
extreme, but also adds variety.

These updates are really nice, but made it abundantly clear that I will need to
get some help with the animations, VFX, SFX, and especially voice acting. None
of this came naturally to me and it shows in the quality, but at the very least
I now understand that world a bit more.

## Move descriptions

Figuring out a concise and informative way to describe the moves of a character
has been an ongoing problem since the game had moves. Similarly to input
parsing, I've gone through several implementations, and with the temporary
exception of the month following a rework, they all feel problematic. On one
hand, this is an unnecessary waste of time, but on the other I do feel that I
have learned a lot during this project and re-implementing something in a
cleaner way is one of the most reliable sources of good feels I get from the
project. It's a fighting game, it won't be commercially successful, there is no
need to force my actions to a less fun "productivity" framework that maximizes
ROI% when the it is already atrociously bad.

The main source of difficulty is how dynamic moves are. They naturally describe
something changing over time, which is always a bit cumbersome, but on top of
that I've designed the game in a way where external factors often change how the
moves change over time. The usual cases are pretty easy. Start an animation,
wait a while, spawn a hitbox, wait a while, free up the character. Add VFX and
SFX to taste. When it comes to more complex behavior, most of the methods I've
used struggle. For example, if a move can be held for some time, it has been
quite difficult to encode in a static data structure. If a move does several
overlapping things at different times, that has also been difficult. The
previous system had a concept of action blocks, each of which was supposed to
describe a period of time. The script (effect) of an action consisted of a
linear series of action blocks. Each action block contained information on what
action events to send out when entering, when to exit the block, and whether or
not the block can be canceled into something. This solution was pretty
cumbersome to work with, especially with more dynamic actions. There was an enum
with a variant for each type of an exit condition a block could have. One for
simply taking some time, one for input state, one for whatever. The block
structure also didn't handle conditional effects well. If a thing only happens
if the user owns an item, I most often had to implement a pretty ugly solution
for that. In many cases I had duplicate moves where one triggered without an
item and the other with the item. This is still required in some cases, but I
think I only have one of them in the game now.

The first redesign I tried used function pointers to generate the events and the
rust macro system to hide the boilerplate. This was an improvement in some ways.
The functions made dynamic things more easy, but since a function pointer (fn)
can't capture any variables in rust, I had to use macros to put the values in
the fn at compile time.

This may be an open proclamation of a skill issue, but fuck macros in rust. They
were tolerable to write, but very hard to debug. Because of the flexibility of the
system, you can very easily make a lot of small mistakes, like relying on
imports outside the macro. Rust analyzer occasionally completely gives up with
macros and I had plenty of cases where simple operations like go to definition
just don't work. The macros I had made also lacked variety to describe different
types of moves, so I ended up with lots of overloads for the same macro with
differing amounts of arguments, rest filled with defaults. This was fine in some
cases, but cumbersome in the real pain points.

The solution was to learn. Instead of an fn, I used Arc<dyn Fn> and life became
a lot easier. I had to give up on some trait definitions, but the game works
fine without them. Now I could implement builder patterns to construct all sorts
of actions and the sun rose once again. I have a generic action builder for when
you just want an action. It handles the common things that all actions have to
deal with like animations and ending the action. The other more specialized
builders use it internally, but sometimes it's the most handy tool for moves
that don't have a hitbox like stances. I have a separate builder for attacks,
which allows entering the relative frame advantage instead of manually
calculated block stun duration. Not sure if the math is correct but it feels
pretty close. There is probably an off by one somewhere. I also implemented
builders for jumps, dashes and throws. All of the builders can enforce
invariants and fail their asserts if I've made a mistake. If I try to describe
relative block stun before assigning a recovery duration, an assert notifies me
of that.

This new system sparks joy. I can use human legible builder methods to assign
aspects to moves and it feels incredible to know that I can't make simple
mistakes. I can't for example add a meter requirement to a move without also
making it consume that meter, which was an occasional blunder in the old
systems.

In the process I removed the old dummy character. They were not fully functional
and manually migrating all the moves through all of the rewrites was a lot of
work. This character was never going to be a part of the game, but let us
forever remembered their contributions to the core system developments.

## Rewrite input parser

One must imagine Sisyphus happy. I've yet again redone the input parsing system
and I think this is a good opportunity to go over the various approaches I've
had and document the corner cases that makes them difficult to operate.

Some of the problems along the way:

- Picking which of the moves to start
- Encoding the move requirements
- False positives / negatives
- Too lenient / not lenient enough

There are roughly three generations of input parsers, each of which contain some
work that went into it just to satisfy the needs of the game.

### Parser gen 1: Dumb af

I highly recommend the "Primeagen" method of software development. I wish I
could find a link to a clip, but I remember him describing a process something
like this:

- Step 1: Just get in there and get it done. Quick and dirty, dicks out for
  Harambe. Just smack them keys in a fugue state until it does the bare minimum
- Step 2: Rewrite it with the lessons learned from step 1. This is usually good
  enough for most cases.
- Step 3: Repeat step 2 with the lessons learned during steps 1 and 2. This is
  useful when you want something of quality, or when step 2 is a major pivot
  from step 1 and it didn't pan out.

I love this so much. It acknowledges in such a human way that you don't know
everything at the start and learning what you are building while you are
building is a part of the process. Chef's kiss to you good sir.

The first parser was the step 1 implementation. I took the input state for each
frame and recorded that in a history buffer. Then looped through all the moves
to see if any of them are contained in the tail end of the history buffer. After
a move is detected, it's put into an activation buffer, which is looped through
each frame to see if any of them can be started.

This implementation had several problems. It has however been years so I don't
fully recall of of them. Here are some of the more memorable ones:

- Uniform history buffer lookup period was hard to balance
  - A period that is reasonable for a longer input is very long for a simpler one
  - Dashes for example happened a lot on accident
- Manual activation priority
  - Often multiple moves can be activated with the same inputs
  - Some moves have inputs that are contained in other inputs
    - For example, a quarter circle forward+button contains the input for forward+button.
  - This implementation relied on a manually ordered enum of action ids
    - If multiple moves can be started, it picked the one to activate based on this priority.
  - This is mostly fine, but there are cases where priorities between three+
    moves are cyclical, as their inputs overlap in different ways
- Command normal (Crouch moves for example) activation was wonky
  - There is a lot of nuance in how players intuit move parsers to work
  - For example, one expects a crouching move to come out after you crouch for a while and press a button
    - If you rely on looking back in the input history, the crouch input is easily out of the window
  - Workarounds
  - Repeatedly send the stick position input, which may be what this implementation did, I don't recall
  - Add input state data to the history and make a distinction between input requirements that look at the state vs events, but this adds complexity

This implementation was fine for a while and I was able to patch it to fulfill
several demands. I got charge and multi press inputs to work fine, but there were
a few unfixables. Maybe six months in, I got seduced by an idea of a better
system, the gen 2 parser.

### Parser gen 2: Parser heads

The vision came to me in a dream. Instead of looping back through every input
every frame, I would have these crawlers that would get fed with new inputs and
would then proceed to move along the requirements of the moves. Parser heads I
called them. Essentially, when the first input of a move comes in, a parser head
is created. All inputs are fed to all parser heads, so they move on their own.
You can have multiple parser heads traveling the same move at different points.
Once one gets to the end, they signal this to the parser that contains them and
that move is put to the activation buffer, which is unchanged from the previous
implementation.

So if a move requires inputs 1,2,3 and inputs 1,4,2,1,3 are provided, here is
roughly what happens:

- input 1 spawns a new parser head, waiting for a 2 input
- input 4 is not the starter nor does it advance the parser head, nothing happens
  - This allows a lot of lenience, a must in some cases
- Input 2 is not a starter, but does advance the head by one, it's now waiting for a 3
- Input 1 is a starter, there is now one head waiting for a 2 and one waiting for a 3
- Input 3 completes the original parser head, move activates
  - Other head just sticks around, same move can be in the activation buffer
    up to once, the second activation overrides the first one

There was also a mechanic where parser heads on the same input eliminate the
older one.

This solution could add a timeout between two steps instead of a total lookback
period, which largely eliminated the problems with shorter inputs activating by
accident. Manual activation priority was still a problem through.

The concept of diffs was introduced here. A diff was the difference between two
input states. It included up to one stick move, and some amount of button
presses and releases. Diffs were what was actually being passed to the parser
heads.

I did have to give up on some of the features of the first one. The only state
contained in the parser heads was the requirement they are at, so unordered
multi-presses had to go. I moved charge away from the input parser, as that
was just the right thing to do. It is now a resource like meter.

This was the longest living implementation, as it largely worked. This is not to
say there are no problems. The parser heads required that the parser was aware
of character facing, which meant that when the sides switched, a synthetic event
had to be sent to the parser. This lead to some false activations, for example:

- Back dash input is Back, anything, back
- Start when walking back (back input)
- Opponent jumps over
- Realize you need to switch block direction
- Slam stick to forward (forward input)
- Sides switch, synthetic back input is sent (synthetic back input)
- Backdash activates

The synthetic event was a must because block direction and walk direction would
otherwise not change. If the synthetic event was not sent, the character would
walk the wrong way after a cross over and would block / not block things they
were supposed to. In the above example without the synthetic event, if the
opponent hits with a cross-up on the way down, it would not get blocked without
the synthetic event, as the parser still thinks the stick is facing forward.

### Parser gen 3: Lookback 2: Electric Boogaloo

This was a rage-rewrite. I initially just wanted to re-add multi presses, but
that turned out to be very difficult, as the parser heads were difficult to
reason about, which can be seen in how it was the only part of the game that had
decent unit tests. After trying for a few hours I just said fuck it and rewrote
the whole thing to be simpler with the lessons learned through generations 1 and 2.

Gen 3 was yet another lookback parser similar to gen 1. However it had a few
advantages that I learned along the way. Gen 3 looks back an amount of time
proportional to input complexity, which is measured by the amount of
requirements the input has. For a simple button press, it doesn't even look
back, just examines the current frame. For a more complex motion it looks back a
few frames per requirement.

I added more syntax to what was quickly becoming a shitty DSL. There are now
three kinds of groups. `[]` denotes an "any" group. Any input in this group is
good enough and the parsing proceeds. `()` is an "all" group, and requires every
input to be present in order to proceed. Finally `{}` is a state group. It works
like the any group, except it looks at the input state instead of incoming input
events. Important note, it's not a requirement on it's own, but a modifier on
the next requirement. `{123}4` requires 1, 2, or 3 to be true on the input event
when 4 is pressed. I also added some syntax like the `+` for designating a
requirement as 'sticky', which meant the previous input had to still be in
effect by the time the next one happened. This was largely made obsolete by the
`{}` groups. There was also the `*`, which was passed by any input. It's mostly
used for some niche cases, where you want to extend the lookback period and may
get removed later. It's a bit of a hack and I may end up removing it.

There is now also a metadata section in the inputs that contains flags. At the
moment there are two flags, 'A' and 'S'. The 'A' flag stands for Absolute, which
means the input does not care about sidedness. This is useful for menu
navigation, which previously had to double flip the sides to revert the baked
in flip. The 'S' flag stands for slow and increases the amount of lookback
frames per requirement. The optional sidedness made the whole thing way simpler,
as it gets processed pretty early on and most of the parsing is side-agnostic.

The whole system only runs when new input is coming in, which is not relevant
performance wise but helps me sleep at night. There is also a quick check, that
if move is in the lookback period before adding in the incoming input, it can't
get activated as it must've already been activated. This has caused some
problems and I may end up removing it, but so far I like the idea that one move
input will only ever yield one activation event.

Since the parser is largely side agnostic, synthetic events are gone. Systems
that care about input sidedness now flip the stick position themselves and the
input parser is not aware of character facing. Block direction can change
without any updates to the parser, since blocking only gets the absolute stick
position from the parser and then calculates if that stick direction is blocking
based on character facing.

Diffs are gone as they were complex, redundant due to input events, and could
prove difficult in cases where things happened on the same frame. If a button
was in both the pressed and released lists of a diff, that could either mean it
was released and re-pressed the same frame or pressed and released the same
frame. There is no way to tell from the diff if the button is still pressed. I
guess the idea was to make stuff more efficient by clumping inputs to the same
diff and make detecting just frames like Tekken's ewgf easier. The new system
can do the same things and I don't deflate when I realize I need to work on it.

This implementation used almost the same metric for buffer lookback as it does
for prioritizing moves. Usually the more complicated move available is what the
user wanted. The measures aren't strictly the same, as that lead to cases where
the different lookback periods blocked some legit activations. (crouching button
had a non-zero lookback, which meant it could not activate every frame like the
standing button with zero lookback, holding down and spamming occasionally gave
you the standing button. Now lookback does not consider `{}` groups, but priority
does). Priority also can consider things like the flags if I want to.

## Observer based input event parsing

Bevy 0.14 introduced an observer system. With it, you can observe for
"Triggers", either in general or on a specific entity. This was a great system
for my game, but unfortunately Bevy added it years into the project. Being the
compulsive type, I did end up biting the bullet and refactoring the events
emitted by the moves to use this pattern.

Old system:

- Action produces action events (enum with variant for each effect a move could have)
- Action events get stored in the main state component
- Related systems
  - Take mutable access to the main state
  - Use a drain-filter to scoop the events that system wants to handle

New system:

- Action produces action events
  - Action events enum is a bevy event
- Action events trigger main observer
- Main observer matches against the incoming events and invokes smaller events
  - Smaller events match almost 1-1 with action event variants
- Smaller events trigger specific systems

Benefits:

- No need to poll the main state
  - Code to poll was ugly
  - Handlers run on demand
  - Less mutable access => more parallel execution
- Some events were not really player specific, like hitstop
  - This is now handled better
- Handlers are in general smaller

Cons:

- Easy to forget something when making a new event
  - Bevy allows triggering events that have no observers (changed in 0.15 maybe?)
- There is some duplication in the propagation process
- Potentially inconsistent ordering

Overall, I like it, as the less read access to the main state, the fewer hard to
debug desyncs there are. It's also notably easier to write the handlers for.

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

Bevy 0.15 also released today as of writing, so I'll get to work on that in a
week or so when the ecosystem has caught up.
