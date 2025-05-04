import type {} from '../types'

import React from 'react'

/**
 * Creates an explanation string based on the variant and correct answers.
 * @param {number} variant - The variant determines the format of the explanation.
 * @param {Choice[]} correctAnswers - The correct answers array.
 * @returns {string | React.JSX.Element[]} - The explanation string or an array of JSX elements.
 */
export function createExplanation(variant: number, correctAnswers: { text: string }[]): any {
  const alpha: string[] = []
  for (let i = 65; i <= 90; i++) {
    alpha.push(String.fromCharCode(i))
  }

  if (variant === 0 || variant === 1) {
    const str: string = correctAnswers.reduce((acc: string, val, i: number) => {
      if (val) {
        acc += `${alpha[i]}, `
      }

      return acc
    }, '')

    return str.trim().substring(0, str.length - 2)
  } else if (variant === 2) {
    const str: string = correctAnswers.reduce((acc: string, val) => {
      if (val) {
        acc += `${val.text}, `
      }

      return acc
    }, '')

    return str.trim().substring(0, str.length - 2)
  } else if (variant === 3) {
    return correctAnswers.reduce((acc: React.JSX.Element[], val, i: number) => {
      acc.push(<div key={i}>{`${i + 1}. ${val.text}`}</div>)
      return acc
    }, [])
  }
}
