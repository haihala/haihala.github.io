<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article>
	<svelte:component this={data.content} />
</article>
