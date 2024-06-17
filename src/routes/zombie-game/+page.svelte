<script lang="ts">
	import { onMount } from 'svelte';
	import { init, tick } from './zombie-game';

	onMount(async () => {
		const { app, input_map, game_world } = await init();

		app.ticker.add((time) => {
			tick(time, app, input_map, game_world);
		});
	});
</script>
