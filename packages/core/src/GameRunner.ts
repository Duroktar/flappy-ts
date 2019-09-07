import { Application } from './Application'
import { GameObject } from './GameObjects'
import { Menu } from './screens/Menu'
import { Help } from './screens/Help'
import { Credits } from './screens/Credits'
import { createApplication } from './helpers'

export class GameRunner {
  private gameRunning: boolean = false
  private idleTimeout: number = 5000
  private idleTimer?: NodeJS.Timeout
  private trackTimer?: number
  constructor(
    private app: Application = createApplication(1, 0, 0),
    private currentTrack: GameObject | null = new Menu(),
  ) {
    this.registerListeners()
  }

  public start = () => {
    this.idleTimer = setTimeout(this.rollCredits, this.idleTimeout)
    this.mainloop()
    return this
  }

  public stop = () => {
    this.stopApp()
    return this
  }

  private mainloop = () => {
    this.trackTimer = requestAnimationFrame(this.mainloop)
    if (this.currentTrack)
      this.currentTrack.render(this.app.ctx)
    else if (!this.gameRunning) this.startApp()
  }

  private startApp = () => {
    const { highScore, levelNo, score } = this.app.ctx
    if (this.idleTimer) clearTimeout(this.idleTimer)
    if (this.trackTimer) cancelAnimationFrame(this.trackTimer)
    this.app.stop()
    this.app = createApplication(levelNo, score, highScore);
    this.currentTrack = null
    this.gameRunning = true
  }

  private stopApp = () => {
    this.app.stop()
    this.showSplash()
  }

  private showSplash = () => {
    if (this.trackTimer) cancelAnimationFrame(this.trackTimer)
    if (this.idleTimer) clearTimeout(this.idleTimer)
    this.idleTimer = setTimeout(this.rollCredits, this.idleTimeout)
    this.currentTrack = new Menu()
    this.gameRunning = false
    this.mainloop()
  }

  private rollCredits = () => {
    const credits = new Credits()
    credits.onDone(this.showSplash)
    this.currentTrack = credits
    this.gameRunning = false
    this.mainloop()
  }

  private showHelp = () => {
    if (this.trackTimer) cancelAnimationFrame(this.trackTimer)
    if (this.idleTimer) clearTimeout(this.idleTimer)
    if (this.gameRunning) {
      // // enables the help menu while the game is running
      // if (!this.currentTrack) {
      //   this.currentTrack = new Help()
      //   this.app.pause()
      //   this.mainloop()
      // } else {
      //   this.app.run()
      // }
    } else {
      this.currentTrack = new Help()
      this.mainloop()
    }
  }

  private registerListeners = () => {
    document.onkeyup = (ev: KeyboardEvent) => {
      if (ev.keyCode === 13 /* enter */) this.startApp()
      if (ev.keyCode === 27 /* escape */) this.stopApp()
      if (ev.keyCode === 72 /* h */) this.showHelp()
    }
  }
}

