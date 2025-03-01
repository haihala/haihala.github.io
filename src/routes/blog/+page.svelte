<script lang="ts">
	import { website } from '../constants';
	import { public_posts } from '$lib/load_posts';
	import CardList from '$lib/components/CardList.svelte';
	const feed = `${website}/rss.xml`;
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

	<CardList posts={public_posts} />
</section>
