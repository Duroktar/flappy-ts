import { createApplication } from './createApplication'

let app = createApplication()

document.onkeyup = (ev: KeyboardEvent) => {
    if (
       ev.keyCode === 27 /* escape */
    || ev.keyCode === 13 /* enter */
) {
    const highscore = app.highScore
    app.stop()
    app = createApplication()
    app.highScore = highscore
  }
}
