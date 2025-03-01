<script lang="ts">
	import CardList from '$lib/components/CardList.svelte';
	import { public_posts } from '$lib/load_posts';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Landing page" />
</svelte:head>

<section>
	<h1>Welcome</h1>

	<p>
		This is <a href="/portfolio">my</a> home page where I can put things I want to show to people.
	</p>

	<p>"Fresh" off the presses:</p>
	<CardList posts={public_posts.slice(0, 3)} />
	<p>Some of my favorites:</p>
	<CardList posts={public_posts.filter((post) => post.favourite)} />
</section>
