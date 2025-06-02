import type { Exam } from '../../../types'
import type { AnswerOfMultipleAnswer, Session } from '../../../session'

import React, { useState } from 'react'
import { CheckBox } from '@styled-icons/material/CheckBox'
import { CheckBoxOutlineBlank } from '@styled-icons/material/CheckBoxOutlineBlank'
import { MultipleStyles } from './MultipleChoice'
import { type Lang } from '../../../settings'
import { formatChoiceLabel } from '../../../utils/format'

export default ({ exam, session: { index, answers }, lang }: MultipleAnswerProps): React.JSX.Element => {
  const answer = answers[index] as AnswerOfMultipleAnswer
  const [values, setValues] = useState<AnswerOfMultipleAnswer>(answer)

  const onChoose = (i: number) => {
    let newValues: number[]

    if (values.includes(i)) {
      newValues = values.filter((el) => el !== i)
    } else {
      newValues = values.concat(i)
    }

    setValues(newValues)
    answers[index] = newValues
  }

  return (
    <div id="multiple-answer">
      {exam.test[index].choices.map(({ text, correct }, i) => (
        <MultipleStyles key={i} dir={lang.dir} $review={false} $correct={correct} onClick={() => onChoose(i)}>
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
