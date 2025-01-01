<script lang="ts">
	import Icon from '@iconify/svelte';
	let { elems }: { elems: { type?: 'video'; src: string; alt: string }[] } = $props();
	let active = $state(0);
	const radioButtons = $derived(elems.map((_, i) => i === active));
</script>

<div class="layout">
	<div class="images">
		{#each elems as elem, i}
			{#if elem.type === 'video'}
				<video loop muted class:hidden={i !== active} autoplay={i === active}>
					<source src={elem.src} type="video/mp4" />
					<p>{elem.alt}</p>
				</video>
			{:else}
				<img class:hidden={i !== active} src={elem.src} alt={elem.alt} />
			{/if}
		{/each}
	</div>
	<div class="controls">
		<button
			class="cycler"
			onclick={() => {
				if (active === 0) active = elems.length - 1;
				else active -= 1;
			}}
			aria-label="previous image"
		>
			<Icon icon="material-symbols:chevron-backward" />
		</button>
		<div>
			{#each radioButtons as selected, i}
				<button
					type="button"
					class="radio-visual"
					class:selected
					onclick={() => (active = i)}
					aria-label="show image {i + 1}"
				>
				</button>
			{/each}
		</div>
		<button
			class="cycler"
			onclick={() => {
				active = (active + 1) % elems.length;
			}}
			aria-label="next image"
		>
			<Icon icon="material-symbols:chevron-forward" />
		</button>
	</div>
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		height: 100%;
	}

	.images {
		display: flex;
		align-items: center;
	}

	img,
	video {
		width: 100%;
		object-fit: cover;
	}

	.hidden {
		display: none;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		max-width: 100%;
	}

	.radio-visual {
		content: '';
		padding: 0.8rem;
		margin: 0.5rem;
		border-radius: 100%;
		border: none;

		background-color: var(--color-bg-card);
	}

	.radio-visual:hover {
		opacity: 50%;
	}

	.selected {
		background-color: var(--color-theme-2);
		opacity: 100%;
	}

	.cycler {
		background-color: var(--color-bg-card);
		border: none;
		font-size: 2rem;
		background-color: transparent;
		color: var(--text-color);
		display: flex;
		align-items: center;
		margin: 0 1rem;
		border-radius: 100%;
		border: solid;

		&:hover {
			color: var(--color-theme-2);
			border-color: var(--color-theme-1);
		}
	}
</style>
