import type { Choice, QuestionType } from '../../../types'

import React, { useState, useEffect } from 'react'
import { CheckBox } from '@styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from '@styled-icons/material/CheckBoxOutlineBlank'
import { MultipleStyles } from './MultipleChoice.js'
import { formatAnswerLabel } from '../../../utils/format'

function MultipleAnswer({ review, question, answers, onMultipleAnswer }: MultipleAnswerProps): React.JSX.Element {
  const [values, setValues] = useState<number[]>([])

  useEffect(() => {
    const values: number[] = []

    answers.forEach((el: unknown, i: number) => {
      if (!!el) {
        values.push(i)
      }

      setValues(values)
    })
  }, [])

  const onClick = (i: number) => {
    if (review) {
      return
    }

    let newValues: number[]

    if (values.includes(i)) {
      newValues = values.filter((el) => el !== i)
    } else {
      newValues = values.concat(i)
    }

    const newAnswers = answers.map((_, i) => newValues.includes(i))
    setValues(newValues)
    onMultipleAnswer(newAnswers)
  }

  return (
    <div>
      {question.choices.map(({ text }, i) => (
        // @ts-expect-error
        <MultipleStyles
          key={i}
          review={review || undefined}
          correct={question.answer[i] || undefined}
          onClick={() => onClick(i)}
        >
          {values.includes(i) ? <CheckBox size={20} /> : <CheckBoxOutlineBlank size={20} />}

          <div className="text">
            <div>{formatAnswerLabel(i)}.</div>
            <div>{text}</div>
          </div>
        </MultipleStyles>
      ))}
    </div>
  )
}

export default React.memo(MultipleAnswer)

export interface MultipleAnswerProps {
  review: boolean
  question: QuestionType
  answers: number[]
  onMultipleAnswer?: Function
}
