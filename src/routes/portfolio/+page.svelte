<script>
	import Carousel from '$lib/components/Carousel.svelte';
	import AboutMe from './AboutMe.svelte';
	import BackgroundVideo from './BackgroundVideo.svelte';
	import PortfolioPanels from './PortfolioPanels.svelte';
	import Socials from './Socials.svelte';
</script>

<BackgroundVideo />

<div class="root">
	<div>
		<div class="video-cover">
			<h1>One of those pretentious portfolios with a video in the background</h1>
			<p>Scroll down to read more</p>
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
					'Built with Bevy and Rust'
				]}
				contribution={['Game design', 'Programming', 'Animations', 'Modeling', 'Art', 'SFX']}
				focus={['Everything', 'So pretty much nothing']}
				takeaways={[
					'Lots of hard lessons',
					'Fighting games are hard',
					'Rollback netcode is hard',
					'3D can be hard',
					'ECS is a double edged sword',
					'Rust mindset shift is awesome'
				]}
			/>
			<p>
				When I was younger I had a tendency to oscillate between projects that are way too big to
				accomplish before I lost interest and projects that were way too small for me to ever get
				interested in. Originally in 2021 this was my best attempt at landing in the goldilocks zone
				between the two extremes. I was getting into fighting games at the time with <a
					href="https://www.guiltygear.com/ggst/">Guilty Gear: Strive</a
				>. One of the things that consistently motivates me is when I simultaneously like and
				dislike something. In some ways, GGST is fantastic (art, music, rollback netcode), but in
				others it was horrendous. My list of gripes changes over time, but as of writing it includes
				but is not limited to the lobby system, loading times, unintuitive legacy mechanics,
				emphasis on block pressure and the corresponding de-emphasis on neutral and several specific
				character designs.
			</p>
			<p>
				The elevator pitch, is that it's a relatively simple fighting game, that gates the
				complexity behind an item shop, similarly to mobas. This was in part inspired by how several
				moba players told me they thought fighting games were too difficult, despite them playing a
				game that is an order of magnitude more complex in some ways. The shop spreads out the
				cognitive load and allows the players to take it at their own pace. It also makes theory
				crafting not only accessible, but encouraged for low to mid level players.
			</p>
			<p>
				Unfortunately it doesn't screenshot that well. In terms of programming it's way more
				impressive, but visually it's less eye-catching. The UI especially is very early on and is
				not representative of the game. If you want to read more,
				<a href="/blog/wag-intro">I tend to blog a lot about it</a>. Some of the posts include
				videos. I really tried to keep this concise, but if prompted can talk your ear off about it.
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
				it must be deterministic, which means the system execution order must be deterministic,
				which means it must be dictated by hand, which is not as ergonomic as most things in Bevy.
				For example, I would occasionally have to dive into the guts of Bevy itself to figure out
				when some built-in systems execute, just so I can specify my own around them.
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
				focus={['Microinteractions', 'Juice', 'Efficient time use']}
				takeaways={[
					'Hitstop adds a lot',
					'Charm is surprisingly cheap',
					'Godot is nice',
					'Prioritization'
				]}
			/>
			<p>
				This is my most visually appealing game so far. It took about a week of effort spread out
				over about a month or so. It was a part of a game project course in school. The course
				started with the students following along a Godot tutorial, which was a bit basic for me at
				that point, having already made a couple of games. I self-imposed additional time
				constraints. I set an upper limit on how much time I would spend on the game, and tried to
				maximize what I got done in that time. I recycled a lot for the levels and spend most of my
				time on juice. The only thing I regret about it is the self-indulgent writing that seems to
				creep into my projects when nobody is looking.
			</p>
			<p>
				If you are curious, <a href="https://hajhawa.itch.io/green-eggs-and-ham"
					>you can find the game on itch.io</a
				>. Feel free to try it, it should take about an hour to beat.
				<a href="https://github.com/haihala/VIM.MT.310-Game-Project-2"
					>Code is available on Github</a
				>
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
					'Before the resident of the house catches you',
					'Built with Unity'
				]}
				contribution={['Programming', 'Coaching', 'VFX', 'Game design']}
				focus={['Working in a team', 'Delegation', 'Creating tooling']}
				takeaways={[
					"Output doesn't scale linearly with team size",
					'Compassion and patience are indispensable'
				]}
			/>
			<p>
				Like Green eggs and ham, this was a game I made for the university project course. Unlike
				that one, this was made in a group with four other people. Unfortunately this was the second
				game most of us had ever made, with the first one being mostly following a godot tutorial.
			</p>
			<p>
				The game is a stealth game where you sneak about a house doing chores. The bar on the left
				is a progress bar that shows how many chores you have left. Some tools required tools you
				would need to find in the world. For example, you need a sponge to wash off the brown dirt
				smears (right side of picture 2). We added stealth game classics like the coin from Hitman,
				a sound and vision based detection system, patrol routes and stuff like that. The hat
				(picture 3) gave you a passive movement speed buff.
			</p>
			<p>
				The course mandated that everyone had a role. One of programmer, game designer, artist,
				project manager and so on. I wanted to be the programmer, so I intentionally dodged the role
				of project manager. I did end up helping most of the team, including the project manager
				quite a bit, but overall consider this a successful delegation. For most of the team, this
				was the first time they had ever used git or any type of a project tracking tool (I think we
				ended up with shortcut or trello), which created some friction. Overall I'm satisfied with
				the project, although it doesn't really meet my personal threshold of quality. It's not that
				appealing visually and the play space is not great. One of the main communication problems
				was between the artist who also designed the level and the rest of the team, which lead us
				to cutting some corners. If you want to check it out, you can find <a
					href="https://uriel35.itch.io/mission-impossible">the game over on itch.io</a
				>.
			</p>
		</div>

		<div class="page">
			<h2>Smaller projects</h2>
			<img
				src="https://img.itch.zone/aW1nLzM4NTQ2NjYucG5n/original/%2B8HF7V.png"
				alt="Poster art for 'My dystopian Laserhell hovercar'"
			/>
			<p>
				I used to partake in the yearly GMTK itch.io game jam. Sometimes alone, sometimes with a
				friend. In total I think I submitted four times, most of them being not that great. The past
				few years, the part time teaching has unfortunately overlapped with the GMTK jam timings,
				but I'll try to attend again in 2025. This was one of those submissions I did with Lauri
				Virtanen, a fellow programmer I've known since high school.
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
				<a href="https://matematiikkalinja.fi/">Matematiikkalinja</a>. The program is meant for
				people entering high school and the goal is to teach them the basics of computer science.
				Some students are already competent programmers by the time they enter the classroom, while
				a growing group have never touched a keyboard before. My role was twofold. I was lecturing
				and hosting exercise sessions, but also responsible for recruiting others to host lectures
				on their areas of expertise or work as teaching assistants. I loved doing it and cherish all
				the memories I made along the way, but after the summer of 2024 chose to give it up. I felt
				like I had accomplished all the changes I wanted to see and had nothing left to do. It did
				cause me stress and eat into my summer vacations, but the primary problem was the lack of a
				goal to strive for. I reformed the traditionally unchanged curriculum, taking out what was
				no longer useful and introducing lessons to cover traditional blind spots such as web
				development.
			</p>

			<h3>Tabletop role playing</h3>
			<p>
				In addition to digital, I'm quite fond of analog games like board games, card games and most
				of all, tabletop role playing games. I've designed a few adventures, systems, and player
				options. I haven't had sufficient faith in any of them to show them to a crowd larger than
				my friends, but I do like how tinkering with designs like that makes you think.
			</p>
			<p>
				As of writing, I mostly play Pathfinder 2e, with occasional D&amp;D and Fate, I've also read
				through many others like Gurps and Swade, but haven't had a chance to play those yet. In
				general I prefer DMing, but that depends on the system and the group.
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

	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2rem 0;
		max-width: 100vw;

		p,
		img,
		div.padded {
			max-width: 80%;
			@media (min-width: 1280px) {
				max-width: 60rem;
			}
		}
	}

	.video-cover {
		min-height: 80vh;
		padding-top: 20vh;
		display: flex;
		flex-direction: column;
		align-items: center;

		* {
			margin: 2rem;
		}
	}

	h1 {
		font-size: 2rem;
	}
</style>
