import { GameObject } from "./Renderable"
import { GameCtx } from "./types"

export class GameCtxBuilder {
  private gameObjects: GameObject[] = []
  private canvasCtx!: CanvasRenderingContext2D
  private canvasEl!: HTMLCanvasElement

  public build(): GameCtx {
    return {
      gameObjects: this.gameObjects,
      canvasCtx: this.canvasCtx,
      canvasEl: this.canvasEl
    }
  }

  public withGameObjects(value: GameObject[]) {
    this.gameObjects = value
    return this
  }

  public withCanvasCtx(value: CanvasRenderingContext2D) {
    this.canvasCtx = value
    return this
  }

  public withCanvasEl(value: HTMLCanvasElement) {
    this.canvasEl = value
    return this
  }
}
