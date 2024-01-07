<script lang="ts">
	import { goto } from '$app/navigation';

	export let link: string;
	export let heading: string;
	export let description: string | undefined;
</script>

<button
	on:click={() => {
		goto(link);
	}}
>
	<h2>{heading}</h2>

	{#if !!description}
		<p>{description}</p>
	{/if}
</button>
