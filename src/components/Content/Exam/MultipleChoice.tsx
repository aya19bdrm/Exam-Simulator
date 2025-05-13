import type { Exam, ThemedStyles } from '../../../types'
import type { AnswerOfMultipleChoice, Session } from '../../../session'

import React, { useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { RadioButtonChecked } from '@styled-icons/material/RadioButtonChecked'
import { RadioButtonUnchecked } from '@styled-icons/material/RadioButtonUnchecked'
import { type Lang } from '../../../settings'

export const MultipleStyles = styled.div<MultipleStylesProps>`
  display: grid;
  grid-template-columns: 3rem 1fr;
  margin-bottom: 0.5rem;
  cursor: pointer;
  svg {
    color: ${(props) =>
      props.$review && props.$correct
        ? darken(0.3, props.theme.quatro)
        : props.$review && !props.$correct
          ? props.theme.grey[5]
          : props.theme.grey[10]};
    margin-right: 0.5rem;
  }
  .text {
    display: flex;
    font: 2rem 'Open Sans';
    color: ${(props) =>
      props.$review && props.$correct
        ? darken(0.3, props.theme.quatro)
        : props.$review && !props.$correct
          ? props.theme.grey[5]
          : props.theme.black};
    & > :first-child {
      font-weight: 600;
      ${(props) => (props.dir === 'rtl' ? 'margin-left: 0.5rem;' : 'margin-right: 0.5rem;')}
    }
  }
`

export default ({ exam, session: { questionIndex, answers }, lang }: MultipleChoiceProps): React.JSX.Element => {
  const answer = answers[questionIndex] as AnswerOfMultipleChoice
  const [value, setValue] = useState<AnswerOfMultipleChoice>(answer)

  const onChoose = (i: number): void => {
    setValue(i)
    answers[questionIndex] = i
  }

  return (
    <div>
      {exam.test[questionIndex].choices.map(({ label, text, correct }, i) => (
        // NOTE: display correct only if reviewing
        // <MultipleStyles key={i} $correct={correct} onClick={() => onChoose(i)}>
        <MultipleStyles key={i} dir={lang.dir} onClick={() => onChoose(i)}>
          {value === i ? <RadioButtonChecked size={20} /> : <RadioButtonUnchecked size={20} />}

          <div className="text">
            {/* <div>{formatAnswerLabel(i)}.</div> */}
            <div>{label}.</div>
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
  $review?: boolean
  $correct?: boolean
}
