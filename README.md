# haihala.github.io

A pet project where I write a portfolio for myself and learn Svelte.
Something to send to recruiters and share links through.

You can see the site at https://haihala.github.io

## Developing

install dependencies with `npm install` and start a development server with `npm
run dev`. Then press o+enter to open the dev server site in a browser tab. You
can do `npm run dev -- --open` to open the tab automatically.

To create a production version of your app, run `npm run build`. It goes into
the `build` directory. Sometimes it is smart to see it builds before pushing.

### CI

CI builds the svelte app with the static adapter, companion apps like the godot
test game, and then compiles those to a single object that it uploads to Github
pages.
