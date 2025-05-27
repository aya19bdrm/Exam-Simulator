import type { Exam } from '../../../types'
import type { AnswerOfMultipleAnswer, Session } from '../../../session'

import React, { useState } from 'react'
import { CheckBox } from '@styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from '@styled-icons/material/CheckBoxOutlineBlank'
import { MultipleStyles } from './MultipleChoice'
import { type Lang } from '../../../settings'
import { formatChoiceLabel } from '../../../utils/format'

export default ({ exam, session: { questionIndex, answers }, lang }: MultipleAnswerProps): React.JSX.Element => {
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
      {exam.test[questionIndex].choices.map(({ text }, i) => (
        // NOTE: display correct only if reviewing
        // <MultipleStyles key={i} $correct={exam.test[questionIndex].choices[i].correct} onClick={() => onChoose(i)}>
        <MultipleStyles key={i} dir={lang.dir} onClick={() => onChoose(i)}>
          {values.includes(i) ? <CheckBox size={20} /> : <CheckBoxOutlineBlank size={20} />}

          <div className="text">
            <div>{formatChoiceLabel(i, lang.code)}.</div>
            <div>{text}</div>
          </div>
        </MultipleStyles>
      ))}
    </div>
  )
}

export interface MultipleAnswerProps {
  exam: Exam
  session: Session
  lang: Lang
}
