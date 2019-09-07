import { Flappy, Level } from "./GameObjects"
import { stats } from "./stats"
import { GameCtx } from "./types"
import { numInWords } from "./utils"

export class Application {
  private gameloopTimer?: number
  constructor(public ctx: GameCtx) {
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
  private togglePause = () => {
    if (this.gameloopTimer)
      this.pause()
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
    this.updateGameState()
    stats.end()
  }
  private updateGameState = () => {
    const level = <Level>this.ctx.gameObjects[0]
    this.updateHighScore(level)
    if (level.gameover) {
      this.stop()
      this.renderBackground("red")
      this.renderGameoverText(level)
      this.ctx.levelNo = 1
      this.ctx.score = 0
    } else if (level.levelWon) {
      this.stop()
      this.renderLevelWonText(level)
      this.ctx.levelNo++
      this.ctx.score = level.score
    } else {
      this.renderGameScore(level)
    }
  }
  private updateHighScore = (level: Level) => {
    const playerScore = (this.ctx.score + level.score)
    if (playerScore > this.ctx.highScore) {
      this.ctx.highScore = playerScore
    }
  }

  private forEachGameObj = (callback: 'update' | 'render') => {
    for (let gObj of this.ctx.gameObjects) {
      gObj[callback](this.ctx)
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
    const num = numInWords(this.ctx.levelNo)

    canvasCtx.font = "36px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText(`Level ${num} complete!`, width * 0.5, height * 0.5)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillText("press enter", width * 0.5, height * 0.6)
    this.renderTopScores(level, width)
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
    this.renderTopScores(level, width)
  }

  private renderGameScore = (level: Level) => {
    const { canvasCtx, canvasEl, score } = this.ctx
    const { width } = canvasEl

    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "right"
    canvasCtx.fillText(`Score: ${level.score+score}`, width - 8, 26)
  }

  private renderPausedText = () => {
    const { canvasCtx, canvasEl } = this.ctx
    const { height, width } = canvasEl
    canvasCtx.font = "36px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText("Paused", width * 0.5, height * 0.5)
  }

  private renderTopScores(level: Level, width: number) {
    const { canvasCtx, highScore } = this.ctx
    const score = level.score + this.ctx.score
    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.textAlign = "right"
    canvasCtx.fillText(`Score: ${score}`, width - 8, 26)
    canvasCtx.fillText(`High Score: ${highScore}`, width - 8, 52)
  }
}
