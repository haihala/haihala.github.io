<script lang="ts">
	import BigCard from '$lib/components/BigCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Landing page" />
</svelte:head>

<section>
	<h1>Welcome</h1>

	<p>
		This is <a href="/portfolio">my</a> home page where I can put things I want to show to people.
	</p>

	<p>"Fresh" off the presses:</p>
	{#each data.newest as post}
		<BigCard
			title={post.title}
			subtitle={post.tagline}
			link={post.link}
			wordCount={post.wordCount}
			pubDate={post.createdAt}
		/>
	{/each}

	<p>Some of my favorites:</p>
	{#each data.favourites as post}
		<BigCard
			title={post.title}
			subtitle={post.tagline}
			link={post.link}
			wordCount={post.wordCount}
			pubDate={post.createdAt}
		/>
	{/each}
</section>
