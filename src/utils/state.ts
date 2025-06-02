import type { Session } from '../session'

export function examNotStarted({ examState }: Session): boolean {
  return examState === 'not-started'
}

export function examFinished({ examState }: Session): boolean {
  return examState === 'completed'
}

export function timerIsPaused({ examState, timerState, time, maxTime }: Session): boolean {
  return examState === 'in-progress' && timerState === 'paused' && timerHasRan(time, maxTime)
}

export function examWantsToFinish({ examState, timerState, time, maxTime }: Session): boolean {
  return examState === 'in-progress' && timerState === 'stopped' && timerHasRan(time, maxTime)
}

export function timerIsRunning({ examState, timerState, time, maxTime }: Session): boolean {
  return examState === 'in-progress' && timerState === 'running' && timerHasRan(time, maxTime)
}

export function timerHaveExpired({ examState, timerState, time }: Session): boolean {
  return examState === 'in-progress' && timerState === 'running' && time <= 0
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
