import type { Choice, QuestionType, ThemedStyles } from '../../../types'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { RadioButtonChecked } from '@styled-icons/material/RadioButtonChecked'
import { RadioButtonUnchecked } from '@styled-icons/material/RadioButtonUnchecked'
import { formatAnswerLabel } from '../../../utils/format'

export const MultipleStyles = styled.div<MultipleStylesProps>`
  display: grid;
  grid-template-columns: 3rem 1fr;
  margin-bottom: 0.5rem;
  cursor: pointer;
  svg {
    color: ${(props) =>
      props.review && props.correct
        ? darken(0.3, props.theme.quatro)
        : props.review && !props.correct
          ? props.theme.grey[5]
          : props.theme.grey[10]};
    margin-right: 0.5rem;
  }
  .text {
    display: flex;
    font: 1.4rem 'Open Sans';
    color: ${(props) =>
      props.review && props.correct
        ? darken(0.3, props.theme.quatro)
        : props.review && !props.correct
          ? props.theme.grey[5]
          : props.theme.black};
    & > :first-child {
      font-weight: 600;
      margin-right: 0.5rem;
    }
  }
`

function MultipleChoices({ review, question, answers, onMultipleChoice }: MultipleChoiceProps): React.JSX.Element {
  const [value, setValue] = useState<number | null>(null)

  // sets value when component mounts only
  useEffect(() => {
    answers.forEach((el, i) => {
      if (!!el) {
        setValue(i)
      }
    })
  }, [])

  // sets value when user clicks choice
  function onClick(i: number): void {
    if (review) {
      return
    }

    setValue(i)
    onMultipleChoice(i)
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
          {value === i ? <RadioButtonChecked size={20} /> : <RadioButtonUnchecked size={20} />}

          <div className="text">
            <div>{formatAnswerLabel(i)}.</div>
            <div>{text}</div>
          </div>
        </MultipleStyles>
      ))}
    </div>
  )
}

export default React.memo(MultipleChoices)

export interface MultipleChoiceProps {
  review: boolean
  question: QuestionType
  answers: number[]
  onMultipleChoice?: Function
}

export interface MultipleStylesProps extends ThemedStyles {
  review: boolean
  correct: boolean
}
