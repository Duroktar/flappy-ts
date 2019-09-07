import { Flappy, Level } from "./GameObjects";
import { GameCtx } from "./types";

export class Application {
  private gameloopTimer?: number
  constructor(private ctx: GameCtx, private flappy: Flappy) {
    document.onkeydown = (ev: KeyboardEvent) => {
      if (ev.keyCode === 32 /* spacebar */) {
        this.flappy.jump()
      }
    }
  }
  public run = () => {
    this.gameloop();
    return this;
  }

  private gameloop() {
    this.gameloopTimer = requestAnimationFrame(this.run);
    this.forEachGameObj('update');
    this.forEachGameObj('render');
    this.checkGameState();
  }

  public stop = () => {
    if (this.gameloopTimer)
      cancelAnimationFrame(this.gameloopTimer)
    document.onkeydown = null
  };

  private checkGameState() {
    const level = <Level>this.ctx.gameObjects[0];
    if (level.gameover) {
      this.stop();
      level.render(this.ctx) // keep the red bg
      this.renderGameoverText(level);
    } else {
      this.renderGameScore(level);
    }
  }

  private renderGameScore(level: Level) {
    const { canvasCtx, canvasEl } = this.ctx;
    const { width } = canvasEl

    canvasCtx.font = "22px 'Press Start 2P'";
    canvasCtx.fillStyle = "white";
    canvasCtx.textAlign = "right";
    canvasCtx.fillText(`Score: ${level.score}`, width - 8, 26);
  }

  private renderGameoverText(level: Level) {
    const { canvasCtx, canvasEl } = this.ctx;
    const { height, width } = canvasEl

    canvasCtx.font = "36px 'Press Start 2P'";
    canvasCtx.fillStyle = "black";
    canvasCtx.textAlign = "center";
    canvasCtx.fillText("Game Over", width * 0.5, height * 0.5);
    canvasCtx.font = "24px 'Press Start 2P'";
    canvasCtx.fillText("press enter", width * 0.5, height * 0.6);
  }

  private forEachGameObj(callback: 'update' | 'render') {
    for (let gObj of this.ctx.gameObjects) {
      gObj[callback](this.ctx)
    }
  }
}
