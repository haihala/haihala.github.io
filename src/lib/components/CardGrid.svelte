<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Card from './Card.svelte';

	export let posts: ComponentProps<Card>[];
</script>

<div class="grid">
	{#each posts as post}
		<Card {...post} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
		justify-content: center;
		width: 100%;
	}
</style>
