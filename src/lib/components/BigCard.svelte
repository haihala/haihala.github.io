<script lang="ts">
	interface Props {
		title: string;
		subtitle: string;
		wordCount: number;
		link: string;
		pubDate: Date;
	}

	const { title, subtitle, wordCount, link, pubDate }: Props = $props();
</script>

<div class="wrapper">
	<a href={link}>
		<h2>{title}</h2>
		<h3>{subtitle}</h3>
		<div>
			<span
				>About {parseFloat(wordCount.toPrecision(1))}
				words</span
			>
			<span>Published {pubDate.toLocaleDateString()}</span>
		</div>
	</a>
</div>

<style>
	.wrapper {
		width: 100%;
		margin: 0.5rem;
	}

	a {
		padding: 1rem;

		border: solid black;
		border-radius: 0.5rem;

		background-color: rgba(255, 255, 255, 0.1);

		display: grid;
		grid-template-columns: auto;
		@media only screen and (min-width: 600px) {
			grid-template-columns: auto auto;
		}
		justify-content: space-between;
		align-items: center;
	}

	a:not(:hover) {
		color: inherit;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		@media only screen and (min-width: 600px) {
			grid-area: 1 / 2;
		}
	}
</style>
