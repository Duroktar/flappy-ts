import { Application } from './Application'
import { Level } from './GameObjects'
import { getFlappy, getPipes } from './levels'
import { GameCtxBuilder } from './typesBuilder'

export function createApplication(levelNo = 1, highScore = 0, flappy = getFlappy()) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const ctx = new GameCtxBuilder()
    .withCanvasEl(canvas)
    .withCanvasCtx(context)
    .withGameObjects([new Level(levelNo), ...getPipes(Math.floor(levelNo*1.7)), flappy])
    .build()
  const app = new Application(ctx)
  app.highScore = highScore
  return app.run()
}
