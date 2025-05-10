import type { QuestionTypes } from './types'

import React, { createContext } from 'react'

export type Answer<Q extends QuestionTypes, A> = A
export type AnswerOfMultipleChoice = Answer<'multiple-choice', number | null>
export type AnswerOfMultipleAnswer = Answer<'multiple-answer', number[]>
export type Answers = (Answer<'multiple-choice', number> | Answer<'multiple-answer', number[]>)[]

export interface Session {
  /** the question number */
  questionIndex: number

  // /** the current question number */
  // question: number

  /** the time elapsed */
  time: number

  // /** whether the question is being explained */
  // explanation: boolean

  /** the list of bookmarked questions */
  bookmarks: number[]

  /** the list of answers */
  answers: Answers

  /**  */
  // update?: React.ActionDispatch<[action: SessionAction<SessionActionTypes>]>
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
  // question: 0,
  time: 3600,
  // explanation: false,
  bookmarks: [],
  answers: [],
  update: () => {}
}

export const SessionContext = createContext<Session>(defaultSession)

export const SessionReducer: SessionReducerFunc = (state: Session, action: SessionAction): Session => {
  switch (action.type) {
    case SessionActionTypes.SET_QUESTION_INDEX: {
      const _action = action as SessionAction<'SET_QUESTION_INDEX'>
      return { ...state, questionIndex: _action.payload }
    }

    case SessionActionTypes.SET_BOOKMARKS: {
      const _action = action as SessionAction<'SET_BOOKMARKS'>
      return { ...state, bookmarks: _action.payload }
    }

    case SessionActionTypes.SET_ANSWERS: {
      const _action = action as SessionAction<'SET_ANSWERS'>
      return { ...state, answers: _action.payload }
    }

    case SessionActionTypes.SET_TIME: {
      const _action = action as SessionAction<'SET_TIME'>
      return { ...state, time: _action.payload }
    }

    default:
      return state
  }
}
