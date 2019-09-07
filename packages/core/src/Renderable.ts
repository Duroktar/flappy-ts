import { GameCtx, Transform } from "./types"

export abstract class GameObject {
  readonly transform!: Transform
  abstract update(ctx: GameCtx): void
  abstract render(ctx: GameCtx): void
}
