<script lang="ts">
	export let link: string;
	export let heading: string;
	export let description: string | undefined;
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
	div {
		background-color: var(--color-text);
		color: var(--color-bg-base);
		border-radius: 1rem;
		padding: 0.01rem 1rem;
	}
</style>
