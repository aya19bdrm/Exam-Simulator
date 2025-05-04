import type { Question } from '../../../types'

import React, { useState } from 'react'
import { CheckBox } from '@styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from '@styled-icons/material/CheckBoxOutlineBlank'
import { MultipleStyles } from './MultipleChoice'
import { formatAnswerLabel } from '../../../utils/format'

function MultipleAnswer({ index, question, onMultipleAnswer }: MultipleAnswerProps): React.JSX.Element {
  const [values, setValues] = useState<number[]>([])

  const onChoose = (i: number) => {
    let newValues: number[]

    if (values.includes(i)) {
      newValues = values.filter((el) => el !== i)
    } else {
      newValues = values.concat(i)
    }

    setValues(newValues)
    onMultipleAnswer?.(index, newValues)
  }

  return (
    <div>
      {question.choices.map(({ text }, i) => (
        <MultipleStyles key={i} $correct={question.choices[i].correct} onClick={() => onChoose(i)}>
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
  index: number
  question: Question
  onMultipleAnswer?: (questionIndex: number, answers: number[]) => void
}
