<script lang="ts">
	import './styles.css';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	interface Props {
		children?: import('svelte').Snippet;
	}
	if ($page.url.pathname === '/') {
		redirect(308, '/portfolio');
	}

	const { children }: Props = $props();

	const noFrame = $derived(['/zombie-game', '/portfolio'].includes($page.url.pathname));
</script>

{#if noFrame}
	{@render children?.()}
{:else}
	<div class="app">
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
