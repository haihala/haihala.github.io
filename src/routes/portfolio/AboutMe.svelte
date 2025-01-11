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
			<li>Master of Technology</li>
			<li>
				Lead developer at Vincit, doing mostly:
				<ul>
					<li>Full stack web dev</li>
					<li>Customer communication</li>
					<li>Infrastructure, CI pipes, most of the grunt work people tend to avoid</li>
				</ul>
			</li>
			<li>Hobbyist game developer</li>
			<li>Part time programming teacher</li>
		</ul>
		<p>
			Wowee describing oneself is hard. I'm just a dude working on <a href="/projects">projects</a>.
			I do engineering (whatever that is) for a living and develop games to live. Most of my
			endeavors worth writing about end up on
			<a href="/blog">my blog</a>. The rest of this page is a list of cherry-picked game projects
			that hopefully showcase I can indeed make those.
		</p>
		List of skills as well as my summarized employment history can be found in my
		<a href="/portfolio/cv-eero-haihala.pdf" target="_blank">printable resume</a>. If you're already
		interested, you can read more and get in touch via:
		<Socials />
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
