import { Flappy, Level } from "./GameObjects"
import { stats } from "./stats"
import { GameCtx } from "./types"
import { numInWords } from "./utils"

export class Application {
  public highScore: number = 0
  public levelNo: number = 1
  private gameloopTimer?: number
  constructor(private ctx: GameCtx) {
    this.registerListeners()
  }
  public run = () => {
    this.gameloop()
    return this
  }
  public stop = () => {
    if (this.gameloopTimer) {
      cancelAnimationFrame(this.gameloopTimer)
      this.gameloopTimer = undefined
    }
    document.onkeydown = null
  }
  private registerListeners = () => {
    const lastIndex = this.ctx.gameObjects.length-1
    const flappy = <Flappy>this.ctx.gameObjects[lastIndex]
    document.onkeydown = (ev: KeyboardEvent) => {
      if (ev.keyCode === 32 /* spacebar */) { flappy.jump() }
      if (ev.keyCode === 80 /* p */) { this.togglePause() }
    }
  }
  public togglePause = () => {
    if (this.gameloopTimer) this.pause()
    else this.gameloop()
  }
  private pause = () => {
    if (this.gameloopTimer)
      cancelAnimationFrame(this.gameloopTimer)
    this.gameloopTimer = undefined
    this.renderPausedText()
  }
  private gameloop = () => {
    this.gameloopTimer = requestAnimationFrame(this.gameloop)
    stats.begin()
    this.forEachGameObj('update')
    this.forEachGameObj('render')
    this.checkGameState()
    stats.end()
  }
  private checkGameState = () => {
    const level = <Level>this.ctx.gameObjects[0]
    if (level.gameover) {
      this.levelNo = 1
      this.stop()
      this.updateHighScore(level)
      this.renderBackground("red")
      this.renderGameoverText(level)
    } else if (level.levelWon) {
      this.levelNo++
      this.stop()
      this.updateHighScore(level)
      this.renderLevelWonText(level)
    } else {
      this.renderGameScore(level)
    }
  }

  private updateHighScore = (level: Level) => {
    if (level.score > this.highScore) {
      this.highScore = level.score
    }
  }

  private renderBackground = (color: string) => {
    const { canvasCtx, canvasEl } = this.ctx
    canvasCtx.fillStyle = color
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height)
  }

  private renderLevelWonText = (level: Level) => {
    const { canvasCtx, canvasEl } = this.ctx
    const { height, width } = canvasEl

    canvasCtx.font = "36px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText(`Level ${numInWords(level.levelNo)} complete!`, width * 0.5, height * 0.5)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillText("press enter", width * 0.5, height * 0.6)
    this.renderTopScores(canvasCtx, level, width)
  }

  private renderGameoverText = (level: Level) => {
    const { canvasCtx, canvasEl } = this.ctx
    const { height, width } = canvasEl

    canvasCtx.font = "36px 'Press Start 2P'"
    canvasCtx.fillStyle = "black"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText("Game Over", width * 0.5, height * 0.5)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillText("press enter", width * 0.5, height * 0.6)
    this.renderTopScores(canvasCtx, level, width)
  }

  private renderGameScore = (level: Level) => {
    const { canvasCtx, canvasEl } = this.ctx
    const { width } = canvasEl

    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "right"
    canvasCtx.fillText(`Score: ${level.score}`, width - 8, 26)
  }

  private renderPausedText = () => {
    const { canvasCtx, canvasEl } = this.ctx
    const { height, width } = canvasEl
    canvasCtx.font = "36px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText("Paused", width * 0.5, height * 0.5)
  }

  private forEachGameObj = (callback: 'update' | 'render') => {
    for (let gObj of this.ctx.gameObjects) {
      gObj[callback](this.ctx)
    }
  }

  private renderTopScores(canvasCtx: CanvasRenderingContext2D, level: Level, width: number) {
    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.textAlign = "right"
    canvasCtx.fillText(`Score: ${level.score}`, width - 8, 26)
    canvasCtx.fillText(`High Score: ${this.highScore}`, width - 8, 52)
  }
}
