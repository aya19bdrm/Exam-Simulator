import type { QuestionTypes } from './types'

import { createContext } from 'react'

export type Answer<QT extends QuestionTypes> = AnswerOf[QT]
export type AnswerOfMultipleChoice = Answer<'multiple-choice'>
export type AnswerOfMultipleAnswer = Answer<'multiple-answer'>
export type Answers = (AnswerOfMultipleChoice | AnswerOfMultipleAnswer)[]
export type AnswerOf = {
  ['multiple-choice']: number | null
  ['multiple-answer']: number[]
}

export type ExamState = 'not-started' | 'in-progress' | 'completed'
export type ReviewState = 'summary' | 'question'

export interface Session {
  /** the question number */
  index: number

  /** the maximum time allowed for the exam */
  maxTime: number

  /** the time elapsed */
  time: number

  /** the state of the timer - using proper timer states */
  paused: boolean

  /** the state of the exam */
  examState: ExamState

  /** the state of the review */
  reviewState: ReviewState

  /** the list of bookmarked questions */
  bookmarks: number[]

  /** the list of answers */
  answers: Answers

  /** session update function - will be injected by reducer */
  update?: SessionDispatch
}

export type SessionActionTypes =
  | 'SET_INDEX'
  | 'SET_BOOKMARKS'
  | 'SET_ANSWERS'
  | 'SET_TIME'
  | 'SET_TIMER_PAUSED'
  | 'SET_EXAM_STATE'
  | 'SET_REVIEW_STATE'

export type SessionActions = {
  SET_INDEX: { type: 'SET_INDEX'; payload: number; prop: 'index' }
  SET_BOOKMARKS: { type: 'SET_BOOKMARKS'; payload: number[]; prop: 'bookmarks' }
  SET_ANSWERS: { type: 'SET_ANSWERS'; payload: Answers; prop: 'answers' }
  SET_TIME: { type: 'SET_TIME'; payload: number; prop: 'time' }
  SET_TIMER_PAUSED: { type: 'SET_TIMER_PAUSED'; payload: boolean; prop: 'paused' }
  SET_EXAM_STATE: { type: 'SET_EXAM_STATE'; payload: ExamState; prop: 'examState' }
  SET_REVIEW_STATE: { type: 'SET_REVIEW_STATE'; payload: ReviewState; prop: 'reviewState' }
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

export const SessionActionProps: { [key in SessionActionTypes]: keyof Session } = {
  SET_INDEX: 'index',
  SET_BOOKMARKS: 'bookmarks',
  SET_ANSWERS: 'answers',
  SET_TIME: 'time',
  SET_TIMER_PAUSED: 'paused',
  SET_EXAM_STATE: 'examState',
  SET_REVIEW_STATE: 'reviewState'
} as const

export const SessionActionTypes: { [key in SessionActionTypes]: key } = {
  SET_INDEX: 'SET_INDEX',
  SET_BOOKMARKS: 'SET_BOOKMARKS',
  SET_ANSWERS: 'SET_ANSWERS',
  SET_TIME: 'SET_TIME',
  SET_TIMER_PAUSED: 'SET_TIMER_PAUSED',
  SET_EXAM_STATE: 'SET_EXAM_STATE',
  SET_REVIEW_STATE: 'SET_REVIEW_STATE'
} as const

// Default session with proper initial state
export const defaultSession: Session = {
  index: 0,
  maxTime: 0,
  time: 0,
  paused: false,
  examState: 'not-started',
  reviewState: 'summary',
  bookmarks: [],
  answers: []
}

export const SessionContext = createContext<Session>(defaultSession)

export const SessionReducer: SessionReducerFunc = (state: Session, { type, payload }: SessionAction): Session => {
  const key: keyof Session = SessionActionProps[type]
  const val: SessionActions[typeof type]['payload'] = payload

  if (val !== state[key]) {
    return { ...state, [key]: val }
  }

  return state
}
