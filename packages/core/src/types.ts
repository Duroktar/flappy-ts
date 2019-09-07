import { GameObject } from "./GameObjects"

export interface GameCtx {
  gameObjects: GameObject[]
  canvasCtx: CanvasRenderingContext2D
  canvasEl: HTMLCanvasElement
  highScore: number
  levelNo: number
  score: number
}
export type Transform = {
  x: number
  y: number
}
