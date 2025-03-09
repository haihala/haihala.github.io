---
title: 'WAG pre-polish update'
tagline: 'Mechanically settling down'
createdAt: '2024-07-18T14:22+03:00'
tags: ['wag', 'game design']
wordCount: 2698
---

I made a short [Video demo](https://youtu.be/hjmYv8yBe7Q) for those who want
something more visual.

I doubt I will write these as often as I should, so I will spare you the future
remarks on how it has been quite some time since the last update. Let's all
pretend this paragraph will be prepended to all future posts.

The project has been getting along quite nicely, some of the major things I've
figured out since last time include:

- Mechanical identity for Mizku
- How I can wrangle Blender to some degree of proficiency
- A way to produce icons that don't look decent when they are small
- UI design is difficult. That was obvious if you ever saw the game

There are lots of small improvements. You can see those in the list of commits
[here](https://github.com/haihala/whoops-all-grapplers/commits/main/). This post
was written on 2024-07-18, and the intro post was written at the start of the
year so look for the changes in that time window.

# Mizku mechanical identity

To be clear, by mechanical identity I mean the thought processes that would take
place even if the game was just a set of visible gameplay elements with no
graphical or audio flavor. The flowchart within the player's head that makes
something feel like itself. In fighting games, character archetypes, resource
systems and non-standard moves are all ingredients of mechanical identity. Just
like elements of games can have mechanical identities, entire games can have
them. Usually elements of a game contrast against the identity of the game as a
whole. You could look at Counter-Strike. The mechanical identity of the game is
greatly influenced by the spartan mechanics and focus on skill, strategy, and
precision in aim and movement. All of the elements of the game like maps and
guns contrast against this. The submachine guns for example are seen as lesser,
because they don't focus on the same aspects of player skill. One doesn't have
to have a great deal of accuracy with their movements or aim to make a p90 work
when pressing forward seems like sufficient strategy. In a vacuum the submachine
guns are not even that less skill demanding than the rest of the arsenal and
would doubtless be seen as the skill guns in a game that wasn't as focused on
snappy one-shot kills. To summarize:

> The mechanical identity of a game piece such as a character in a fighting game
> is constituted by the elements of their design and strategies they are
> involved in, contrasted against the perception of the identity of the game as
> a whole.

Identity of Mizku was not on my radar at the beginning of development, even
though it probably should have been. I had some ideas but the plan was vague and
in hindsight just a collage of moves from characters I like from existing games.
She had this backwards swaying move with follow-ups, because I liked it on
Slayer and she used to be able to instantly cancel out of it because I liked
mist finer cancels on Johnny. After that I simply threw in some poorly
represented narrative elements, blended it to an pulp, and called it a
character.

The reason I was putting in a lot of UI work in the past was that I wanted the
shop UI to be redone. After trying to have an inventory similar to games like
Dota 2, I realized that this is annoying to manage on a controller. I scrapped
the idea that you could buy multiple of the same item and just make it into
effectively an upgrade tree. I bring this up because one of the narrative
aspects of Mizku was that she was coming from humble origins and this was
reflected in the plan by having lots of consumables she would be incentivized to
repeatedly buy. This would lead to the general items being comparatively more
expensive over the course of the game. Even though consumables still exist, I
realized that they are way harder to design for now that you can't buy the same
item multiple times. She used to have to buy every kunai she wanted to throw one
at a time. I ended up with a system where she has a pool of kunais per round and
a couple of upgrades that increase the pool. I'm planning on adding other
upgrades like speed control.

On a shop related note I figured it was probably good to give each character
some build trunks. Similar to a tree, the builds players tend to go for have a
handful of shared core ideas that form the base for the strategy. Each player
and game has slight variations on it, but the trunk provides clarity in terms of
intermediate objectives. Main goal is to win, secondary goal tends to come from
the trunk, tertiary goals tend to be small things that ensure the secondary goal
is met. For a fighting game example, G in Street Fighter V (and hopefully in
Street Fighter 6 at some point) wants to win by depleting the opponent's health
or having more health when the timer runs out. They can go about this in a
couple of ways. G has a mechanic where he can get on his knee and gain a level.
His levels do a bunch of things, in short he gets stronger. However if he gets
knocked down, his level drops by one. G has two V-skills of which the player
must pick one before the game but after seeing the opposing character. One of
them is a bubble that serves as an attack / anti-projectile tool / combo tool.
Generally an acceptable choice. The second one lets him do a short animation.
After this, the next time he gets knocked down he doesn't lose a level. These
serve as somewhat indicative trunks of G's strategy. You can trust that you can
maintain your levels and take the first one for more utility and reward on hit,
or you can take the second one for more security at the cost of needing more
space and time to set up. V-skill 2 G tends to play slower, using more of his
fantastic level 3 fireballs and long range buttons, while V-skill 1 G tends to
be more explosive and have less need for levels altogether. He then makes
further decisions in the game that ideally support the style he has picked at
V-skill selection.

Looping back to WAG, I felt that every character should have at least two big
character specific things the player can invest in. For Mizku those two are her
sword stance and kunais. Sword stance as a playstyle should favor better
footsies and neutral play, which she will get rewarded for more with the
upgrades. The kunai playstyle is more about applying pressure, as the kunais are
advantageous on block, even more with upgrades. The player can blend between
these two and use universal options as well, which put together should yield
interesting and varied strategic decisions. Adjustments to the ideals will
happen, but I'm pretty satisfied with the current clarity of vision.

# Blender is a bitch, but we're getting along

I am not trained nor am I particularly interested in 3d modeling or animation.
I've taught myself Blender with this project and while I occasionally find
myself in a flow state and able to perform, I often struggle with a few issues.
Some are clearly due to a lack of artistic intuition. I know an animation looks
bad, but can't seem to articulate why. This I admit is not a problem of Blender.
It's hardly a problem at all. Most of my issues however are technical in nature.

Mizku has a sword and a lot of her animations include sheathing or unsheathing
the sword. I realized that I can use the idle pose as a base for the last
key frame when sheathing. For reasons unclear to me, this occasionally causes an
unnatural wrist rotation, as instead of going the short way around, Blender
reverses the wrist motion of the entire animation. This is mostly notable with
actions that have large swings. I usually end up deleting the key frames and
recreating them. This is a recurring issue and I feel like it shouldn't be.

In addition to the wrist motions, I struggle with the sword clipping through her
body. Fixing this to not look bad is a large time sink in the sword animations.
It feels tedious and difficult and I do regret having a sword for character #1,
as some of these problems are sword specific and I now have to undertake those
along with the generic issues. Also considered just teleporting the sword out
for sword moves, but don't want to go back and do that now as I'm fine with the
current animations.

I feel that I basically have to have auto key frame on as the alternative is
pressing i every time I change anything. This does make the curve editors nearly
worthless, but that could be a skill issue. I use the human meta rig and it has
a lot of controls to adjust.

Editing key frames can have effects on adjacent key frames. I understand why it
works like this, but I dislike it nevertheless. On multiple occasions I adjust
the pose at either end of a swing and it completely ruins the movement in the
middle or vice versa. I mostly fix this by adding more key frames, but this seems
tedious and it feels like I should just key frame all the bones. I occasionally
do just that and then remove excess at the end with Blender's key frame cleaner.
It does sometimes delete channels that stay the same throughout the animation
which is a problem when switching between animations. I think exporting the
actions makes the model return to the default stance between actions, so it
isn't a problem after export but it has tripped me up multiple times in the
editor. There may be a setting to not do that, should investigate. For now I
just went around all the actions with a loop of select T-pose, select target
action, go to frame 0, Select all bones, add key frame.

# Easy icon art

This may be somewhat legally dubious, but I'm planning on replacing the pictures
at the end with proper art so I don't feel too bad doing this for development
pictures. Essentially my process goes as follows:

1. Pick a reference picture from Google images
2. Open that with Gimp
3. Add layer for base colors, trace from image
4. Add layer for details, trace from image
5. Add layer for shadows, set to darken only, trace from image
6. Add layer for lighting, set to lighten only, trace from image
7. Export as png for the game
8. Save Gimp file and png in repo

I do all of the tracing by hand with a mouse, which leaves the result a bit
wobbly. This is not a problem since the pictures are never seen that spread out
Sometimes I add some grain or similar, but for the most part I just follow the
steps above. It takes me maybe 20-30 mins per image, so in hindsight I should've
probably just stuck to programmer art but a lot of the time I can recycle which
saves time. For example a lot of the various types of boots are using each other
as a starting point.

You may look over
[yonder](https://github.com/haihala/whoops-all-grapplers/tree/main/client/main/assets/icons)
to see the results.

# Bevy 0.14 update

Bevy 0.14 migration was not easy. I have to be mirror animations. Like in other
3d fighting games, a character on the left side of the screen uses the opposing
limbs for the same animations as the character on the right. This is done so
that the limb closer to the camera is always used, which is good for visibility.
There are games that don't always do this (NRS, Tekken), but I'm aiming for
something like Guilty Gear or Street Fighter. This has been a massive pain in
the ass for what seems like no reason. I faintly remember that in some engines
like Unity, you can scale the entire mesh by -1 on an axis to mirror everything
including the animations. Bevy does not do this. In Bevy 0.13 and before that,
animations were stored as pairs of paths and curves. A path was the list of
names of bones in the hierarchy that leads to the bone that is getting animated
and a curve describes how that bone moves over time. First I went over the
curves, which just take some math to figure out how to mirror after fixing the
model to a specific position in Blender (that took a while to figure out). Paths
were simpler. Blender has this convention, where bones on humanoid models have
either a ".L" or a ".R" suffix based on which side of the body they are on.
Since all of the side specific bones had a corresponding bone on the other side,
I could simply do some simple string replacements and that was that. Bevy 0.14
changes this. Instead of a path, the curves come with a UUID. These UUIDs are
calculated from the paths, but there was no way to undo that to generate a
mapping between the left and right sides. I have Blender set up to compress the
bone hierarchy on export, so the hierarchy in blender does not match the one in
game. I think it didn't fit in some Bevy bone limit without this, this may no
longer be the case. The way I dealt with this was to first use an online glTF
viewer to look at the exported .glb file. I then took note of all of the side
specific bones within the viewer and re-created pairs of the UUIDs for each pair
that needs to get flipped using the same mechanism Bevy uses. My descend to
madness and the code I ended up with is on the [Bevy
discord](https://discord.com/channels/691052431525675048/1260630289554608149).

The new Bevy 0.14 animation system also allowed for use of animation graphs,
which in my case were mostly an annoyance as I didn't want animation blending.
Now instead of storing animation clips in a resource, I store the graphs and
switch them out whenever needed. There are some questionable bits in there but
it works.

It took me 4 days of sporadic work to migrate to 0.14 and I felt like the whole
operation was relatively pointless. It did yield some cool features. The new
observer system may be useful in some circumstances and the color changes are
net positive, but in general I feel like the upgrade was just barely worth it. I
feel I have to keep up as maybe at some point I want to use a library that does
not work with an older version. Asking for help is also notably easier when
working on a newer version. In a lot of ways I do think the project would look a
lot different if I started with modern Bevy, as a lot of the architecture
doesn't really make sense anymore. I don't think a big refactor would be worth
it, as I see no reason it would not be out of date again in a year. In most
parts the churn has been manageable, but there are high level architecture
differences that clearly stem from how the project started in Bevy 0.5. I have a
sneaking suspicion that when I finally get around to netcode, I may have to get
the rework done with, as there are clear problems with consistency in the current
setup.

# Next up

The word is polish. Main targets at the moment are audio, particles, and player
feedback notifications. After that I will do a bit of bug hunting and hopefully
within a few months I can present the game to local fighting game community who
can give their feedback on it.
