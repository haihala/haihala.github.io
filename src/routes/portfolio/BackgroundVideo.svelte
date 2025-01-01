<script>
	const videos = [
		'/portfolio/wag-combo.mp4',
		'portfolio/geah-tutorial.mp4',
		'/portfolio/dickbone.mp4'
	];

	let index = $state(0);
	const playing = $derived(videos[index]);
</script>

<video
	autoplay
	muted
	src={playing}
	onended={() => {
		index = (index + 1) % videos.length;
	}}
>
</video>

<style>
	video {
		height: 100vh;
		width: 100vw;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 30%;
		object-fit: cover;
	}
</style>
