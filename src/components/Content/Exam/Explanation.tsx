import type { Choice, Question, QuestionTypes, ThemedStyles } from '../../../types'
import type { Answer } from '../../../session'

import React from 'react'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { type Lang, translate } from '../../../settings'
import { formatAnswerLabel } from '../../../utils/format'

const ExplanationStyles = styled.div<ExplanationStylesProps>`
  background: ${({ $correct, theme }) => ($correct ? lighten(0.4, theme.correct) : lighten(0.4, theme.incorrect))};
  border: 1px solid ${({ theme }) => theme.grey[2]};
  margin-top: 5rem;
  padding: 1rem;
  font: 1.4rem 'Open Sans';
  .status {
    text-transform: uppercase;
    font-weight: 700;
    color: ${({ $correct, theme }) => ($correct ? darken(0.1, theme.correct) : darken(0.1, theme.incorrect))};
  }
  .correct {
    font-weight: 700;
    color: ${({ theme }) => darken(0.1, theme.correct)};
  }
  .explanation {
    font-weight: 700;
    margin-top: 1rem;
  }
`

const NormalText = styled.div`
  font: 1.4rem 'Open Sans';
  margin-bottom: 0.5rem;
`

const ExplainationComponent: React.FC<ExplainationProps> = ({ question, answer, lang }) => {
  const correctChoice: Choice = question.choices.find((choice: Choice) => choice.correct) as Choice
  const correct: boolean = question.answer === answer

  return (
    <ExplanationStyles id="explanation" $correct={correct}>
      <div>
        {translate('content.exam.explain.yours')}
        <span className="status">
          {correct ? translate('content.exam.explain.correct') : translate('content.exam.explain.incorrect')}
        </span>
      </div>

      <div>
        {translate('content.exam.explain.answer')}
        <span className="correct">{formatAnswerLabel(question, lang.code)}</span>
      </div>

      {correctChoice.explanation && (
        <div className="explanation">
          <div>{translate('content.exam.explain.explain')}</div>

          <div>
            <NormalText>{correctChoice.explanation}</NormalText>
          </div>
        </div>
      )}
    </ExplanationStyles>
  )
}

export default ExplainationComponent

export interface ExplainationProps {
  question: Question
  answer: Answer<QuestionTypes>
  lang: Lang
}

export interface ExplanationStylesProps extends ThemedStyles {
  $correct: boolean
}
