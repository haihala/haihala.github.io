<script lang="ts">
	type Props = {
		description: string[];
		contribution: string[];
		focus: string[];
		takeaways: string[];
	};

	const { description, contribution, focus, takeaways }: Props = $props();
</script>

<div class="container">
	<div class="box description">
		<h3>What is it?</h3>
		<ul>
			{#each description as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
	<div class="box contribution">
		<h3>What did I do?</h3>
		<ul>
			{#each contribution as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
	<div class="box focus">
		<h3>What did I focus on?</h3>
		<ul>
			{#each focus as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
	<div class="box takeaway">
		<h3>What was my takeaway?</h3>
		<ul>
			{#each takeaways as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.container {
		margin-top: 2rem;

		display: grid;
		gap: 1rem;
		justify-content: center;

		grid-template-columns: repeat(1, 1fr);
		@media (min-width: 720px) {
			grid-template-columns: repeat(2, 1fr);
		}
		@media (min-width: 1280px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.box {
		border-radius: 1rem;
		padding: 2rem;
	}

	ul {
		margin: 0;
		padding-left: 1rem;
	}

	.description {
		background-color: #ffa500;
	}
	.contribution {
		background-color: #ff5349;
	}
	.focus {
		background-color: #0d98ba;
	}
	.takeaway {
		background-color: #50c878;
	}
</style>
