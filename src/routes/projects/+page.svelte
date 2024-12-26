<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import CardGrid from '$lib/components/CardGrid.svelte';

	interface Props {
		data: ComponentProps<typeof CardGrid>;
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Projects" />
</svelte:head>

<section>
	<h1>Projects</h1>
	<p>
		List of ongoing projects that I'm working on. I have a bunch of smaller projects that won't get
		a project page of their own.
	</p>
	<CardGrid {...data} />
</section>
