<script lang="ts">
	import { website } from '../constants';
	import BigCard from '$lib/components/BigCard.svelte';
	const feed = `${website}/rss.xml`;

	const { data } = $props();
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Blog" />
</svelte:head>

<section>
	<h1>Blog</h1>
	<p>My blog posts in chronological order (latest first)</p>
	<p>
		RSS feed available at <a href={feed}>{feed}</a>
	</p>

	{#each data.posts as post}
		<BigCard
			title={post.title}
			subtitle={post.tagline}
			link={post.link}
			wordCount={post.wordCount}
			pubDate={post.createdAt}
		/>
	{/each}
</section>
