import type {} from '../../../types'

import React, { useContext, useState } from 'react'
import { CheckBox } from '@styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from '@styled-icons/material/CheckBoxOutlineBlank'
import { MultipleStyles } from './MultipleChoice'
import { ExamContext } from '../../../exam'
import { AnswerOfMultipleAnswer, SessionContext } from '../../../session'

function MultipleAnswer({}: MultipleAnswerProps): React.JSX.Element {
  const exam = useContext(ExamContext)
  const { questionIndex, answers } = useContext(SessionContext)

  if (!exam) return <></>

  const answer = answers[questionIndex] as AnswerOfMultipleAnswer
  const [values, setValues] = useState<AnswerOfMultipleAnswer>(answer)

  const onChoose = (i: number) => {
    let newValues: number[]

    if (values.includes(i)) {
      newValues = values.filter((el) => el !== i)
    } else {
      newValues = values.concat(i)
    }

    setValues(newValues)
    answers[questionIndex] = newValues
  }

  return (
    <div>
      {exam.test[questionIndex].choices.map(({ label, text }, i) => (
        // <MultipleStyles key={i} $correct={exam.test[questionIndex].choices[i].correct} onClick={() => onChoose(i)}> NOTE: display correct only if reviewing
        <MultipleStyles key={i} onClick={() => onChoose(i)}>
          {values.includes(i) ? <CheckBox size={20} /> : <CheckBoxOutlineBlank size={20} />}

          <div className="text">
            {/* <div>{formatAnswerLabel(i)}.</div> */}
            <div>{label}. </div>
            <div>{text}</div>
          </div>
        </MultipleStyles>
      ))}
    </div>
  )
}

export default React.memo(MultipleAnswer)

export interface MultipleAnswerProps {}
