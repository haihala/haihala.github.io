<script>
	import Carousel from '$lib/components/Carousel.svelte';
	import Icon from '@iconify/svelte';
	import AboutMe from './AboutMe.svelte';
	import BackgroundVideo from './BackgroundVideo.svelte';
	import PortfolioPanels from './PortfolioPanels.svelte';
	import Socials from './Socials.svelte';
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
						src: '/portfolio/wag-combo.mp4',
						alt: 'Video of a combo in a juggle fighting game'
					},
					{
						type: 'video',
						src: '/portfolio/wag-round-flow.mp4',
						alt: 'Fighting game round ends, a shop fills the screen, lots of time is spent twiddling through the options, new round begins'
					},
					{
						src: '/portfolio/wag-menu.png',
						alt: 'Main menu of Whoops! All grapplers'
					},
					{
						src: '/portfolio/wag-sharpen.png',
						alt: 'Female character running her hand over a katana, sharpening it'
					},
					{
						src: '/portfolio/wag-shop.png',
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
					'Still in active development'
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
		</div>

		<div class="page">
			<h2>Green eggs and ham</h2>
			<Carousel
				elems={[
					{
						type: 'video',
						src: '/portfolio/geah-tutorial.mp4',
						alt: 'Video of the tutorial'
					},
					{
						type: 'video',
						src: '/portfolio/geah-boss.mp4',
						alt: 'Video of the first boss fight'
					},
					{
						src: '/portfolio/geah2.png',
						alt: 'A dwarf in a hole as a cannon ball flies overhead'
					},
					{
						src: '/portfolio/geah-corridor.png',
						alt: 'A dwarf with a hammer in a corridor, getting shot at with a cannon by a small green pig'
					}
				]}
			/>
			<PortfolioPanels
				description={['Level based', '2D adventure', 'Platformer', 'Built with Godot']}
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
					'Built with Unity'
				]}
				contribution={['Programming', 'Coaching', 'VFX', 'Game design']}
				learnings={[
					'Unity is surprisingly extendable',
					'Decals and animation blending',
					'The power of friendship!'
				]}
				changes={[
					'Add a model to the NPC',
					'Add more levels / progression',
					'Fix the lighting',
					'Improve the HUD'
				]}
			/>
			<p>
				Like Green eggs and ham, this was made for the same university course. Unlike that one, this
				was made in a group with four other people. Unfortunately this was the second game most of
				us had ever made, with the first one being mostly following a godot tutorial and then
				changing a few assets, maybe editing a tilemap.
			</p>
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
				The course mandated that everyone had a role. I wanted to be the programmer, so I
				intentionally dodged the role of project manager. In the end I did end up helping most of
				the team, including the project manager quite a bit, but overall consider this a successful
				delegation. For most of the team, this was the first time they had ever used git or any type
				of a project tracking tool (I think we ended up with shortcut, but it could've been trello).
				Overall I'm satisfied with the project, although it doesn't really meet my personal
				threshold of quality. It's not that appealing visually or mechanically. The kindest thing I
				can say is that I think we tried our best and it has some decent ideas. If you want to check
				it out, you can find <a href="https://uriel35.itch.io/mission-impossible"
					>the game over on itch.io</a
				>
				and <a href="https://github.com/haihala/VIM.MT.310-Group-4">the code over at GitHub</a>.
			</p>
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
			</ul>

			<h3>My Dystopian Laserhell Hovercar</h3>
			<img
				src="https://img.itch.zone/aW1nLzM4NTQ2NjYucG5n/original/%2B8HF7V.png"
				alt="Poster art for 'My dystopian Laserhell hovercar'"
			/>
			<p>
				I used to partake in the yearly GMTK itch.io game jam. Sometimes alone, sometimes with a
				friend. In total I think I submitted four times, most of them being not that great. My
				teaching gig schedule sadly overlaps with the jam, so I've been unable to attend for the
				past few years. This was one of those submissions I did with Lauri Virtanen, a fellow
				programmer I've known since high school. I did mostly design and programming with maybe a
				30/70 split. Lauri did both of those, but also art and music with something like a
				10/40/30/20 split between design/programming/art/music. It has been years and I'm handwaving
				the numbers, but the gist is that I did most of of the programming and design, while Lauri
				focused more on the aesthetics.
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
				Thanks for reading, you can get <a href="/">back to the blog</a> by clicking that link. If any
				of this seems helpful or interesting, get in contact:
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
</style>
