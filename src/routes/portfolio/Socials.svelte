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

<div class="socials">
	{#each socials as social}
		<a href={social.link}>
			<img src={social.image} alt="{social.text} logo" />
			{social.text}
		</a>
	{/each}
</div>

<style>
	img {
		height: 1.5rem;
	}

	div.socials {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		max-width: 100%;
		margin-top: 1rem;

		& > a {
			display: flex;
			gap: 0.3rem;
			align-items: center;
		}
	}
</style>
