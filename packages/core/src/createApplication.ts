import { Application } from './Application'
import { Level } from './GameObjects'
import { getFlappy, getPipes } from './levels'
import { GameCtxBuilder } from './typesBuilder'

export function createApplication(flappy = getFlappy()) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const ctx = new GameCtxBuilder()
    .withCanvasEl(canvas)
    .withCanvasCtx(context)
    .withGameObjects([new Level(), ...getPipes(), flappy])
    .build()
  return new Application(ctx, flappy).run()
}
