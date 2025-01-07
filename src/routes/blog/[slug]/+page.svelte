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
		<div>
			<Icon icon="material-symbols:info" />
			This post was updated after original publication
		</div>
		<p>
			Originally published: {data.createdAt}
		</p>
		<p>
			Latest edit happened: {data.updatedAt}
		</p>
	</div>
{/if}

<article>
	<data.content />
</article>

<footer>
	<hr />
	<p>This post was originally released on {data.createdAt}</p>
	{#if data.similar.length > 0}
		<p>You may also like:</p>
		<ul>
			{#each data.similar as similar}
				<li>
					<a href={similar.link}>{similar.title}</a>
				</li>
			{/each}
		</ul>
	{/if}
</footer>

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
		padding: 0 1rem;

		--border-color: color-mix(in srgb, var(--color-theme-1) 50%, transparent);
		border-left: solid var(--border-color) 0.5rem;
		background-color: rgba(0, 0, 0, 0.2);

		div {
			margin-top: 1rem;
			font-size: 1.5rem;
			display: flex;
			gap: 1rem;
			align-items: center;
		}
	}
</style>
