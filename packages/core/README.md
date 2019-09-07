# Flappy-ts

An HTML5 Canvas FlappyBird clone written in Typescript

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.


After starting the development server with `npm start`, you can edit any files in the `src` folder
and webpack will automatically recompile and reload your server (available at `http://localhost:8080`
by default).

## Development

### Appendix
  - GUI / UI logic: Application.ts (render*)
  - Input logic: Application.ts (registerListeners)
  - Launch, Pause & Restart logic: index.ts
  - Flappy logic: GameObjects.ts (Flappy)
  - Pipe logic: GameObjects.ts (Pipe)
  - Level logic: GameObjects.ts (Level)
  - Collision & Win/Lose logic: GameObjects.ts (Level)
  - State & Persistance: GameContext.ts
  - Bootstrapping logic: helpers.ts


### Newbie Guide

#### Application (Application.ts)
  - public API has a run and a stop method
  - run starts the game (it invokes the mainloop method)
  - stop (ahem..) stops the game

#### GameObject (GameObjects.ts)
  - public API has a render and an update method*
  - update computes the next state
  - render draws the state to the screen
> *Some, like Flappy (see flappy.flap() method), have other public methods as well.

## Customizing Build

### Webpack
If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create
new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code
After you run the `npm run build` command, your code will be built into a single bundle located at
`dist/bundle.min.js` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`),
you should be able to open `http://mycoolserver.com/index.html` and play your game.
