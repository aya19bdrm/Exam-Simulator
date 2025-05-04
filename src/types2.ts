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
  theme: Theme
}

/** src\components\LoadingMain.tsx */
export interface LoadingStylesProps extends ThemedStyles {
  color: string
  height: number
}

/** src\styles\Slide.ts */
export interface SlideProps {
  direction: 'right' | 'bottom'
}

/**
 * @see https://exam-simulator.gitbook.io/exam-simulator/schema
 */
export type QuestionVariants =
  /** multiple choice, [true,false,false,false] */
  | 0
  /** multiple answer, [true,true,false,false] */
  | 1
  /** fill in the blank, [answer,variation,another] */
  | 2
  /** list order, [] */
  | 3

/**
 * @see https://exam-simulator.gitbook.io/exam-simulator/schema
 */
export type NodeVariants =
  /** image, URL of an image */
  | 0
  /** normal text, Normal sized text, most commonly used variant */
  | 1
  /** large text, Large header text */
  | 2

/**
 * @see https://exam-simulator.gitbook.io/exam-simulator/schema
 */
export interface QuestionType {
  /** type of question */
  variant: number
  /** question content */
  question: Node[]
  /** answer content */
  choices: Choice[]
  /** answer key */
  answer: boolean[] | string[]
  /** explanation content */
  explanation: Node[]
}

/**
 * @see https://exam-simulator.gitbook.io/exam-simulator/schema
 */
export interface Choice {
  /** choice label text */
  label: string
  /** content of choice */
  text: string
}

/**
 * @see https://exam-simulator.gitbook.io/exam-simulator/schema
 */
export interface Node {
  /** type of node */
  variant: number
  /** content of node */
  text: string
}

/**
 * @see https://exam-simulator.gitbook.io/exam-simulator/schema
 */
export interface Exam {
  /** unique identifier */
  id: string
  /** exam title */
  title: string
  /** exam description */
  description: string
  /** exam author */
  author: Author
  /** certification/exam code */
  code: string
  /** minimum passing score percentage */
  pass: number
  /** time limit in minutes */
  time: number
  /** URL of exam logo, 1:1 size is best */
  image: string
  /** first screen of exam */
  cover: Node[]
  /** exam content */
  test: QuestionType[]
}

/**
 * @see https://exam-simulator.gitbook.io/exam-simulator/schema
 */
export interface Author {
  /** unique identifier */
  id: string
  /** author name */
  name: string
  /** author image URL */
  image: string
}

export type Cover = Node[]

export type Test = {
  variant: number
  question: Node[]
  choices: Choice[]
  answer: boolean[]
  explanation: Node[]
}

/**
 * src\components\Content\Review\Summary.jsx
 */
export interface ExamReport {
  status: boolean
  pass: number
  score: number | string
  correct: number[]
  incorrect: number[]
  incomplete: number[]
  testLength: number
  elapsed: number
  date: number | string | Date
  intervals: number[]
  answers: number[][]
  fillIns: string[]
  orders: number[][]
  marked: unknown

  // from AnalyzeAnswers
  filename: string
  title: string
  code: string
  time: number
  image: unknown
}
