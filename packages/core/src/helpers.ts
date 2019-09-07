import { Application } from './Application'
import { Flappy, Pipe, Level } from './GameObjects'
import { GameCtxBuilder } from './GameContext'
import { getRandomInt } from './utils'

export function createApplication(lvlNo: number, score: number, highScore: number) {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const context = canvas.getContext('2d') as CanvasRenderingContext2D
  const ctx = new GameCtxBuilder()
    .withCanvasEl(canvas)
    .withCanvasCtx(context)
    .withLevelNo(lvlNo)
    .withScore(score)
    .withHighScore(highScore)
    .withGameObjects([new Level(), ...getPipes(lvlNo), getFlappy()])
    .build()
  return new Application(ctx).run()
}

export const getFlappy = () => new Flappy({x: 30, y: 150})

export const getPipes = (levelNo: number = 1) => {
  const numPipes = Math.floor((levelNo)*1.7)
  let lastX = 0
  return new Array(numPipes)
    .fill(0)
    .map(_ => {
      lastX += getRandomInt(350, 600)
      return new Pipe({
        x: lastX,
        y: getRandomInt(150, 450),
      }, getRandomInt(140, 290))
    })
}
