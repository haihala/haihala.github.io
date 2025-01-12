<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import Socials from './Socials.svelte';
</script>

<h2>Who this?</h2>
<div class="layout">
	<Carousel
		elems={[
			{
				src: '/portfolio/face-bw.jpg',
				alt: 'My black and white portrait, posed like Steve Jobs'
			},
			{
				src: '/portfolio/face-outside.jpg',
				alt: 'My portrait outside in a coat and scarf'
			},
			{
				src: '/portfolio/face-pf-dm-cropped.jpg',
				alt: 'Me DMing pathfinder for my weekly group'
			}
		]}
	/>
	<div>
		<b>Eero Häihälä</b>, the short version goes something like this:
		<ul>
			<li>Generalist programmer</li>
			<li>Master of Science (Technology)</li>
			<li>
				Lead developer at Vincit, doing mostly:
				<ul>
					<li>Full stack web dev</li>
					<li>In direct customer communication</li>
					<li>Infrastructure, CI pipes, most of the grunt work people tend to avoid</li>
				</ul>
			</li>
			<li>Hobbyist game developer</li>
			<li>Part time programming teacher</li>
		</ul>
		<p>
			Wowee describing oneself is hard. I'm just a dude working on <a href="/projects">projects</a>.
			I do engineering (whatever that is) for a living and develop games to live. Most of my what I
			do and deem worth writing about end up on
			<a href="/blog">my blog</a>. The rest of this page is a list of cherry-picked game projects
			that hopefully showcase I can indeed make those.
		</p>
		<p>
			I actively seek out new things to do, use and experience, to the point of having those listed
			in my project tracking app. Most of the projects here as well as the website itself have
			gotten started simply because I wanted to try something new. A natural consequence of doing a
			bit of this and that is having a lot to draw from when I stumble onto something new. After
			trying a few organizational structures, project management systems, game engines, programming
			languages, and frameworks picking up new ones is a quick process. I primarily want to learn by
			doing, but a close second is listening to someone who has a lot of experience works for me
			really well. I listen to a lot of conference talks and podcast-adjacent stuff for example.
			There is a <a href="https://youtu.be/o8NPllzkFhE?si=bXSuFE4mqXklATY8&t=984"
				>TED interview where Linus Torvalds</a
			> says something that resonates with me:
		</p>
		<blockquote>
			<p>
				I'm perfectly happy with all the people who are walking around and just staring at the
				clouds and looking at the stars and saying, "I want to go there.", but I'm looking at the
				ground, and I want to fix the pothole that's right in front of me before I fall in.
			</p>
		</blockquote>
		<p>
			I heavily relate with Torvalds. While talking about design with my friends, I'm often the one
			bringing the conversation back down to earth. I genuinely like thinking about the mundane
			problems and how to best tackle them. Despite my best efforts, this attention to details still
			every now and then comes across as dismissive or critical to my more idea-oriented friends. I
			don't want to belittle or put others down, but to help them create the best version of what
			they are making. If you have a game you think I could make better, do get in touch:
		</p>
		<Socials />
		<p>
			You can find a list of my skills, as well as my summarized employment history in my
			<a href="/portfolio/cv-eero-haihala.pdf" target="_blank">printable resume</a>.
		</p>
	</div>
</div>

<style>
	.layout {
		display: grid;
		gap: 2rem;
		max-width: 80%;
		grid-template-columns: repeat(1, 1fr);
		@media (min-width: 1280px) {
			max-width: 70vw;
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
