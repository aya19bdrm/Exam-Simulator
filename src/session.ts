import type { Exam, PageTypes } from './types'

import { createContext } from 'react'

export interface Session {
  /** the current question number */
  question: number

  /** the time elapsed */
  time: number

  /** whether the question is being explained */
  explanation: boolean

  /** the question number */
  questionNumber: number
}

export const defaultSession: Session = {
  question: 0,
  time: 0,
  explanation: false,
  questionNumber: 0
}

export const SessionContext = createContext<Session>(defaultSession)
