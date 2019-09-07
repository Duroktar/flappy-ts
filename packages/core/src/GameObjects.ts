import { Renderable } from './Renderable'
import { GameCtx, Transform } from './types'
import { rectCircleColliding } from './utils'
import flappyImage from '../assets/flappy.png'

export class Flappy extends Renderable {
  public size: number = 30
  private image!: HTMLImageElement
  private fallSpeed: number = 5
  private jumpSpeed: number = 6
  private jumping: boolean = false
  private jumpDecay: number = 150
  private timer?: NodeJS.Timeout
  constructor(public transform: Transform) {
    super()
    this.initializeImage()
  }
  private initializeImage() {
    this.image = new Image()
    this.image.src = flappyImage
    this.image.width = this.size
    this.image.height = this.size
  }
  public jump() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.jumping = false
    }, this.jumpDecay)
    this.jumping = true
  }
  public update(/* ctx: GameCtx */): void {
    const { x, y } = this.transform
    this.transform = {
      x, y: this.jumping ? y - this.jumpSpeed : y + this.fallSpeed
    }
  }
  public render(ctx: GameCtx): void {
    const { canvasCtx } = ctx
    const { x, y } = this.transform
    canvasCtx.drawImage(this.image, x, y, 60, 50)
  }
}
export class Pipe extends Renderable {
  public width: number = 110
  public gapSize: number = 130
  private speed: number = 3
  private direction: 'up' | 'down' = 'up'
  private maxGapTop: number = 50
  private maxGapBtm: number = 550
  constructor(public transform: Transform) {
    super()
  }
  public update(/* ctx: GameCtx */): void {
    const { x, y } = this.transform
    if (this.transform.y > this.maxGapBtm - (this.gapSize * 0.5))
      this.direction = 'up'
    if (this.transform.y < this.maxGapTop + (this.gapSize * 0.5))
      this.direction = 'down'

    this.transform = {
      x: x - this.speed,
      // x,
      y: this.direction === 'down' ? y + this.speed : y - this.speed,
    }
  }
  public render(ctx: GameCtx): void {
    const { canvasCtx, canvasEl } = ctx
    const { x, y } = this.transform
    canvasCtx.fillStyle = "green"
    canvasCtx.fillRect(x, 0, this.width, y - (this.gapSize * 0.5))
    canvasCtx.fillRect(x, y + (this.gapSize * 0.5), this.width, canvasEl.height)
  }
}

export class Level extends Renderable {
  public score: number = 0
  public gameover: boolean = false
  update(ctx: GameCtx): void {
    const { canvasEl: canvas } = ctx
    const pipes = ctx.gameObjects.slice(1, -1)
    const flappy = ctx.gameObjects[ctx.gameObjects.length-1]
    const { transform: {x: fx, y: fy}, size } = <Flappy>flappy
    let nextScore = 0
    for (let pipe of pipes) {
      const { transform: {x: px, y: py}, width, gapSize } = <Pipe>pipe
      const halfGap = gapSize*0.5
      if (rectCircleColliding(fx, fy, size*0.3, px, 0,          width, py-halfGap) ){
        this.gameover = true
        return
      }
      if (rectCircleColliding(fx, fy, size*0.3, px, py+halfGap, width, canvas.height)) {
        this.gameover = true
        return
      }
      if (pipe.transform.x < flappy.transform.x) {
        nextScore++
      }
    }
    this.score = nextScore
  }
  public render(ctx: GameCtx): void {
    const { canvasCtx, canvasEl } = ctx
    canvasCtx.fillStyle = this.gameover ? "red" : "blue"
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height)
  }
}


