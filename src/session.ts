import type { QuestionTypes } from './types'

import React, { createContext } from 'react'

export type Answer<QT extends QuestionTypes> = AnswerOf[QT]
export type AnswerOfMultipleChoice = Answer<'multiple-choice'>
export type AnswerOfMultipleAnswer = Answer<'multiple-answer'>
export type Answers = (AnswerOfMultipleChoice | AnswerOfMultipleAnswer)[]
export type AnswerOf = {
  ['multiple-choice']: number | null
  ['multiple-answer']: number[]
}

export type TimerStates = 'running' | 'paused' | 'stopped'
export type ExamState = 'not-started' | 'in-progress' | 'completed'

export interface Session {
  /** the question number */
  index: number

  /** the time elapsed */
  maxTime: number

  /** the time elapsed */
  time: number

  /** the state of the timer */
  timerState: TimerStates

  /** the state of the exam */
  examState: ExamState

  /** the list of bookmarked questions */
  bookmarks: number[]

  /** the list of answers */
  answers: Answers

  /**  */
  update: SessionDispatch
}

export type SessionActionTypes =
  | 'SET_INDEX'
  | 'SET_BOOKMARKS'
  | 'SET_ANSWERS'
  | 'SET_TIME'
  | 'SET_TIMER_STATE'
  | 'SET_EXAM_STATE'
export type SessionActions = {
  SET_INDEX: { type: 'SET_INDEX'; payload: number }
  SET_BOOKMARKS: { type: 'SET_BOOKMARKS'; payload: number[] }
  SET_ANSWERS: { type: 'SET_ANSWERS'; payload: Answers }
  SET_TIME: { type: 'SET_TIME'; payload: number }
  SET_TIMER_STATE: { type: 'SET_TIMER_STATE'; payload: TimerStates }
  SET_EXAM_STATE: { type: 'SET_EXAM_STATE'; payload: ExamState }
}
export interface SessionAction<T extends SessionActionTypes = SessionActionTypes> {
  type: T
  payload: SessionActions[T]['payload']
}
export type SessionReducerFunc<T extends SessionActionTypes = SessionActionTypes> = (
  state: Session,
  action: SessionAction<T>
) => Session
export type SessionDispatch<T extends SessionActionTypes = SessionActionTypes> = (
  type: T,
  payload: SessionActions[T]['payload']
) => void

export const SessionActionTypes: { [key in SessionActionTypes]: key } = {
  SET_INDEX: 'SET_INDEX',
  SET_BOOKMARKS: 'SET_BOOKMARKS',
  SET_ANSWERS: 'SET_ANSWERS',
  SET_TIME: 'SET_TIME',
  SET_TIMER_STATE: 'SET_TIMER_STATE',
  SET_EXAM_STATE: 'SET_EXAM_STATE'
} as const

export const defaultSession: Session = {
  index: 0,
  maxTime: 13800,
  time: 13800,
  timerState: 'stopped',
  examState: 'not-started',
  bookmarks: [],
  answers: [],
  update: () => {}
}

export const SessionContext = createContext<Session>(defaultSession)

export const SessionReducer: SessionReducerFunc = (state: Session, { type, payload }: SessionAction): Session => {
  switch (type) {
    case SessionActionTypes.SET_INDEX: {
      const value = payload as SessionActions[typeof type]['payload']
      return { ...state, index: value }
    }

    case SessionActionTypes.SET_BOOKMARKS: {
      const value = payload as SessionActions[typeof type]['payload']
      return { ...state, bookmarks: value }
    }

    case SessionActionTypes.SET_ANSWERS: {
      const value = payload as SessionActions[typeof type]['payload']
      return { ...state, answers: value }
    }

    case SessionActionTypes.SET_TIME: {
      const value = payload as SessionActions[typeof type]['payload']
      return { ...state, time: value }
    }

    case SessionActionTypes.SET_TIMER_STATE: {
      const value = payload as SessionActions[typeof type]['payload']
      return { ...state, timerState: value }
    }

    case SessionActionTypes.SET_EXAM_STATE: {
      const value = payload as SessionActions[typeof type]['payload']
      return { ...state, examState: value }
    }

    default:
      return state
  }
}
