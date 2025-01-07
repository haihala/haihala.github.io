<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h1>{data.title}</h1>

<span class="centered">{data.subtitle}</span>

{#if data.updatedAt && data.updatedAt !== data.createdAt}
	<div class="edit-note">
		<span>
			<Icon icon="material-symbols:info" />
			This post was updated after original publication
		</span>
		<br />
		Originally published: {data.createdAt}
		<br />
		Latest edit happened: {data.updatedAt}
	</div>
{/if}

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

	.edit-note {
		margin-top: 1rem;
		padding: 1rem;
		border-left: solid var(--color-theme-1) 0.5rem;
		background-color: rgba(0, 0, 0, 0.2);

		span {
			font-size: 2rem;
			line-height: 4rem;
		}
	}
</style>
