<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		dirs: number[];
	};

	const { dirs }: Props = $props();
	const elems = dirs
		.map((dir) => {
			switch (dir) {
				case 1:
					return 'ix:arrow-diagonal-bottom-left';
				case 2:
					return 'ix:arrow-down';
				case 3:
					return 'ix:arrow-diagonal-bottom-right';
				case 4:
					return 'ix:arrow-left';
				case 5:
					return 'ix:arrow-ix:circle-dot';
				case 6:
					return 'ix:arrow-right';
				case 7:
					return 'ix:arrow-diagonal-top-left';
				case 8:
					return 'ix:arrow-up';
				case 9:
					return 'ix:arrow-diagonal-top-right';
			}
		})
		.filter((x) => !!x);
</script>

{#each elems as elem}
	<Icon icon={elem} inline />
{/each}
