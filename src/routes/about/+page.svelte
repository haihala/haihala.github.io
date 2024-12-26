<script lang="ts">
	type Social = {
		link: string;
		image: string;
		text: string;
	};
	const socials: Social[] = [
		{
			link: 'https://github.com/haihala',
			text: 'Github',
			image: 'https://cdn-icons-png.flaticon.com/512/25/25231.png'
		},

		{
			link: 'https://bsky.app/profile/haihala.bsky.social',
			text: 'Bluesky',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bluesky_Logo.svg/1159px-Bluesky_Logo.svg.png'
		},
		{
			link: 'https://www.linkedin.com/in/eero-haihala/',
			text: 'Linkedin',
			image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
		},
		{
			link: 'https://hajhawa.itch.io/',
			text: 'Itch.io',
			image: 'https://static-00.iconduck.com/assets.00/itch-io-icon-2048x2048-i6hzclad.png'
		},
		{
			link: 'mailto:eero.haihala@gmail.com',
			text: 'Email',
			image: 'https://pngimg.com/d/email_PNG11.png'
		}
	];
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About me" />
</svelte:head>

<section>
	<h1>About me</h1>

	<p>
		Wowee describing oneself is hard. I'm just a dude working on <a href="/projects">projects</a>.
		Graduated in the spring of 2024 with a masters in technology. I do engineering (whatever that
		is) for a living and develop games to live. Most of my endeavors worth writing about end up at
		<a href="/blog">my blog</a>.
	</p>

	<div class="socials">
		You can get in touch via:
		{#each socials as social}
			<a href={social.link}>
				<img src={social.image} alt="{social.text} logo" />
				{social.text}
			</a>
		{/each}
	</div>
</section>

<style>
	img {
		height: 1.5rem;
	}

	div.socials {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		& > a {
			padding-left: 1rem;
			display: flex;
			gap: 0.3rem;
			align-items: center;
		}
	}
</style>
