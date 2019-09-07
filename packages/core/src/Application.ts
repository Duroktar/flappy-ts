import { Flappy, Level } from "./GameObjects"
import { GameCtx } from "./types"

export class Application {
  public highScore: number = 0
  private gameloopTimer?: number
  constructor(private ctx: GameCtx) {
    this.registerListeners()
  }
  public run = () => {
    this.gameloop()
    return this
  }

  public stop = () => {
    if (this.gameloopTimer)
      cancelAnimationFrame(this.gameloopTimer)
    document.onkeydown = null
  }

  private registerListeners() {
    const lastIndex = this.ctx.gameObjects.length-1
    const flappy = <Flappy>this.ctx.gameObjects[lastIndex]
    document.onkeydown = (ev: KeyboardEvent) => {
      if (ev.keyCode === 32 /* spacebar */) { flappy.jump() }
    }
  }

  private gameloop() {
    this.gameloopTimer = requestAnimationFrame(this.run)
    this.forEachGameObj('update')
    this.forEachGameObj('render')
    this.checkGameState()
  }

  private checkGameState() {
    const level = <Level>this.ctx.gameObjects[0]
    if (level.gameover) {
      this.stop()
      this.updateHighScore(level)
      this.renderBackground(level)
      this.renderGameoverText(level)
    } else {
      this.renderGameScore(level)
    }
  }

  private updateHighScore(level: Level) {
    if (level.score > this.highScore) {
      this.highScore = level.score
    }
  }

  private renderBackground(level: Level) {
    level.render(this.ctx)
  }

  private renderGameoverText(level: Level) {
    const { canvasCtx, canvasEl } = this.ctx
    const { height, width } = canvasEl

    canvasCtx.font = "36px 'Press Start 2P'"
    canvasCtx.fillStyle = "black"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText("Game Over", width * 0.5, height * 0.5)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillText("press enter", width * 0.5, height * 0.6)
    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.textAlign = "right"
    canvasCtx.fillText(`Score: ${level.score}`, width - 8, 26)
    canvasCtx.fillText(`High Score: ${this.highScore}`, width - 8, 52)
  }

  private renderGameScore(level: Level) {
    const { canvasCtx, canvasEl } = this.ctx
    const { width } = canvasEl

    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "right"
    canvasCtx.fillText(`Score: ${level.score}`, width - 8, 26)
  }

  private forEachGameObj(callback: 'update' | 'render') {
    for (let gObj of this.ctx.gameObjects) {
      gObj[callback](this.ctx)
    }
  }
}
