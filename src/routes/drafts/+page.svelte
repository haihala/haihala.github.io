<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import CardGrid from '$lib/components/CardGrid.svelte';
	import { website } from '../constants';
	let feed = `${website}/rss.xml`;

	interface Props {
		data: ComponentProps<typeof CardGrid>;
	}

	let { data }: Props = $props();
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
	<CardGrid {...data} />
</section>
