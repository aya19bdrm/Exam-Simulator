import type { Choice, Node, QuestionType, ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { createExplanation } from '../../../utils/create'
import { BigText } from '../../../styles/repeated'
import { dequal } from 'dequal/lite'

const ExplanationStyles = styled.div<ExplanationStylesProps>`
  background: ${(props) => lighten(0.25, props.theme.quatro)};
  border: 1px solid ${(props) => props.theme.grey[2]};
  margin-top: 5rem;
  padding: 1rem;
  font: 1.4rem 'Open Sans';
  .status {
    text-transform: uppercase;
    font-weight: 700;
    color: ${(props) => (props.status ? darken(0.1, props.theme.quatro) : props.theme.secondary)};
  }
  .correct {
    font-weight: 700;
  }
  .explanation {
    font-weight: 700;
    margin-top: 1rem;
  }
`

const Image = styled.img<ThemedStyles>`
  max-width: 75vw;
  max-height: 60vh;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.grey[1]};
`

const NormalText = styled.div`
  font: 1.4rem 'Open Sans';
  margin-bottom: 0.5rem;
`

export default ({ explanationRef, question, answers }: ExplainationProps): React.JSX.Element => {
  const variant: number = question.variant
  const correctAnswers: Choice[] = variant === 0 || variant === 1 ? question.answer : question.choices
  // @ts-expect-error
  const status: boolean = variant === 0 || variant === 1 ? dequal(answers, question.answer) : answers[0]

  return (
    <ExplanationStyles ref={explanationRef} status={status}>
      <div>
        Your answer is <span className="status">{status ? 'correct' : 'incorrect'}</span>
      </div>

      <div>
        The correct answer is <span className="correct">{createExplanation(variant, correctAnswers)}</span>
      </div>

      <div className="explanation">
        <div>Explanation</div>

        <div>
          {question.explanation.map(({ variant, text }: Node, i: number) =>
            variant === 0 ? (
              <Image key={i} src={text} />
            ) : variant === 1 ? (
              <NormalText key={i}>{text}</NormalText>
            ) : variant === 2 ? (
              <BigText key={i}>{text}</BigText>
            ) : null
          )}
        </div>
      </div>
    </ExplanationStyles>
  )
}

export interface ExplainationProps {
  explanationRef: React.RefObject<HTMLDivElement> | null
  question: QuestionType
  answers: number[]
}

export interface ExplanationStylesProps extends ThemedStyles {
  status: boolean
}
