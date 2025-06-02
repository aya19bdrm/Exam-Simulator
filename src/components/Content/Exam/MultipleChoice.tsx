import type { Exam, ThemedStyles } from '../../../types'
import type { AnswerOfMultipleChoice, Session } from '../../../session'

import React, { useState } from 'react'
import styled from 'styled-components'
import { RadioButtonChecked } from '@styled-icons/material/RadioButtonChecked'
import { RadioButtonUnchecked } from '@styled-icons/material/RadioButtonUnchecked'
import { type Lang } from '../../../settings'
import { formatChoiceLabel } from '../../../utils/format'

export const MultipleStyles = styled.div<MultipleStylesProps>`
  display: grid;
  grid-template-columns: 3rem 1fr;
  margin-bottom: 0.5rem;
  cursor: pointer;
  svg {
    color: ${({ $review, $correct, theme }) => ($review ? ($correct ? theme.correct : theme.grey[5]) : theme.grey[10])};
    margin-right: 0.5rem;
  }
  .text {
    display: flex;
    font: 2rem 'Open Sans';
    color: ${({ $review, $correct, theme }) => ($review ? ($correct ? theme.correct : theme.grey[5]) : theme.black)};
    & > :first-child {
      font-weight: 600;
      ${({ dir }) => (dir === 'rtl' ? 'margin-left: 0.5rem;' : 'margin-right: 0.5rem;')}
    }
  }
  .selected {
    color: ${({ $review, $correct, theme }) => ($review ? ($correct ? theme.correct : theme.incorrect) : theme.black)};
  }
`

export default ({ exam, session: { index, answers, examState }, lang }: MultipleChoiceProps): React.JSX.Element => {
  const answer = answers[index] as AnswerOfMultipleChoice
  const [value, setValue] = useState<AnswerOfMultipleChoice>(answer)

  const onChoose = (i: number): void => {
    setValue(i)
    answers[index] = i
  }

  return (
    <div id="multiple-choice">
      {exam.test[index].choices.map(({ text, correct }, i) => (
        <MultipleStyles
          key={i}
          dir={lang.dir}
          $review={examState === 'completed'}
          $correct={correct}
          onClick={() => onChoose(i)}
        >
          {value === i ? <RadioButtonChecked className="selected" size={20} /> : <RadioButtonUnchecked size={20} />}

          <div className={`text ${value === i ? 'selected' : ''}`}>
            <div>{formatChoiceLabel(i, lang.code)}.</div>
            <div>{text}</div>
          </div>
        </MultipleStyles>
      ))}
    </div>
  )
}

export interface MultipleChoiceProps {
  exam: Exam
  session: Session
  lang: Lang
}

export interface MultipleStylesProps extends ThemedStyles {
  $review: boolean
  $correct: boolean
}
