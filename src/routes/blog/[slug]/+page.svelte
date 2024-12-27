<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h1>{data.title}</h1>

<span class="centered">{data.subtitle}</span>

<article>
	<data.content />
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

	.centered {
		margin-left: auto;
		margin-right: auto;
		margin-top: -1rem;
	}
</style>
