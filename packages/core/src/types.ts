import { GameObject } from "./Renderable"

export interface GameCtx {
  gameObjects: GameObject[]
  canvasCtx: CanvasRenderingContext2D
  canvasEl: HTMLCanvasElement
}
export type Transform = {
  x: number
  y: number
}
