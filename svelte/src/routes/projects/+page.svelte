<script>
	import CardGrid from '$lib/components/CardGrid.svelte';
	export let data;
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="description" content="Projects" />
</svelte:head>

<section>
	<h1>Projects</h1>
	<p>Under construction, will include my projects with relevant blog posts attached</p>
	<CardGrid {...data} />
</section>
