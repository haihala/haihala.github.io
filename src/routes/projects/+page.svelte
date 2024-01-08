<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import CardGrid from '$lib/components/CardGrid.svelte';

	export let data: ComponentProps<CardGrid>;
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Projects" />
</svelte:head>

<section>
	<h1>Projects</h1>
	<p>
		List of ongoign projects that I'm working on. There are shorter natured things that won't get a
		project of their own.
	</p>
	<CardGrid {...data} />
</section>
