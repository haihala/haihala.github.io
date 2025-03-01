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
				<video loop muted class:hidden={i !== active} autoplay={i === active} src={elem.src}>
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
		width: 100%;
	}

	.images {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
	}

	img,
	video {
		width: 100%;
		max-width: 100vw;
		object-fit: cover;
	}

	.hidden {
		display: none;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 100%;
		gap: 0.2rem;
	}

	.radio-visual {
		border-radius: 100%;
		border: none;

		width: 0.9cm;
		height: 0.9cm;

		background-color: var(--color-bg-light);

		&:hover {
			opacity: 50%;
		}
	}

	.selected {
		background-color: var(--color-theme-2);
		opacity: 100%;
	}

	.cycler {
		width: 1cm;
		height: 1cm;
		font-size: 1.5rem;
		background-color: transparent;
		color: var(--text-color);
		display: flex;
		align-items: center;
		border-radius: 100%;
		border: solid;

		&:hover {
			color: var(--color-theme-2);
			border-color: var(--color-theme-1);
		}

		&:first-of-type {
			margin-right: 1rem;
		}

		&:last-of-type {
			margin-left: 1rem;
		}
	}
</style>
