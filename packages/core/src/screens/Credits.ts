import { EventEmitter } from "events"
import { GameObject } from "../GameObjects"
import { GameCtx } from "../types"

export class Credits extends GameObject {
  static defaultScrolltop: number = 700
  private scrollTop = Credits.defaultScrolltop
  private scrollSpeed: number = 1
  private scrollEnd: number = 250
  private done: boolean = false
  private emitter = new EventEmitter()
  private timeout: NodeJS.Timeout | null = null
  public onDone = (cb: (...args: any[]) => void) => {
    this.emitter.once('done', cb)
  }
  private scrollCredits = () => {
    if (this.scrollTop < this.scrollEnd && !this.done) {
      this.scheduleFinish()
    }
    else if (!this.done)
      this.scrollTop -= this.scrollSpeed
  }
  private scheduleFinish() {
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.emitter.emit('done')
      // this.scrollTop = Credits.defaultScrolltop
      // this.done = false
    }, 5000)
    this.done = true
  }
  public update = (/* ctx: GameCtx */): void => {
    //
  }
  public render = (ctx: GameCtx): void => {
    const { canvasCtx, canvasEl } = ctx
    const { height, width } = canvasEl

    this.scrollCredits()

    canvasCtx.fillStyle = "black"
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height)
    canvasCtx.font = "32px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText("Blatently copied by", width * 0.5, this.scrollTop)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillText("Duroktar (Scott D.)", width * 0.5, this.scrollTop + 28)
    canvasCtx.font = "32px 'Press Start 2P'"
    canvasCtx.fillText("Art Blatently stolen by", width * 0.5, this.scrollTop + 80)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillText("Duroktar (Scott D.)", width * 0.5, this.scrollTop + 108)

    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.textAlign = "left"
    canvasCtx.fillText("[esc] - Back  [h] - Help", 4, height-26)
  }
}
