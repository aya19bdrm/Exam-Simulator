import type { Session } from '../session'

export function timerIsPaused({ examState, paused, time, maxTime }: Session): boolean {
  return examState === 'in-progress' && paused && timerHasRan(time, maxTime)
}

export function timerIsRunning({ examState, paused, time, maxTime }: Session): boolean {
  return examState === 'in-progress' && !paused && timerHasRan(time, maxTime)
}

export function timerHaveExpired({ examState, paused, time }: Session): boolean {
  return examState === 'in-progress' && !paused && time <= 0
}

export function remainingTime({ time, maxTime }: Session): number {
  if (time < 0) {
    return 0
  }

  return maxTime - time
}

function timerHasRan(time: number, maxTime: number): boolean {
  return time < maxTime && time > 0
}
