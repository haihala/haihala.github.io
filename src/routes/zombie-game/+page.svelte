<script lang="ts">
	import { onMount } from 'svelte';
	import { Application, Assets, Sprite } from 'pixi.js';

	const init = async () => {
		const main = document.getElementsByTagName('main')[0];

		// App
		const app = new Application();
		await app.init({ background: '#1099bb', resizeTo: main });
		main.appendChild(app.canvas);

		// Bunny
		const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
		const bunny = new Sprite(texture);
		app.stage.addChild(bunny);
		bunny.anchor.set(0.5);
		bunny.scale = 10;
		bunny.x = app.screen.width / 2;
		bunny.y = app.screen.height / 2;

		return { app, bunny };
	};

	onMount(async () => {
		const { app, bunny } = await init();

		// Add an animation loop callback to the application's ticker.
		app.ticker.add((time) => {
			/**
			 * Just for fun, let's rotate mr rabbit a little.
			 * Time is a Ticker object which holds time related data.
			 * Here we use deltaTime, which is the time elapsed between the frame callbacks
			 * to create frame-independent transformation. Keeping the speed consistent.
			 */
			bunny.rotation += 0.1 * time.deltaTime;
		});
	});
</script>
