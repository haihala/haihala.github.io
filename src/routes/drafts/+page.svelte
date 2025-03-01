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
	<h1>Drafts</h1>
	<p>
		These posts are still cooking. They won't show up on the <a href="/blog">post list</a>, nor in
		<a href={feed}>RSS feed</a>. Svelte won't include posts in the build that are never linked to,
		which is why this page exists.
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
