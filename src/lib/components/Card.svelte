<script lang="ts">
	interface Props {
		link: string;
		heading: string;
		description: string | undefined;
	}

	let { link, heading, description }: Props = $props();
</script>

<a href={link}>
	<div>
		<h2>{heading}</h2>

		{#if !!description}
			<p>{description}</p>
		{/if}
	</div>
</a>

<style>
	h2 {
		height: 2em;
	}

	div {
		background-color: var(--color-bg-card);
		color: var(--color-text-card);
		border-radius: 0.5rem;
		padding: 0.01rem 1rem;
	}
</style>
