---
title: 'Mankind knew'
tagline: 'An interactive experience'
createdAt: '2025-01-28T19:19+02:00'
tags: ['pet-project']
---

<script>
	import Carousel from '$lib/components/Carousel.svelte';
</script>

I and Saska (a coworker from my day job) made this for the combined Global Game
Jam (GGJ) / Finnish Game Jam (FGJ) of 2025. Before going into detail, you
**can** and **should** [play the game in your
browser](https://haihala.github.io/mankind-knew/) or download executables for
Windows and Linux [on the GGJ
site](https://globalgamejam.org/games/2025/mankind-knew-1). What you do when
unprompted and reflection of that is key to the experience, so try to be a nasty
little art hoe and do some analysis.

## How it ended up

<Carousel elems={[
{src: "https://ggjv4.s3.us-west-1.amazonaws.com/files/styles/sidebar_full/s3/games/2025/838847/featured/IMG_1204.png?VersionId=OjRkVHL4GQlpI3kj.cx3gSepBEb24xlB&itok=MRnqomG7", alt: "Colorful banner that reads 'mankind knew...'"},
{src: "https://ggjv4.s3.us-west-1.amazonaws.com/files/styles/flexslider_full/s3/games/2025/838847/screenshot/IMG_1208.png?VersionId=664TMDJxdTO9o7pW_4gJTVCmbjxa_RG6&itok=aFQ8998A", alt: "Initial game state with the 'mankind knew' logo in the bottom right corner"},
{src: "https://ggjv4.s3.us-west-1.amazonaws.com/files/styles/flexslider_full/s3/games/2025/838847/screenshot/IMG_1209.png?VersionId=k5hhONywUWFRc1.md40qP7WeO8nlN4th&itok=BcVv-teo", alt: "End of game chart with the 'mankind knew' logo in the bottom right corner"},
]}/>

The project was probably my smoothest jam game up to this point and I think that
was largely due to Saska. He's a coworker at my day job who has a background in
game dev / programming, but mostly does design for websites. He clearly had the
vocabulary, drive and mindset to effectively work together on a team and the
whole thing would be a hell of a lot less charming if he wasn't there. I did do
most of the coding, shaders and design, while he did design and sprites with a
clear fingerprint in the design as well.

I will now proceed in roughly the following order:

- Whine and bitch about the jam
- Explain how the thing got made
- Give my take on what the message is

## Whining about the jam

GGJ is a week long game jam, but the FGJ part is a 48h block, filled with lots
of interruptions. I don't want to complain too much as an outsider, but having
done the Jam fully remotely, I don't want to be notified whenever pizza is
available for live jammers, nor do I really want a collaborative pitch session
or a mid-check. I can see that these make a lot of sense for community building
at a live event, but remotely they just seemed like a waste of time, which is
annoying in a time critical setting like a game jam.

The information packages were dreadful. They sent two email PDFs which still had
a fair few holes in them that needed to be plucked. The schedules in the PDFs
were simply wrong the first time around for example. Still somehow after a
revision, the PDF was missing or ambiguous about a lot of critical information,
such as the team formation, pitching, mid-check and basically everything that
happens live. I'm guessing the organizers have attended a few times themselves
and take stuff like that for granted, but as a first time attendee this was a
definite dampener on the experience.

Being a part of the GGJ also hurts FGJ in many ways. GGJ is a longer jam that
starts earlier, so jammers can easily get spoiled on the shared theme
accidentally, which happened to me. GGJ is also a staggeringly big organization
and I don't really think any of the five speakers that were stapled onto the
theme reveal video had anything of interest to say. A lot of effort had clearly
been put into something that could've been a single header tag on some website.

The GGJ website itself is also clunky on a good day and borderline unusable when
there is a lot of traffic, such as when the submissions end. I'm still not a
100% convinced I managed to even submit correctly, as the instructions were were
provided by FGJ contradict the GGJ website slightly. FGJ says to submit one zip
where you have both the executables and source files, whereas the GGJ site has a
separate file upload for both. The uploads say they have a max size of 5G, but
whenever you upload, it likely breaks and the error message says there is a cap
of 2M, which last time I checked was less than 5G. Despite the error and the
message it told me to find in the browser dev console, I think I managed to
upload the zips.

## How the sausage got made

The thing itself was built in Godot, which I've gotten pretty comfortable with.
Unless there is a reason to not use it, I think I'll just go with Godot for all
my future projects. It's far from perfect, but the UX is worlds better than Bevy
or Unity, which are the two other options I know. Unreal seems overkill for the
types of projects I do, although I've tried it a few times. Smaller engines like
löve seem to fall into the Bevy camp of good in theory but will probably be
missing a lot of little things like a graphical shader editor. I didn't really
use Godot's graphical shader editor for this project, but have done it in the
past and through it was neat. I think I'll probably use it for some kinds of
effects where the intermediate previews are relevant.

I used this project to explore minimalism of file hierarchy. Usually I have a
detailed folder structure, but creating and adjusting it takes time. I wanted to
see how far I can go before having everything in the same folder became an
issue. In the end, we submitted the project with two folders. One for art not in
the Godot project and the Godot project itself. Everything used by Godot whether
that be scripts, textures, scenes what have you is in the root of the godot
project folder. Whenever I needed to scroll the resource view, I had the urge to
make folders, but in the end it probably wouldn't have been worth it. Godot is
fantastic at letting you avoid scrolling through everything. If you type things
out correctly, you can often use the quick select in the inspector to get a
picker with a manageable amount of options. I think going forward I will change
how I organize my projects. Not as spartan as here, but definitely more relaxed
than my typical structures.

Some gripes I've started to notice about Godot are that occasionally it just
needs to be restarted. Scenes are bleeding into each other and things are
behaving strangely. Using git rebases probably has an effect on this, but I've
found it happens in solo projects where I never rebase. Saska was on an M2 mac,
which for some reason whenever he ran the game added some identifiers to three
scene files, which my linux install then removed. I think we probably
ping-ponged the same change over three or four times. When I scroll anything
with the middle mouse button, it sometimes flings my camera in a random
direction. This doesn't happen when I use space to scroll but every now and then
I forget. It only happens in Godot so I don't think it's a hardware issue.

Most annoyingly of all, I found that occasionally something works on desktop and
the game successfully builds for web, but that thing doesn't work on the web.
I've had this happen with other things, but it's most common with shaders. After
95% of the NPC beliefs align, the game ends. Desktop players get a smoothly
appearing blur of the game view, which keeps moving without sound. On the web
the blur simply doesn't work and you get a black background. More importantly,
we have an indicator on the player's hat that shows when they will next emit
messages and which colors they currently contain. This shader has a uniform
which takes in an array of `sampler2D` types, essentially textures. It then has
a loop to determine which of the segments the current fragment is in and samples
from the right texture. This works fine on desktop, but on the web, you can't
index an array of samplers with a variable for whatever reason. The workaround
here was to sample all the textures into an intermediate array and then index
that instead. Thanks to [the Godot discord
people](https://www.reddit.com/r/godot/comments/1iahhcu/a_fragment_shader_turns_invisible_on_the_web/)
for coming up with that one.

Oh and the name was originally meant to be the entire quote from Guilty Gear: Strive,
as we are both let's say consumers of that game, but sadly GitHub has a maximum
character limit of a 100 in repository names, so I shortened it.

## What it all means

Important note: I nor Saska agree with the message in full. This is my
interpretation, which I've tried to create from a perspective of an outside
consumer and not the author. I will not elaborate further.

The game is obviously a political statement on the polarizing effect of online
echo chambers. Even if at the start there are people with no strong beliefs,
simply existing in an environment with others will inevitably convert everyone
to a strong believer in whatever is popular or have them reject the discourse,
effectively refusing to play. Which idea ends up on top is completely random and
largely irrelevant to the behavior of the system as a whole.

After a while, the divisions have been made. There are likely 2-3 bigger groups
that flock together with perhaps a few stragglers that are trying to not get
involved. Up to this point, the game essentially plays itself, and no player
insight or action is required. The game features a timer, which is an implied
objective in one of two ways. Either you should minimize or maximize it. Maybe
the player goes for the later and tries to maintain a multitude of views for as
long as possible, but eventually they notice the game is pretty much playing
itself. No action is needed to keep the people with opposing views from
interacting with each other, they seem to automatically keep their distance and
most of the time won't even interact with messages from "the other side".

The only way to proceed is to convert. The player can enter one of the crowds to
soak in ideals and then spew those onto others, acting as the propaganda arm for
whatever ideology they chose. The only way forward is to regurgitate rhetoric
until everyone is of one mind. It is a statement yearning to end all discourse
and personality. One of idealized homogeneity. Until we act and convert others
to whatever belief will work for us, we cannot move forward. People cannot be
trusted to come to their own conclusions and this must be done by the player, a
[great man of history](https://en.wikipedia.org/wiki/Great_man_theory).

From observing others play, their typical first and only runs take about three
to five minutes. You don't have to play the game, but simply to see what happens
next, most of my friends are willing if not eager to become dispensers of
truth-irrelevant slop. I don't know what to think of that one.

One could postulate that not playing is more ethical. Simply letting the
discourse continue as it "naturally" would. If you do that, the game is nothing
more than a fancy lava lamp. It loses meaning if you choose to not engage with
it. What is the point of "playing" the game where you do nothing of significance
nor of substance?

I tried to in a subtle way make the experience
[Train](<https://en.wikipedia.org/wiki/Train_(board_game)>)-esque, but fear it
worked about as well as adding a pinch of salt to a soup. The point of Train to
an extent is how it's unbearably salty at a specific point, which is an effect
greatly dampened by subtlety. In hindsight I probably should've made it more
explicit.
