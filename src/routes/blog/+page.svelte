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
	<h1>Blog</h1>
	<p>My blog posts in chronological order (latest first)</p>
	<p>
		RSS feed available at <a href={feed}>{feed}</a>
	</p>
	<CardGrid {...data} />
</section>
