import type { Answer } from './session'

export interface Theme {
  grey: string[]
  black: string
  primary: string
  secondary: string
  tertiary: string
  quatro: string
  correct: string
  incorrect: string
  borderRadius: string
  shadows: string[]
  scrollbar: string
  fontSize: string
}

export interface ThemedStyles {
  /**  */
  theme: Theme
}

export type QuestionFilter = 'all' | GridTagTypes
export type GridTagTypes = 'marked' | 'complete' | 'incomplete'

export type PageTypes = 'exam' | 'review'

export interface Exam {
  /** exam title */
  title: string
  /** exam description */
  description: string
  /** minimum passing score percentage */
  pass: number
  /** time limit in minutes */
  time: number
  /** exam content */
  test: Test
}

export type Test = Question[]

export type QuestionTypes = 'multiple-choice' | 'multiple-answer'

export interface Question<QT extends QuestionTypes = QuestionTypes> {
  /** question type */
  type: QT
  /** question content */
  text: string
  /** choices of the question */
  choices: Choice[]
  /** index of the correct choice for quick access */
  answer: Answer<QT>
}

export interface Choice {
  /** content of choice */
  text: string
  /** is the choice correct */
  correct: boolean
  /** explanation of why this answer is correct/wrong */
  explanation: string
}

export interface ExamReport {
  /** the exam being reported */
  exam: Exam

  /** */
  status: boolean
  /**  */
  score: number | string
  /**  */
  correct: number[]
  /**  */
  incorrect: number[]
  /**  */
  incomplete: number[]
  /**  */
  testLength: number
  /**  */
  elapsed: number
  /**  */
  date: number | string | Date
  /**  */
  intervals: number[]
  /**  */
  answers: number[][]
  /**  */
  fillIns: string[]
  /**  */
  orders: number[][]
  /**  */
  marked: unknown
}
