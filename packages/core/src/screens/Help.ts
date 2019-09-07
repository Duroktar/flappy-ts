
import { GameObject } from "../GameObjects";
import { GameCtx } from "../types";

export class Help extends GameObject {
  update(/* ctx: GameCtx */): void {
    //
  }
  render(ctx: GameCtx): void {
    const { canvasCtx, canvasEl } = ctx
    const { height, width } = canvasEl

    canvasCtx.fillStyle = "black"
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "left"
    canvasCtx.fillText("Jump - spacebar", width * 0.25, height * 0.5)
    canvasCtx.fillText("Pause - p", width * 0.25, (height * 0.5) + 28)

    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.textAlign = "left"
    canvasCtx.fillText("[esc] Back", 4, height-26)
  }
}
