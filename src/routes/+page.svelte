<script lang="ts">
	import CardGrid from '$lib/components/CardGrid.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Landing page" />
</svelte:head>

<section>
	<h1>Welcome</h1>

	<p>
		This is <a href="/about">my</a> home page where I can put things I want to show to people. Some of
		my favoutites include:
	</p>

	<CardGrid posts={data.favourites} />
</section>
