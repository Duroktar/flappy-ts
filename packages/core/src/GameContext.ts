import { GameObject } from "./GameObjects"
import { GameCtx } from "./types"

export class GameCtxBuilder {
  private gameObjects: GameObject[] = []
  private canvasCtx!: CanvasRenderingContext2D
  private canvasEl!: HTMLCanvasElement
  private levelNo!: number
  private score!: number
  private highScore!: number

  public build(): GameCtx {
    return {
      gameObjects: this.gameObjects,
      canvasCtx: this.canvasCtx,
      canvasEl: this.canvasEl,
      highScore: this.highScore,
      levelNo: this.levelNo,
      score: this.score,
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

  public withHighScore(value: number) {
    this.highScore = value
    return this
  }

  public withLevelNo(value: number) {
    this.levelNo = value
    return this
  }

  public withScore(value: number) {
    this.score = value
    return this
  }

  public withCanvasEl(value: HTMLCanvasElement) {
    this.canvasEl = value
    return this
  }
}
