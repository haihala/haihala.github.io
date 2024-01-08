<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<svelte:component this={data.content} />
</article>

{#if data.similar.length > 0}
	<footer>
		<hr />
		<p>You may also like:</p>
		<ul>
			{#each data.similar as similar}
				<li>
					<a href={similar.link}>{similar.title}</a>
				</li>
			{/each}
		</ul>
	</footer>
{/if}

<style>
	footer {
		margin-top: auto;
	}
</style>
