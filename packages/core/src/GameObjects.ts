import { GameCtx, Transform } from './types'
import { rectCircleColliding } from './utils'
import flappyImage from '../assets/flappy.png'

const G = 9.8

export abstract class GameObject {
  readonly transform!: Transform
  abstract update(ctx: GameCtx): void
  abstract render(ctx: GameCtx): void
}

export class Flappy extends GameObject {
  public size: number = 30
  private fallSpeed: number = 0
  private jumping: boolean = false
  private jumpDuration: number = 150
  private maxFallSpeed: number = 13
  private minFallSpeed: number = -5
  private image!: HTMLImageElement
  private timer?: NodeJS.Timeout
  constructor(public transform: Transform) {
    super()
    this.initializeImage()
  }
  private initializeImage() {
    this.image = new Image(this.size, this.size)
    this.image.src = flappyImage
  }
  public jump() {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.jumping = false
    }, this.jumpDuration)
    this.jumping = true
  }
  public update(): void {
    const { x, y } = this.transform
    if (this.jumping) {
      this.fallSpeed -= G*0.075
    } else {
      this.fallSpeed += G*0.035

    }
    this.fallSpeed = Math.min(this.maxFallSpeed, this.fallSpeed)
    this.fallSpeed = Math.max(this.minFallSpeed, this.fallSpeed)
    this.transform = {
      x, y: y + this.fallSpeed
    }
  }
  public render(ctx: GameCtx): void {
    const { canvasCtx } = ctx
    const { x, y } = this.transform
    canvasCtx.save();
    canvasCtx.translate(x+60*0.5, y+50*0.5);
    canvasCtx.rotate(this.fallSpeed*Math.PI/180.0);
    canvasCtx.translate(-x-60*0.5, -y-50*0.5);
    canvasCtx.drawImage(this.image, x, y, 60, 50);
    canvasCtx.restore();
  }
}

export class Pipe extends GameObject {
  public width: number = 110
  private speed: number = 3
  private direction: 'up' | 'down' = 'up'
  private minGapTop: number = 50
  private maxGapBtm: number = 550
  constructor(
    public transform: Transform,
    public gapSize: number,
  ) {
    super()
  }
  public update(): void {
    const { x, y } = this.transform
    if (this.transform.y > this.maxGapBtm - (this.gapSize * 0.5))
      this.direction = 'up'
    if (this.transform.y < this.minGapTop + (this.gapSize * 0.5))
      this.direction = 'down'

    this.transform = {
      x: x - this.speed,
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
  public gameover: boolean = false
  public levelWon: boolean = false
  public score: number = 0
  update(ctx: GameCtx): void {
    const { canvasEl: canvas } = ctx
    // get a handle on flappy, he's always the last item in the gameObject list
    const flappy = ctx.gameObjects[ctx.gameObjects.length-1]
    const { transform: {x: fx, y: fy}, size } = <Flappy>flappy

    // check if flappy is out of screen vBounds and punish him accordingly
    if (fy < (0-size*0.5) || fy > (canvas.height+size*0.5)) {
      this.gameover = true
      return
    }

    // check if flappy is touching any pipes and punish him accordingly
    const pipes = ctx.gameObjects.slice(1, -1)
    let nextScore = 0
    let lastPipe: Pipe // this will give us a handle on the last pipe post-loop
    for (let pipe of pipes) {
      const { transform: {x: px, y: py}, width: pWidth, gapSize } = <Pipe>pipe
      const halfGap = gapSize*0.5
      const hitbox = size*0.25
      // bottom pipe
      if (rectCircleColliding(fx, fy, hitbox, px, 0, pWidth, py-halfGap) ){
        this.gameover = true
        return
      }
      // top pipe
      if (rectCircleColliding(fx, fy, hitbox, px, py+halfGap, pWidth, canvas.height)) {
        this.gameover = true
        return
      }
      // count how many pipes we've passed (this is ripe for optimization)
      if ((px+pWidth) < (fx-hitbox)) {
        nextScore++
      }
      lastPipe = <Pipe>pipe
    }

    // check if flappy is past the finish and punish him accordingly (poor flappy)
    if (!!lastPipe!) {
      const { transform: {x: px}, width: pWidth } = lastPipe!
      if (fx > ((px+pWidth)+50)) {
        this.levelWon = true
        return
      }
    }

    // and finally, set the score. (also.. punish flappy if necessary)
    this.score = nextScore
  }
  public render(ctx: GameCtx): void {
    const { canvasCtx, canvasEl } = ctx
    canvasCtx.fillStyle = "blue"
    canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height)
  }
}
