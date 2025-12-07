---
title: 'Screw tabletop simulators'
tagline: 'Draw steel health system rocks'
createdAt: '2025-12-07T19:25+02:00'
tags: ['ttrpg']
wordCount: 1464
---

There are plenty of things about Draw Steel that are worth talking about. I
considered the classes, zipper initiative, the multitude of counters or how it
handles spellcasting, but after a few days of deliberation, what really takes
the cake is the health/damage system.

## How it works

This will be a rather dry and objective description of how Draw Steel handles
health and damage. It may feel distressing in parts, but hang on we'll get
there.

### Health

A character in Draw Steel has _stamina_ and _recoveries_. Stamina can be thought
of as traditional hit points and recoveries can be used to re-gain a third of
your stamina. The kit (common abstraction for weapons and armor) your character
has can increase your stamina. A character's stamina is always divisible by
three. At level one, the sturdier pregens hovers around 30 stamina while a
squishier one may only have 18. Most characters start with 8-10 recoveries.

There is an important maneuver (bonus action, minor action, non-main action)
called "catch breath", which allows using one of your recoveries to restore a
third of your stamina. There is also a main action called "heal", which allows
doing this for someone else, use one of their recoveries to heal them.

If you fall below half of your stamina, you are winded. It has no inherent
meaning, but some things key off of it. Your stamina can go into the negatives,
which is a state called "dying" that comes with a few key things. First of all,
most things you do will deal you 1d6 of unavoidable damage. Second of all, you
are unable to use "catch breath". Third of all, if it goes past your winded
value to the negatives, you die.

### Damage

To attack, the attacker rolls 2d10, adds their bonuses and checks which bucket
the result falls into. 11 or lower, 12-16, 17 or higher. Every attack will
always hit, but the amount of damage varies greatly between the buckets. Your
basic free strike without modifiers deals 2/5/7 base damage + might or agility
(usually +2 at level 1 for strikey characters).

## Why it works

### Gushing about the flow

With the explanation out of the way, I can geek out. The way damage is dealt is
genuinely one of the best design decisions to come out of the game. It fixes so
many problems and speeds up the game tremendously. I would not be surprised if
this was the core around which the rest of the system was built.

Instead of:

- Player: I would like to hit the monster
- DM: Aight, roll to hit
- Player: 18 to hit
- DM: 18 hits, roll damage
- Player rolls like three dice and takes 10s to do math
- Player: 15 points of thronging damage

You get:

- Player rolls 2d10, adds one number, quickly picks the bucket based on result
- Player: I hit the monster for 15 thronging damage

Being fair, you can optimize the first one kind of by rolling damage while
rolling to hit and communicating both numbers at the same time but you still get
the math break and more communication overhead.

This makes it so much faster. Draw Steel is incredibly snappy compared to
traditional d20 fantasy games, where the only quick turns tend to be the turns
where you do nothing. Like seriously, this is a valid turn that probably takes
less than 20 seconds:

> I move there, attack the monster (interaction from above) and then use a
> maneuver to kick sand in its eyes to help my team

Reducing the amount of die rolls and back and forth speeds up everything. An
argument could be made that combat in traditional d20 fantasy is slow on purpose
to pity the DM, as combat is one of the most prep time efficient activities.

### Damn the simulations, Kirk the Maru

The clever clocks among you may have noticed that 8-10 recoveries, with each
healing a third of your health means you can take quite a beating before running
out of steam. To my eternal shame, I must admit there is a part of me that goes
"hold up, that's not how health works". Just like there has to be rules for
underwater combat or fall damage, simulating the world is the implicit purpose
for many rules.

But why?

Not only why we simulate, but why does Draw Steel get this reaction out of me,
while other d20 systems don't? Health points are a simplified abstraction, but I
guess those get a pass somehow?

What MCDM has clearly done with Draw Steel is go for an aesthetic. A vibe as the
kids would say (That's me, I'm kids). It's not trying to simulate John Knight
battling a theoretical dragon and estimating how much damage would a flame
breath attack deal to John depending on his gear, the angle of impact, heat of
the flame, the volume of fire and the velocity of it. The mission statement was
clearly to create a playable action movie. It's romp, it's pulpy, it's fast and
frenetic.

Indiana Jones, Luke Skywalker, or John McClane would never go through the play
patterns that naturally happen in traditional d20 games. There is no way any of
them would go "Sorry guys I kinda used my spell slots on the first fight and
gotta take the rest of the day off now". None of them would say "Hey I almost
got stabbed, could we maybe like setup a campfire in the middle of the enemy
territory for an hour so I can bandage my wounds". Some systems bring that down
to a blazingly fast 10 minutes, but that's still an oddly long break to have in
an action movie. An action movie star will grit their teeth, have a deep breath,
and move on.

#### Rules are meant to be broken

I proclaim the following:

> Every ttrpg system should have a core fantasy it is aiming for, and the system
> should build and evaluate every rule against that fantasy and discard rules
> that don't glaringly obviously support it.

There are so many rules that are just cognitive filler and exist to pad out
books or to gain some sense of "realistic simulation". Fall damage, underwater
combat, crafting and downtime rules in most systems, survival in nature, random
encounters, rations, heat and cold, weather and climate, the list goes on. I
would divide these into two camps, background mechanics and subsystems.

Subsystems are rules meant to handle specific cases, like fall damage and
underwater combat from the list above. Subsystems are explicitly called upon
when a player attempts to do a thing. Whenever someone falls down a cliff, it's
pretty obvious they should take some damage, the exact formula is just one rules
lookup away.

Background mechanics are things you can forget. I loathe these, as most of the
time they come up in hindsight and there is no neat way to retroactively
introduce them. On more than one occasion, I've asked "How's everyone's rations
stash doing" and gotten back panicked looks and mumbling about forgetting to
track rations. Then follows a short attempt to "fix" the ration situation. This
includes a recap of how many days ago they were in town exactly and did they
have rations back then and well actually they didn't have any money then so they
couldn't have bought rations. After this we usually agree to no longer track
rations.

Subsystems are somewhat necessary, but can be greatly lightened by consistency.
If every subsystem works in roughly the same way, it's much easier to remember
how a specific one works. If we have a game where consequences have degrees,
each degree on a similar subsystem should have about as big a reward or
punishment on success and failure respectively.

You can also rely on a more general system for some cases. There is no need for
a specific lockpicking system, when you have a skill system or a tools system.
This is what Draw Steel does with attacking. The numbers and additional benefits
change, but the core activity relies on a uniform structure.

Most background mechanics are useless filler and should be heavily assessed
against the fantasy before inclusion.

## In conclusion

Draw Steel is great for what it does, but it does a specific thing.

Removing dice rolls speeds up stuff. Do that.

**Don't add rules for the sake of simulating the world. Only add rules that
support the core fantasy of your game.**
