import type { Choice, Question, QuestionTypes } from '../types'

import React from 'react'

/**
 * Creates an explanation string based on the variant and correct answers.
 * @returns {string | React.JSX.Element[]} - The explanation string or an array of JSX elements.
 */
export function createExplanation({ choices, answer }: Question): string | React.JSX.Element[] {
  const alpha: string[] = []

  for (let i = 65; i <= 90; i++) {
    alpha.push(String.fromCharCode(i))
  }

  const str: string = choices.reduce((acc: string, val: Choice, i: number) => {
    if (val) {
      acc += `${alpha[i]}, `
    }

    return acc
  }, '')

  return str.trim().substring(0, str.length - 2)
}
