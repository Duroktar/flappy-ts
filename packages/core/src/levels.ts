import { Flappy, Pipe } from './GameObjects'

export const getFlappy = () => new Flappy({x: 30, y: 150})
export const getPipes = () => new Array(15).fill(0).map((_, i) => new Pipe({x: (i+1) * 350, y: 240}))
