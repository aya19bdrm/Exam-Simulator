import type { QuestionTypes } from './types'

import React, { createContext } from 'react'

export type Answer<Q extends QuestionTypes, A> = A
export type AnswerOfMultipleChoice = Answer<'multiple-choice', number | null>
export type AnswerOfMultipleAnswer = Answer<'multiple-answer', number[]>
export type Answers = (Answer<'multiple-choice', number> | Answer<'multiple-answer', number[]>)[]

export interface Session {
  /** the question number */
  questionIndex: number

  /** the time elapsed */
  time: number

  /** the list of bookmarked questions */
  bookmarks: number[]

  /** the list of answers */
  answers: Answers

  /**  */
  update: SessionDispatch
}

export type SessionActionTypes = 'SET_QUESTION_INDEX' | 'SET_BOOKMARKS' | 'SET_ANSWERS' | 'SET_TIME'
export type SessionActions = {
  SET_QUESTION_INDEX: { type: 'SET_QUESTION_INDEX'; payload: number }
  SET_BOOKMARKS: { type: 'SET_BOOKMARKS'; payload: number[] }
  SET_ANSWERS: { type: 'SET_ANSWERS'; payload: Answers }
  SET_TIME: { type: 'SET_TIME'; payload: number }
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

export const SessionActionTypes = {
  SET_QUESTION_INDEX: 'SET_QUESTION_INDEX',
  SET_BOOKMARKS: 'SET_BOOKMARKS',
  SET_ANSWERS: 'SET_ANSWERS',
  SET_TIME: 'SET_TIME'
} as const

export const defaultSession: Session = {
  questionIndex: 0,
  time: 3600,
  bookmarks: [],
  answers: [],
  update: () => {}
}

export const SessionContext = createContext<Session>(defaultSession)

export const SessionReducer: SessionReducerFunc = (state: Session, { type, payload }: SessionAction): Session => {
  switch (type) {
    case SessionActionTypes.SET_QUESTION_INDEX: {
      const value = payload as SessionActions[typeof type]['payload']
      return { ...state, questionIndex: value }
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

    default:
      return state
  }
}
