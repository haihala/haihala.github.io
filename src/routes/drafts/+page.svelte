<script lang="ts">
	import { website } from '../constants';
	import { draft_posts } from '$lib/load_posts';
	import CardList from '$lib/components/CardList.svelte';
	const feed = `${website}/rss.xml`;
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
	<CardList posts={draft_posts} />
</section>
