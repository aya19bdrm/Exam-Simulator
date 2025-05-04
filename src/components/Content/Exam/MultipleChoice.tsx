import type { Question, ThemedStyles } from '../../../types'

import React, { useState } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { RadioButtonChecked } from '@styled-icons/material/RadioButtonChecked'
import { RadioButtonUnchecked } from '@styled-icons/material/RadioButtonUnchecked'

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
      margin-right: 0.5rem;
    }
  }
`

function MultipleChoices({ index, question, onMultipleChoice }: MultipleChoiceProps): React.JSX.Element {
  const [value, setValue] = useState<number | null>(null)

  function onChoose(i: number): void {
    setValue(i)
    onMultipleChoice?.(index, i)
  }

  return (
    <div>
      {question.choices.map(({ label, text, correct }, i) => (
        <MultipleStyles key={i} $correct={correct} onClick={() => onChoose(i)}>
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

export interface MultipleChoiceProps {
  index: number
  question: Question
  onMultipleChoice?: (questionIndex: number, answer: number) => void
}

export interface MultipleStylesProps extends ThemedStyles {
  $review?: boolean
  $correct?: boolean
}
