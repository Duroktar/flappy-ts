import { createApplication } from './createApplication'

let app = createApplication()

document.onkeyup = (ev: KeyboardEvent) => {
    if (
       ev.keyCode === 27 /* escape */
    || ev.keyCode === 13 /* enter */
) {
    app.stop()
    app = createApplication(app.levelNo, app.highScore)
  }
}
