import { GameObject } from './Renderable'
import { GameCtx, Transform } from './types'
import { rectCircleColliding } from './utils'
import flappyImage from '../assets/flappy.png'

export class Flappy extends GameObject {
  public size: number = 30
  private fallSpeed: number = 5
  private jumping: boolean = false
  private jumpSpeed: number = 6
  private jumpDecay: number = 150
  private image!: HTMLImageElement
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

export class Pipe extends GameObject {
  public width: number = 110
  public gapSize: number = 140
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

export class Level extends GameObject {
  public score: number = 0
  public gameover: boolean = false
  public levelWon: boolean = false
  constructor(public levelNo: number) {
    super()
  }
  update(ctx: GameCtx): void {
    const { canvasEl: canvas } = ctx
    const flappy = ctx.gameObjects[ctx.gameObjects.length-1]
    const { transform: {x: fx, y: fy}, size } = <Flappy>flappy
    if (fy < (0-size*0.5) || fy > (canvas.height+size*0.5)) {
      this.gameover = true
      return
    }
    const pipes = ctx.gameObjects.slice(1, -1)
    let nextScore = 0
    let lastPipe: Pipe
    for (let pipe of pipes) {
      const { transform: {x: px, y: py}, width: pWidth, gapSize } = <Pipe>pipe
      const halfGap = gapSize*0.5
      const hitbox = size*0.25
      if (rectCircleColliding(fx, fy, hitbox, px, 0, pWidth, py-halfGap) ){
        this.gameover = true
        return
      }
      if (rectCircleColliding(fx, fy, hitbox, px, py+halfGap, pWidth, canvas.height)) {
        this.gameover = true
        return
      }
      if ((px+pWidth) < (fx-hitbox)) {
        nextScore++
      }
      lastPipe = <Pipe>pipe
    }
    this.score = nextScore
    if (!!lastPipe!) {
      const { transform: {x: px}, width: pWidth } = lastPipe!
      if (fx > ((px+pWidth)+50)) {
        this.levelWon = true
        return
      }
    }
  }
  public render(ctx: GameCtx): void {
    const { canvasCtx, canvasEl } = ctx
    canvasCtx.fillStyle = "blue"
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height)
  }
}


