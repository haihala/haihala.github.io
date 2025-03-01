<script lang="ts">
	import type { Article } from '$lib/load_posts';
	import BigCard from './BigCard.svelte';

	const { posts }: { posts: Article[] } = $props();
</script>

{#each posts as post}
	<BigCard
		title={post.title}
		subtitle={post.tagline}
		link={post.link}
		wordCount={post.wordCount}
		pubDate={post.createdAt}
	/>
{/each}
