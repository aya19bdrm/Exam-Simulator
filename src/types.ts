export interface Theme {
  grey: string[]
  black: string
  primary: string
  secondary: string
  tertiary: string
  quatro: string
  borderRadius: string
  shadows: string[]
  scrollbar: string
  fontSize: string
}

export interface ThemedStyles {
  /**  */
  theme: Theme
}

export type QuestionFilter = 'all' | 'marked' | 'answered' | 'incomplete'

export type PageTypes = 'cover' | 'exam' | 'result' | 'settings'

export interface Exam {
  /** exam title */
  title: string
  /** exam description */
  description: string
  /** minimum passing score percentage */
  pass: number
  /** time limit in minutes */
  time: number
  /** URL of exam logo, 1:1 size is best */
  image: string
  /** exam content */
  test: Test
}

export type Test = Question[]

export interface Question {
  /** question type */
  type: QuestionTypes
  /** question content */
  text: string
  /** choices of the question */
  choices: Choice[]
  /** index of the correct choice for quick access */
  answer: number
}

export interface Choice {
  /** content of choice */
  text: string
  /** is the choice correct */
  correct: boolean
  /** explaination of why this answer is correct/wrong */
  explanation: string
}

export type QuestionTypes = 'multiple-choice' | 'multiple-answer' | 'fill-in-the-blank'

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
