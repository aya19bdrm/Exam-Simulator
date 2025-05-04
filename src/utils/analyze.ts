import { dequal } from 'dequal/lite'
import { lighten } from 'polished'
import theme from '../styles/theme.js'
import { Exam, ExamReport } from '../types.js'

/**
 * @param {number} question - The index of the question.
 * @param {boolean[][]} answers - The user's answers to the questions.
 * @param {string[]} fillIns - The user's fill-in-the-blank answers.
 * @param {boolean[]} orders - The user's order list answers.
 * @param {number[]} marked - The indices of the questions that are marked.
 */
export function analyzeGridItem(
  question: number,
  answers: boolean[][],
  fillIns: string[],
  orders: boolean[],
  marked: number[]
) {
  const incomplete = answers.map((el, i) => {
    if (el.indexOf(true) === -1 && !fillIns[i] && !orders[i]) {
      return i
    }
  })

  if (marked.indexOf(question) !== -1) {
    return lighten(0.25, theme.tertiary)
  } else if (incomplete.indexOf(question) !== -1) {
    return theme.grey[1]
  } else {
    return lighten(0.1, theme.primary)
  }
}

/**
 * Analyze the review grid item color based on the answer status
 * @param {number} i - The index of the question.
 * @param {ExamReport} data - The data object containing correct and incorrect answers.
 * @returns
 */
export function analyzeReviewGridItem(i: number, { correct, incorrect }: ExamReport) {
  if (correct.indexOf(i) !== -1) {
    return lighten(0.1, theme.primary)
  } else if (incorrect.indexOf(i) !== -1) {
    return lighten(0.25, theme.secondary)
  } else {
    return theme.grey[1]
  }
}

/**
 * Aggegate a report summarizing exam performance
 * @param {Exam} exam - exam object
 * @param {boolean[][]} answers - 2 dimensional array answers to each question
 * @param {string[]} fillIns - answers to fill in the blank questions
 * @param {boolean[]} orders - answers to order list questions
 * @param {number} time - time in seconds remaining from exam time
 * @param {number[]} intervals - time spent on each question
 */
export function analyzeAnswers(
  exam: Exam,
  answers: boolean[][],
  fillIns: string[],
  orders: boolean[],
  time: number,
  intervals: number[]
) {
  const correct: number[] = []
  const incorrect: number[] = []
  const incomplete: number[] = []

  answers.forEach((el, i) => {
    const { variant, answer } = exam.test[i]

    if (el.indexOf(true) === -1 && el.length > 1) {
      incomplete.push(i)
    } else if (variant === 2 && !fillIns[i]) {
      incomplete.push(i)
    } else if (variant === 3 && !orders[i]) {
      incomplete.push(i)
      // ERROR: Equaling boolean[] with Choice[]
    } else if (dequal(el, answer) || (el.length === 1 && !!el)) {
      correct.push(i)
    } else {
      incorrect.push(i)
    }
  })

  const score: number = Math.round((correct.length / exam.test.length) * 100)
  const status: boolean = score >= exam.pass
  const date: Date = new Date()
  const elapsed: number = exam.time * 60 - time
  const report: ExamReport = {
    filename: exam.filename,
    title: exam.title,
    code: exam.code,
    pass: exam.pass,
    time: exam.time,
    testLength: exam.test.length,
    image: exam.image,
    status,
    score,
    correct,
    incorrect,
    incomplete,
    answers,
    fillIns,
    orders,
    intervals,
    date,
    elapsed
  }

  return report
}
