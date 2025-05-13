import type { Choice, Question, ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { createExplanation } from '../../../utils/create'
import { translate } from '../../../settings'

const ExplanationStyles = styled.div<ExplanationStylesProps>`
  background: ${(props) => lighten(0.25, props.theme.quatro)};
  border: 1px solid ${(props) => props.theme.grey[2]};
  margin-top: 5rem;
  padding: 1rem;
  font: 1.4rem 'Open Sans';
  .status {
    text-transform: uppercase;
    font-weight: 700;
    color: ${(props) => (props.$status ? darken(0.1, props.theme.quatro) : props.theme.secondary)};
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
  const correctChoice: Choice = question.choices.find((choice: Choice) => choice.correct) as Choice
  const status: boolean = question.choices[question.answer].correct

  return (
    <ExplanationStyles ref={explanationRef} $status={status}>
      <div>
        {translate('content.exam.explain.yours')}
        <span className="status">
          {status ? translate('content.exam.explain.correct') : translate('content.exam.explain.incorrect')}
        </span>
      </div>

      <div>
        {translate('content.exam.explain.answer')}
        <span className="correct">{createExplanation(question)}</span>
      </div>

      <div className="explanation">
        <div>{translate('content.exam.explain.explain')}</div>

        <div>
          {/* {correctChoice.explanation && <Image  src={text} />} */}
          {correctChoice.explanation && <NormalText>{correctChoice.explanation}</NormalText>}
          {/* {<BigText >{text}</BigText>} */}
        </div>
      </div>
    </ExplanationStyles>
  )
}

export interface ExplainationProps {
  explanationRef: React.RefObject<HTMLDivElement> | null
  question: Question
  answers: number[]
}

export interface ExplanationStylesProps extends ThemedStyles {
  $status: boolean
}
