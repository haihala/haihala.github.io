<script lang="ts">
	import Header from './Header.svelte';
	import './styles.css';
	import { page } from '$app/stores';
	interface Props {
		children?: import('svelte').Snippet;
	}

	const { children }: Props = $props();

	const noFrame = $derived(['/zombie-game', '/portfolio'].includes($page.url.pathname));
</script>

{#if noFrame}
	{@render children?.()}
{:else}
	<div class="app">
		<Header />

		<main>
			{@render children?.()}
		</main>
	</div>

	<style>
		.app {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
		}

		main {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 1rem;
			width: 100%;
			max-width: 64rem;
			margin: 0 auto;
			box-sizing: border-box;
		}
	</style>
{/if}
