import { createApplication } from './helpers'

let app = createApplication(1, 0, 0)

document.onkeyup = (ev: KeyboardEvent) => {
    if (
       ev.keyCode === 27 /* escape */
    || ev.keyCode === 13 /* enter */
) {
    const { highScore, levelNo, score } = app.ctx

    app.stop()
    app = createApplication(levelNo, score, highScore)
  }
}
