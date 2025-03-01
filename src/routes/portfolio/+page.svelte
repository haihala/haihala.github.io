<script>
	import Carousel from '$lib/components/Carousel.svelte';
	import Icon from '@iconify/svelte';
	import AboutMe from './AboutMe.svelte';
	import BackgroundVideo from './BackgroundVideo.svelte';
	import PortfolioPanels from './PortfolioPanels.svelte';
	import Socials from './Socials.svelte';
	import NumpadArrows from '$lib/components/NumpadArrows.svelte';
</script>

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="Eero Häihälä's game development portfolio" />
</svelte:head>

<BackgroundVideo />

<div class="root">
	<div>
		<div class="video-cover">
			<h1>One of those pretentious portfolios with a video in the background</h1>
			<button
				class="scroll-icon"
				onclick={() => {
					const h2 = document.querySelector('.page');
					h2?.scrollIntoView({ behavior: 'smooth' });
				}}
				aria-label="Scroll to first page"
			>
				<Icon icon="material-symbols:arrow-cool-down" height="3rem" />
			</button>
		</div>
		<div class="page">
			<AboutMe />
		</div>

		<div class="page">
			<h2>Whoops! All grapplers</h2>
			<Carousel
				elems={[
					{
						type: 'video',
						src: '/portfolio-assets/wag-combo.mp4',
						alt: 'Video of a combo in a juggle fighting game'
					},
					{
						type: 'video',
						src: '/portfolio-assets/wag-round-flow.mp4',
						alt: 'Fighting game round ends, a shop fills the screen, lots of time is spent twiddling through the options, new round begins'
					},
					{
						src: '/portfolio-assets/wag-menu.png',
						alt: 'Main menu of Whoops! All grapplers'
					},
					{
						src: '/portfolio-assets/wag-sharpen.png',
						alt: 'Female character running her hand over a katana, sharpening it'
					},
					{
						src: '/portfolio-assets/wag-shop.png',
						alt: 'Shop view in Whoops! All grapplers'
					}
				]}
			/>
			<PortfolioPanels
				description={[
					'2.5D fighting game',
					'With moba-like upgrades',
					'And online multiplayer',
					'With rollback netcode',
					'Built with Bevy and Rust',
					'Scope: Solo project, semi-active since 2021'
				]}
				contribution={[
					'Game design',
					'Programming',
					'VFX',
					'Modeling and animations',
					'UI design',
					'Icon art',
					'SFX / Voice acting'
				]}
				learnings={[
					'Fighting games are hard',
					'Rollback netcode is hard',
					'3D can be hard',
					'ECS is a double edged sword',
					'Blender competence',
					'Rust mindset shift is awesome',
					'Lots of practial programming'
				]}
				changes={[
					'Better art in all forms',
					'More characters',
					'More items',
					'Add a tutorial / single player mode',
					'Add a proper lobby system',
					'Countless slight tweaks'
				]}
			/>
			<p>
				When I was younger I had a tendency to oscillate between projects that are way too big to
				finish before losing interest and projects that were way too small for me to ever get
				interested in the first place. I started work on this in 2021, and it has held my interest
				so far. I was getting into fighting games at the time with the release of <a
					href="https://www.guiltygear.com/ggst/">Guilty Gear: Strive</a
				>. One of the things that consistently motivates me is when a game evokes strong emotions in
				both ways. In some ways, GGST is fantastic (art, music, rollback netcode to pick a few
				cherries), but in others I can't stand it. My list of gripes changes over time, but some of
				the evergreen topics include the lobby system, loading times, unintuitive legacy mechanics,
				emphasis on block pressure and the corresponding de-emphasis on neutral and several specific
				character designs.
			</p>
			<p>
				The elevator pitch is that WAG is a relatively simple fighting game at first, with most of
				the complexity gated behind an item shop, similarly to mobas. This was in part inspired by
				how several moba players refused to even try fighting games due to the perceived difficulty
				despite playing a game that is an order of magnitude more complex in some ways. The shop
				spreads out the cognitive load and allows the players to take it at their own pace. It makes
				theory crafting not only accessible, but encouraged for low to mid level players.
			</p>
			<p>
				Unfortunately, the game doesn't screenshot well. The UI especially is very early on and is
				not representative of the final product. You can read more about it
				<a href="/blog/wag-intro">on my blog</a>. Some of the posts include videos. I really tried
				to keep this concise, but if prompted can talk your ear off about it.
				<a href="https://github.com/haihala/whoops-all-grapplers"
					>The source code is available on Github</a
				>.
			</p>
			<p>
				One of the motivations I had for starting this project was that I wanted to learn Rust and
				the ECS pattern. Nowadays I would consider Rust to be my most comfortable language, even
				over simpler languages like JavaScript and Python. I don't know if I would call it a good
				language for game development, but beyond a shadow of a doubt it has applications in the
				vicinity, such as tooling and engine development. ECS was a bipolar experience. In some
				ways, it is incredibly good. Splitting code comes naturally and extending existing systems
				can be very easy. In other ways it is cumbersome. The game has rollback netcode, which means
				it must be completely deterministic regardless of machine architecture or frame rate.
				Ensuring determinism was a low point for Bevy's otherwise very ergonomic APIs. The project
				started on bevy 0.5, which was before Bevy was a year old. This has lead to a lot of growing
				pains. I've redone some systems several times due to Bevy changing. That's not to say they
				are perfect or even that the primary reason for me to rewrite something is a Bevy update,
				just that there has been a lot of effort put into ventures one would probably not need to
				worry about on a more established engine.
			</p>
			<details>
				<summary>Implementation highlight: Builder pattern for actions</summary>
				<p>
					The game is a fighting game, so there are lots of actions a character can take. In a
					traditional fighting game like Street Fighter, a character usually has about 20 different
					moves on the low end. Multiple Tekken characters have 100+ moves in their arsenal, with
					several of those being multi-part strings you can think of as distinct moves. WAG will be
					closer to Street Fighter than Tekken, but the problem is still notable. On top of having
					lots of moves,I wanted things like jumping and dashing to also use the action system. This
					way I can implement something once and use it for all sorts of actions.
				</p>
				<p>
					Problem: Lots of actions with all sorts of corner cases. Some have attacks attached, some
					do not. Some change the animation, some do not. Some trigger with an input, some get
					triggered automatically by something else. It's hard to describe actions in a concise and
					readable way.
				</p>
				<p>
					Solution: Use of the builder pattern. For the most part I'm not a big fan of the Gang of
					Four patterns, with a few notable exceptions. The builder pattern is one of those
					exceptions. I implemented a base action builder and then built specialized builders on top
					of that, so now I can describe various types of actions clearly while maintaining the
					flexibility of the underlying system. I've attached screenshots of a few builders used for
					different types of actions.
				</p>
				<Carousel
					elems={[
						{
							src: '/portfolio-assets/wag-attack-builder-code.png',
							alt: 'Code of an attack builder'
						},
						{
							src: '/portfolio-assets/wag-dash-builder-code.png',
							alt: 'Code of a dash builder'
						},
						{
							src: '/portfolio-assets/wag-action-builder-code.png',
							alt: 'Code of a generic action builder'
						}
					]}
				/>

				<p>
					The example pictures are from the <a
						href="https://github.com/haihala/whoops-all-grapplers/blob/9978175406e7b743c426146d0fdfb88da7315497/client/characters/src/characters/samurai.rs#L168"
						>Samurai's file (may not be up to date)</a
					>. The first one is a jumping knee thrust, the second one is her grounded dash, which puts
					her airborne on frame 5, and the third one is a cancel option for her sword stance. I've
					become too used to the code to tell for real, but to me the code seems like it should be
					understandable for someone who is familiar with fighting games without much prior
					knowledge of how WAG has been programmed. Systems like the shop system can transform moves
					mid match, so I needed a tool that could match that level of dynamism. The builders can
					even take in functions that will get evaluated per frame to do whatever I want it to do.
					The builders have a bunch of assertions in them that make sure I don't make any easy
					mistakes. If I forget to add an end time to an action or a hitbox to an attack, an assert
					will catch that.
				</p>
			</details>
			<details>
				<summary>Maintainability highlight: Automated input parser tests</summary>
				<p>
					Fighting games have special moves, which only activate after a specific set of motion
					inputs. Street Fighter has it's hadoukens and shoryukens, both of which require moving the
					movement stick through a set of points before pressing a punch button in order to come
					out. The input parser is hard to get right. It has to be reliable, but not give false
					positives. It has to allow for all sorts of input descriptions but be reasonable to use.
					It has to run quickly and consider things like which way the player is facing. I've
					rewritten the input parser three times now from scratch. You can read more about it on <a
						href="/blog/wag-playtest-1">the dev log post I did the third rewrite</a
					>.
				</p>
				<details>
					<summary>Tangent about how motion input parsing is complex</summary>
					<p>
						The border between a bug and a feature is razor thin. Quirks from old games have
						solidified as features of the genre. There are tricks the players have gotten accustomed
						to and expect to work. You more or less have to program the quirks in, or design around
						them.
					</p>
					<p>
						It's expected that the input parser can reuse inputs for one action for a following one,
						and that the inputs for complex motions don't need to be 100% "correct".
						<a href="https://www.youtube.com/@LeonMassey">Leon Massey</a> explains it better than I
						could in
						<a href="https://youtu.be/kS7CcUSvamQ?si=IvWYHwDvBDu-4P7r&t=239"
							>his video about combo variety</a
						>, but I will give it a shot anyways. What you need to know is that in most games you
						can cancel normal moves into specials (the motion moves). In some games including Street
						Fighter 3, you can also cancel specials into supers (even more motion-y moves). Because
						of this, Ken can do a combo where he first lands a crouching medium kick (normal),
						cancels into shoryuken (special), and then cancels into super. The input for crouching
						medium kick is any of the down directions + medium kick, shoryuken is <NumpadArrows
							dirs={[6, 2, 3]}
						/> + any punch button, and the super is a double quarter circle forward (<NumpadArrows
							dirs={[2, 3, 6, 2, 3, 6]}
						/>) + any kick button. You can do the whole combo by inputting the crouching medium kick
						into <NumpadArrows dirs={[6, 2, 3]} /> punch
						<NumpadArrows dirs={[6, 2, 3]} />
						kick. The shoryuken should be pretty clear, you are doing the input fair and square. It's
						harder to know why the super comes out without two quarter circles. Most games allow you
						to miss an input or two in complex motions like supers. The full series of inputs should
						looks something like <NumpadArrows dirs={[2]} /> mk
						<NumpadArrows dirs={[6, 2, 3]} />
						p
						<NumpadArrows dirs={[6, 2, 3]} />
						k. The game could find the quarter circles where I've put the angle brackets: [
						<NumpadArrows dirs={[2]} />
						mk, (missing
						<NumpadArrows dirs={[3]} />
						here, permitted by leniency)
						<NumpadArrows dirs={[6]} />
						][
						<NumpadArrows dirs={[2, 3]} />
						p
						<NumpadArrows dirs={[6]} />
						]
						<NumpadArrows dirs={[2, 3]} />
						k(this kick triggers super, since it comes after two "quarter circles"). Alternatively the
						game could just trigger the super when it sees enough of the desired directions in a short
						period of time regardless of order. This is what Leon thinks is going on. No matter why it
						works, the game is recycling the shoryuken motion in the super, and allowing for some leniency
						with the super input.
					</p>
					<p>
						Some of these tricks are game specific, like the Street Fighter crouching shoryuken,
						inputted with
						<NumpadArrows dirs={[3, 2, 3]} />
						+ punch, instead of the proper listed input of
						<NumpadArrows dirs={[6, 2, 3]} />
						+ punch. The shoryuken is often used as an anti-air, a counter to the opponent jumping at
						you. Being able to do it crouching means your character's hurtbox is lower, which means the
						opponent jumping at you will hit you later, giving you more time to react to the jump. This
						is not really game breaking, but a technique that stems from the input parser being lenient.
					</p>
					<p>
						Some tricks are so common players just consider them the normal input. Grapplers have
						these big grabs called command grabs which often have a "360" input. On paper the 360 is
						a full rotation of the stick. Zangief's spinning piledriver input is shown in the input
						list as
						<NumpadArrows dirs={[6, 3, 2, 1, 4, 7, 8, 9, 6]} />
						+ punch. This has a few problems. One of them is that any of the upwards inputs will cause
						you to jump if able, which forces you to churn the input when Zangief is in a state where
						he can't jump. The second problem is that even on an arcade stick, it's very easy to miss
						a corner. Developers have since made the 360 input more lenient to the point where the name
						and notation are misleading to new players. For most games, you only really need to hit half
						of the designated directions. Sometimes you need to hit the cardinal directions, sometimes
						not. The way Zangief players really do SPDs is more like
						<NumpadArrows dirs={[6, 3, 2, 1, 4, 7]} />
						+ punch, which is a nice rolling motion with only one jump input and it's the last required
						direction, so if you hit the punch within a few frames of the last direction you get an SPD
						instead of a jump. It's not the easiest thing in the world, but a silver Zangief player can
						land it nine times out of ten. If they had to do the input as written, I doubt they would
						hit it once out of ten attempts. The confusion of the 360 motion is largely why I probably
						won't ever put one in WAG despite loving them as a concept.
					</p>
					<p>
						Point here being there are lots of input shenanigans that players expect. Sometimes you
						can get multiple birds with one stone, but some require their own changes. Adding a
						shortcut the wrong way can cause you to accidentally invalidate other shortcuts, cause
						false positives, or add a new degenerate shortcut that ruins a character or even the
						game.
					</p>
				</details>
				<p>Problem: Changes to the parser can very easily break a corner case elsewhere.</p>
				<p>
					Solution: Automated tests. I've gone back and forth on the amount of tests in the project
					and it currently has about 30. The test coverage is not that great, but I don't think it
					should be. Coverage is a misleading metric, and there have been lots of sweeping changes
					in the architecture as I learn more about Rust, Bevy, or programming in general, which
					invalidate parts of the codebase. I've removed maybe 20 or so tests because the system
					being tested no longer exists. The input parsing tests are without a doubt the most
					valuable tests I have. They were originally written for the previous parser, but I made
					them generic enough to work with the current and any future parsers. They simply test if a
					series of inputs gets registered as a specific input, or that it doesn't produce a common
					false positive. They could be more detailed, but they already catch most of the problems
					I've had. Having a test suite this good allows me to do TDD when I work on the input
					parser, which I think is a great application of TDD.
				</p>
			</details>
		</div>

		<div class="page">
			<h2>Green eggs and ham</h2>
			<Carousel
				elems={[
					{
						type: 'video',
						src: '/portfolio-assets/geah-tutorial.mp4',
						alt: 'Video of the tutorial'
					},
					{
						type: 'video',
						src: '/portfolio-assets/geah-boss.mp4',
						alt: 'Video of the first boss fight'
					},
					{
						src: '/portfolio-assets/geah2.png',
						alt: 'A dwarf in a hole as a cannon ball flies overhead'
					},
					{
						src: '/portfolio-assets/geah-corridor.png',
						alt: 'A dwarf with a hammer in a corridor, getting shot at with a cannon by a small green pig'
					}
				]}
			/>
			<PortfolioPanels
				description={[
					'Level based',
					'2D adventure',
					'Platformer',
					'Built with Godot',
					'Scope: Solo project, two weeks'
				]}
				contribution={['Game design', 'Programming', 'Everything besides assets']}
				learnings={[
					'Hitstop adds a lot',
					'Charm is surprisingly cheap',
					'Godot is nice',
					'Prioritization'
				]}
				changes={[
					"I'm pretty satisfied with this one",
					'Extend with more worlds',
					'Fix the font rendering',
					'Add more music',
					'Maybe add burst movement or a parry'
				]}
			/>
			<p>
				This is my most visually appealing game so far. It took about a week or two of effort spread
				out over about a month or so. This was my assignment for a university course. The course
				started with the students following along a Godot tutorial and then adding their own stuff
				on top. Having already made a couple of games, the tutorial was a bit basic, but informative
				as this was my first game in Godot. I self-imposed additional time constraints to focus on
				efficiency over effort. I set an upper limit on how much time I would spend on the game, and
				tried to maximize what I got done in that time. I recycled a lot for the levels and spend
				most of my time on juice and polish. There is very notable hitstop and screen shake. The
				hearts in the top left corner for example pulse faster when there are fewer of them and
				pulse with a slight offset to each other.
			</p>
			<p>
				The only thing I regret about it is the self-indulgent writing that seems to creep into my
				projects when nobody is looking. If you are curious, <a
					href="https://hajhawa.itch.io/green-eggs-and-ham">you can find the game on itch.io</a
				>. Feel free to try it. For most players it takes 30 minutes to an hour to beat.
				<a href="https://github.com/haihala/VIM.MT.310-Game-Project-2"
					>Code is available on Github</a
				>.
			</p>
			<details>
				<summary>Implementation highlight: State machine</summary>
				<div class="side-by-side">
					<div>
						<p>
							Problem: Character can be in many different states. Some with animations, some
							without. How to manage that in a maintainable way?
						</p>
						<p>
							Solution: Node based state machine. As long as I've worked in Godot, I've really liked
							the nodes. I made a system where the player node has a state machine node as a child.
							The state machine then contains all of the states as children and references one in
							it's script as the active state. Each state node has a script that inherits from the
							base State script and implements any number of the provided functions. It has
							functions that get called when the state is activated or deactivated and one called
							each frame when the state is active. Any script can request a state transition, which
							will then call the state functions. Overall the system worked remarkably well and
							adding new states was very easy. I would probably not do this for 20+ states like in
							WAG, but for the eight discrete states that were in this game the system was solid.
						</p>
						<p>
							A lot of the behavior was also done outside the states. For example, the movement of
							walking was done in the player root node script, since that has to move the root
							object anyways. I probably could've moved more of the behavior to the states, but took
							a pragmatic approach and went with the path of least resistance over the theoretically
							'purest' solution. This is also something I would heavily reconsider if there were
							more states.
						</p>
						<p>
							Full disclosure: The approach is not originally mine, but I can't remember where I
							took the initial version from. I do remember heavily modifying the code, as I remember
							the original version wanted to do more in the states than I did and the noise was
							unnecessary here. It was hard to think of something <i>special</i> for this one, as it
							was a very smooth project.
						</p>
					</div>
					<img
						src="/portfolio-assets/geah-state-machine-nodes.png"
						alt="Screenshot of Godot node hierarchy of the state machine"
					/>
				</div>
			</details>
		</div>

		<div class="page">
			<h2>Mission IMPossible</h2>
			<Carousel
				elems={[
					{
						src: 'https://img.itch.zone/aW1hZ2UvMjAyOTUxOS8xMTkzNTIxMi5wbmc=/original/y5zpHo.png',
						alt: 'House elf in front of a shelf in a basement'
					},
					{
						src: 'https://img.itch.zone/aW1hZ2UvMjAyOTUxOS8xMTkzNTIwOS5wbmc=/original/lpZwk5.png',
						alt: 'House elf standing in a sink washing dishes'
					},
					{
						src: 'https://img.itch.zone/aW1hZ2UvMjAyOTUxOS8xMTkzNTIxMy5wbmc=/original/tqsHKr.png',
						alt: 'Cowboy hatted house elf running from a mannequin'
					}
				]}
			/>
			<PortfolioPanels
				description={[
					'3D stealth game',
					'With a goal to clean a house',
					'Before the resident catches you',
					'Built with Unity',
					'Scope: Team of five, two months'
				]}
				contribution={['Programming', 'Coaching', 'VFX', 'Game design']}
				learnings={[
					'Unity is surprisingly extendable',
					'Decals and animation blending',
					'The power of friendship!'
				]}
				changes={[
					'Most of the game, for example:',
					'Improve the HUD',
					'Add a model to the NPC',
					'Add more levels / progression',
					'Fix the lighting',
					'Add more interesting minigames'
				]}
			/>
			<p>
				In the game, you play as a house self that sneaks around a house doing chores. The bar on
				the left indicates how many chores you have left. Some chores required tools that start the
				game scattered around the play space. For example, you need a sponge to wash off the brown
				dirt smears (right side of picture 2). Once you've filled the bar, you have to get back to
				the place you started the level in. Originally we planned to have multiple levels, but ended
				up boiling it down to just the one. There are items besides tools, for example a coin
				similar to the one from the Hitman series and the hat worn in the third picture, which I
				think gave you a movement speed buff.
			</p>
			<p>
				This was made for the same university course as Green eggs and ham. The course had us work
				in teams of five, but unfortunately this was the second game most of us had ever made. The
				first one being following a godot tutorial with a few custom tweaks like changing the
				sprites. The course mandated that everyone had a role. I primarily wanted to be the
				programmer and secondarily to not be the project manager. I tend to take charge in these
				sorts of projects, and see this is a problem for my ability to work in teams. I deliberately
				wanted to practice delegation and giving other team members the freedom to work. In the end
				I did end up helping most of the team, including the project manager quite a bit, but still
				consider this a successful delegation exercise. The help was mostly technical stuff like
				helping team members with git, as most of them had never heard of it before. I also did a
				quick overview of how Scrum works, as the course enforced some of the rituals. Overall, I'm
				satisfied with the project, even if it doesn't really meet my personal threshold of quality.
				The kindest thing I can say is that I think we tried our best and it has some decent ideas.
				If you want to check it out, you can find <a
					href="https://uriel35.itch.io/mission-impossible">the game over on itch.io</a
				>
				and <a href="https://github.com/haihala/VIM.MT.310-Group-4">the code over at GitHub</a>.
			</p>
			<details>
				<summary>Tooling highlight: Automatic item icons</summary>
				<p>
					Problem: We have lots of items in the game. The items require HUD icons. Drawing icons by
					hand would take a lot of time.
				</p>
				<p>
					Solution: Use Unity to automate the process. The objects needed to show up in the game
					world, so we had 3D models. I built a scene that was only used in development. The scene
					had a camera, a light, and all the 3D models of the objects. I then did some editor
					scripting. The script looped over all the objects, activating them one by one, taking a
					screenshot with the camera, and saving that screenshot on disk. These screenshots were
					then used as the icons. This way if we wanted to edit the item positions in the icons, we
					could simply change the item positions in that scene and redo the screenshots. I think we
					had maybe 15 items and it took a few seconds to generate all the icons.
				</p>
				<p>
					It could've been a lot more sophisticated in terms of visuals. The items could maybe have
					a background to them to make them pop more and we did run into issues with model fidelity.
					We got the models from some asset pack that had game ready models, meaning the poly counts
					were on the lower end. Not a problem in the actual game, but when you want to shoot
					close-ups of them it becomes an issue. Some items like the sponge are literally squished
					capsules with a texture and this was really obvious in the icons. I did add some bumps to
					the sponge with a vertex shader, but it still wasn't quite what I wanted. If I had to make
					a sponge now, I wouldn't hesitate to just hop into blender and bang out a sponge.
				</p>
			</details>
		</div>

		<div class="page">
			<h2>Smaller projects</h2>

			<p>
				Some of my newer microprojects have a post on my blog. I started the blog in 2024, so it
				won't include projects before that for the most part. I'll try to make a post for every new
				Jam game or notable hyperfixation. The blog posts should have visuals, I don't want to bloat
				this page.
			</p>

			<ul>
				<li>
					<a href="/blog/squeli">Squeli</a> - Top down 2d 2-4 player pvp arena shooter weekend Jam game
				</li>
				<li>
					<a href="/blog/mankind-knew">Mankind knew</a> - A political statement / weekend game jam project.
				</li>
			</ul>

			<h3>My Dystopian Laserhell Hovercar</h3>
			<img
				src="https://img.itch.zone/aW1nLzM4NTQ2NjYucG5n/original/%2B8HF7V.png"
				alt="Poster art for 'My dystopian Laserhell hovercar'"
			/>
			<p>
				I used to partake in the yearly GMTK itch.io game jam. I've liked the themes and since it
				only takes a weekend it's pretty easy to fit into a calendar. My teaching gig schedule sadly
				overlaps with the jam, so I've been unable to attend for the past few years. In total I
				think I submitted four times, with most of them being not that great. This one I did with
				Lauri Virtanen, a fellow programmer I've known since high school. I did mostly design and
				programming with maybe a 30/70 split. Lauri did both of those, but also art and music with
				something like a 10/40/30/20 design/programming/art/music split. It has been years and I'm
				handwaving the numbers, but the gist is that I did most of of the programming and design,
				while Lauri focused more on the aesthetics.
			</p>
			<p>
				You can find
				<a href="https://hajhawa.itch.io/my-dystopian-laserhell-hovercar">the game on itch.io </a>
				and <a href="https://github.com/haihala/jambalam">the source code on Github</a>, although I
				must warn you that this is an older submission and the quality doesn't necessarily reflect
				my current skill level.
			</p>

			<h3>Teaching computer science</h3>
			<p>
				Couldn't figure out if this should go here or not, but for three years I was the head
				teacher for the summer computer science course over at
				<a href="https://matematiikkalinja.fi/">Matematiikkalinja</a>. The program is meant to teach
				people entering high school the basics of computer science. Some students are already
				competent programmers by the time the course starts, while a growing number have never
				touched a keyboard before. My role was twofold. I was lecturing and hosting exercise
				sessions, but also responsible for recruiting and managing other lecturers and TAs. I loved
				doing it and cherish all the memories I made along the way, but after the summer of 2024
				chose to give it up. I felt like I had accomplished everything I wanted and there was
				nothing left to do. Managing the chaos did cause me stress and eat into my summer vacations,
				but the primary problem was the lack of a goal. I reformed the traditionally rigid
				curriculum, taking out what was no longer useful, reforming existing materials to be more
				approachable for the students, and introducing lessons to cover traditional blind spots such
				as web development. The last year went off without a hitch, which in a weird way was a
				disappointment, as it proved I had mastered the craft to be a tad egotistical.
			</p>

			<h3>Tabletop role playing</h3>
			<p>
				In addition to digital, I'm quite fond of analog games. Board games, card games and most of
				all, tabletop role playing games are my jam. I've designed a few adventures, systems, and
				player options for them, but haven't had sufficient faith in any of them to show them to a
				crowd larger than my friends. I do like how tinkering with designs like that makes you think
				and still occasionally spend a few hours drafting something up, just to understand why the
				thing I'm trying to fix works the way it does.
			</p>
			<p>
				As of writing, I mostly play Pathfinder 2e, with occasional D&amp;D and Fate, I've also read
				through many others like Gurps and Swade, but haven't had a chance to play those yet. In
				general I prefer DMing, but that depends on the system and the group. I'm passively
				interested in rules light or more "LARP-like" games, but don't seek them out.
			</p>

			<h2>The end</h2>
			<p>
				Thanks for reading, you can get <a href="/">back to the blog</a>. If any of this seems
				helpful or interesting, get in contact:
			</p>
			<div class="padded">
				<Socials />
			</div>
		</div>
	</div>
</div>

<style>
	.root {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.scroll-icon {
		border: solid;
		border-radius: 100%;
		padding: 1rem;
		width: 2cm;
		height: 2cm;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2rem 0;
		max-width: 100vw;

		p,
		ul,
		img,
		details,
		div.padded {
			max-width: 90%;
			@media (min-width: 1280px) {
				max-width: 60rem;
			}
		}

		ul {
			width: 100%;
		}
	}

	details {
		width: 100%;
		padding: 1rem;
		border-radius: 1rem;
		background-color: color-mix(in srgb, black 10%, transparent);

		summary {
			color: var(--color-theme-2);
			font-size: 1.25rem;
		}
	}

	details:has(summary:hover) {
		background-color: color-mix(in srgb, black 20%, transparent);
		cursor: pointer;
	}

	.video-cover {
		min-height: 80vh;
		padding-top: 20vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;

		* {
			margin: 2rem;
		}
	}

	h1 {
		font-size: 2rem;
	}

	.side-by-side {
		display: flex;
		flex-direction: column;
		@media (min-width: 1280px) {
			flex-direction: row;
		}
	}
</style>
