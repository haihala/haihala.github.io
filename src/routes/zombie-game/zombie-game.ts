import { Application, Assets, Sprite, Ticker } from 'pixi.js';

type Car = {
	velocity: { x: number; y: number };
	position: { x: number; y: number };
	rotation: number;
	sprite: Sprite;
};
type GameWorld = {
	car: Car;
};

type InputMap = {
	turning_left: boolean;
	turning_right: boolean;
	accelerating: boolean;
	breaking: boolean;
};

export const init = async (): Promise<{
	app: Application;
	input_map: InputMap;
	game_world: GameWorld;
}> => {
	const main = document.body;

	// App
	const app = new Application();
	await app.init({ background: '#1099bb', resizeTo: main });
	main.appendChild(app.canvas);

	// Car
	const texture = await Assets.load('/car.png');
	const car_sprite = new Sprite(texture);
	app.stage.addChild(car_sprite);
	car_sprite.anchor.set(0.5);
	car_sprite.scale = 0.1;
	const car = {
		sprite: car_sprite,
		position: {
			x: app.screen.width / 2,
			y: app.screen.height / 2
		},
		velocity: { x: 0, y: 0 },
		rotation: 0
	};

	// Input
	const input_map = {
		turning_left: false,
		turning_right: false,
		accelerating: false,
		breaking: false
	};

	const key_map: Record<string, (val: boolean) => void> = {
		w: (val: boolean) => {
			input_map.accelerating = val;
		},
		s: (val: boolean) => {
			input_map.breaking = val;
		},
		a: (val: boolean) => {
			input_map.turning_left = val;
		},
		d: (val: boolean) => {
			input_map.turning_right = val;
		}
	};

	const downHandler = (ev: KeyboardEvent) => {
		const action = key_map[ev.key];

		if (action) {
			action(true);
		}
	};
	const upHandler = (ev: KeyboardEvent) => {
		const action = key_map[ev.key];

		if (action) {
			action(false);
		}
	};
	window.addEventListener('keydown', downHandler);
	window.addEventListener('keyup', upHandler);

	return { app, input_map, game_world: { car } };
};

export const tick = (
	time: Ticker,
	app: Application,
	input_map: InputMap,
	game_world: GameWorld
) => {
	// For stuff that happens over time
	const { car } = game_world;

	// JS is fun
	const turn_input = +input_map.turning_right - +input_map.turning_left;
	const movement_input = +input_map.accelerating - +input_map.breaking;

	const angle_sin = Math.sin(car.rotation);
	const angle_cos = Math.cos(car.rotation);
	const turn_speed = 0.01;
	const dot_product = angle_cos * car.velocity.x + angle_sin * car.velocity.y;
	car.rotation += turn_speed * turn_input * dot_product * time.deltaTime;

	const acceleration = 1;
	car.velocity.x += acceleration * movement_input * angle_cos * time.deltaTime;
	car.velocity.y += acceleration * movement_input * angle_sin * time.deltaTime;

	car.position.x += car.velocity.x * time.deltaTime;
	car.position.y += car.velocity.y * time.deltaTime;

	if (car.position.x < 0) car.position.x = 0;
	if (car.position.x > app.screen.width) car.position.x = app.screen.width;
	if (car.position.y < 0) car.position.y = 0;
	if (car.position.y > app.screen.height) car.position.y = app.screen.height;

	const drag = movement_input == 0 ? 0.9 : 0.95;
	car.velocity.x *= Math.abs(car.velocity.x) < 0.01 ? 0 : drag;
	car.velocity.y *= Math.abs(car.velocity.y) < 0.01 ? 0 : drag;

	// Update sprite
	car.sprite.x = car.position.x;
	car.sprite.y = car.position.y;
	car.sprite.rotation = car.rotation;
};
