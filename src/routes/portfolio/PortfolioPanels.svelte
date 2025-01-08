<script lang="ts">
	type Props = {
		description: string[];
		contribution: string[];
		learnings: string[];
		changes: string[];
	};

	const { description, contribution, learnings, changes }: Props = $props();
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
	<div class="box learnings">
		<h3>What did I learn?</h3>
		<ul>
			{#each learnings as item}
				<li>{item}</li>
			{/each}
		</ul>
	</div>
	<div class="box changes">
		<h3>How would I change it?</h3>
		<ul>
			{#each changes as item}
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

		width: 90%;
		grid-template-columns: repeat(1, 1fr);
		@media (min-width: 720px) {
			grid-template-columns: repeat(2, 1fr);
			width: auto;
		}
		@media (min-width: 1280px) {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.box {
		border-radius: 1rem;
		padding: 0 2rem;
		padding-bottom: 1rem;
		color: var(--color-text-card);
	}

	ul {
		margin: 0;
		padding-left: 1rem;
	}

	.description {
		background-color: #ffbb33;
	}
	.contribution {
		background-color: #f17e84;
	}
	.learnings {
		background-color: #44ccee;
	}
	.changes {
		background-color: #50c878;
	}
</style>
