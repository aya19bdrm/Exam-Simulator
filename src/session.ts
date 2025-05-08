import type { QuestionTypes } from './types'

import { createContext } from 'react'

export type Answer<Q extends QuestionTypes, A> = A
export type AnswerOfMultipleChoice = Answer<'multiple-choice', number | null>
export type AnswerOfMultipleAnswer = Answer<'multiple-answer', number[]>
export type Answers = (Answer<'multiple-choice', number> | Answer<'multiple-answer', number[]>)[]

export interface Session {
  /** the question number */
  questionIndex: number

  // /** the current question number */
  // question: number

  // /** the time elapsed */
  // time: number

  // /** whether the question is being explained */
  // explanation: boolean

  /** the list of bookmarked questions */
  bookmarks: number[]

  /** the list of answers */
  answers: Answers
}

export const defaultSession: Session = {
  questionIndex: 0,
  // question: 0,
  // time: 0,
  // explanation: false,
  bookmarks: [],
  answers: []
}

export const SessionContext = createContext<Session>(defaultSession)
