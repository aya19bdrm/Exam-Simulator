import type { ThemedStyles } from '../../../types'

import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { RadioButtonChecked } from '@styled-icons/material/RadioButtonChecked'
import { RadioButtonUnchecked } from '@styled-icons/material/RadioButtonUnchecked'
import { ExamContext } from '../../../exam'
import { AnswerOfMultipleChoice, SessionContext } from '../../../session'

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
    font: 1.4rem 'Open Sans';
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

function MultipleChoices({}: MultipleChoiceProps): React.JSX.Element {
  const exam = useContext(ExamContext)
  const { questionIndex, answers } = useContext(SessionContext)

  if (!exam) return <></>

  const answer = answers[questionIndex] as AnswerOfMultipleChoice
  const [value, setValue] = useState<AnswerOfMultipleChoice>(answer)

  const onChoose = (i: number): void => {
    setValue(i)
    answers[questionIndex] = i
  }

  return (
    <div>
      {exam.test[questionIndex].choices.map(({ label, text, correct }, i) => (
        // <MultipleStyles key={i} $correct={correct} onClick={() => onChoose(i)}> NOTE: display correct only if reviewing
        <MultipleStyles dir={'rtl'} key={i} onClick={() => onChoose(i)}>
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

export default React.memo(MultipleChoices)

export interface MultipleChoiceProps {}

export interface MultipleStylesProps extends ThemedStyles {
  $review?: boolean
  $correct?: boolean
}
