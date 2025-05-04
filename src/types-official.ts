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
  answer: boolean | string[]
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
  test: Node[]
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
