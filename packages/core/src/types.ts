import { Renderable } from "./Renderable"

export interface GameCtx {
  gameObjects: Renderable[]
  canvasCtx: CanvasRenderingContext2D
  canvasEl: HTMLCanvasElement
}
export type Transform = {
  x: number
  y: number
};
