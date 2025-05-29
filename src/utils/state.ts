import type { Session } from '../session'

export function isPaused(session: Session): boolean {
  return session.timerState === 'paused' && session.time < session.maxTime && session.time > 0
}

export function isRunning(session: Session): boolean {
  return session.timerState === 'running' && session.time > 0 && session.time < session.maxTime
}

export function haveExpired(session: Session): boolean {
  return session.timerState === 'running' && session.time <= 0
}

export function canBegin(session: Session): boolean {
  return session.timerState === 'stopped' && session.time === session.maxTime
}

export function wantsToEnd(session: Session): boolean {
  return session.timerState === 'stopped' && session.time < session.maxTime && session.time > 0
}

export function isStopped(session: Session): boolean {
  return session.timerState === 'stopped' && session.time > session.maxTime
}

export function remainingTime(session: Session): number {
  if (session.time > session.maxTime) {
    return session.time - session.maxTime
  }

  if (session.time < 0) {
    return 0
  }

  return session.maxTime - session.time
}
