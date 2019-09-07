
import { GameObject } from "../GameObjects";
import { GameCtx } from "../types";

export class Menu extends GameObject {
  update(/* ctx: GameCtx */): void {
    //
  }
  render(ctx: GameCtx): void {
    const { canvasCtx, canvasEl } = ctx
    const { height, width } = canvasEl

    canvasCtx.fillStyle = "black"
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height)
    canvasCtx.font = "36px 'Press Start 2P'"
    canvasCtx.fillStyle = "white"
    canvasCtx.textAlign = "center"
    canvasCtx.fillText("Flappy Bird", width * 0.5, height * 0.5)
    canvasCtx.font = "24px 'Press Start 2P'"
    canvasCtx.fillText("press enter", width * 0.5, height * 0.6)

    canvasCtx.font = "22px 'Press Start 2P'"
    canvasCtx.textAlign = "left"
    canvasCtx.fillText("[h] Help", 4, height-26)
  }
}
