import { Flappy, Pipe } from './GameObjects'

export const getFlappy = () => new Flappy({x: 30, y: 150})
export const getPipes = (number = 15) => {
  let lastX = 0
  return new Array(number)
    .fill(0)
    .map(_ => {
      lastX += getRandomInt(350, 600)
      return new Pipe({
        x: lastX,
        y: getRandomInt(150, 450),
      })
    })
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
