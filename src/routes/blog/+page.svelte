<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import CardGrid from '$lib/components/CardGrid.svelte';

	export let data: ComponentProps<CardGrid>;
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Blog" />
</svelte:head>

<section>
	<h1>Blog</h1>
	<p>Under construction, will include my blog posts in chronological order</p>
	<CardGrid {...data} />
</section>
