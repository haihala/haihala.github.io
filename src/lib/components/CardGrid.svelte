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
		justify-content: center;
		width: 100%;

		grid-template-columns: repeat(1, 1fr);
		@media (min-width: 720px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (min-width: 1080px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
