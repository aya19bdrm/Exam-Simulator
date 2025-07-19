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
`

const StatusStyles = styled.span<ExplanationStylesProps>`
  text-transform: uppercase;
  font-weight: 700;
  color: ${({ $correct, theme }) => ($correct ? darken(0.1, theme.correct) : darken(0.1, theme.incorrect))};
`

const CorrectStyles = styled.span<ThemedStyles>`
  font-weight: 700;
  color: ${({ theme }) => darken(0.1, theme.correct)};
`

const ExplanationTextStyles = styled.div`
  font-weight: 700;
  margin-top: 1rem;
`

const NormalText = styled.div`
  font: 1.4rem 'Open Sans';
  margin-bottom: 0.5rem;
`

const ExplainationComponent: React.FC<ExplainationProps> = ({ question, answer, lang }) => {
  const correct: boolean = question.answer === answer

  return (
    <ExplanationStyles id="explanation" $correct={correct}>
      <div>
        {translate('content.exam.explain.yours')}
        <StatusStyles $correct={correct}>
          {correct ? translate('content.exam.explain.correct') : translate('content.exam.explain.incorrect')}
        </StatusStyles>
      </div>

      <div>
        {translate('content.exam.explain.answer')}
        <CorrectStyles>{formatAnswerLabel(question, lang.code)}</CorrectStyles>
      </div>

      {question.explanation && (
        <ExplanationTextStyles>
          <div>{translate('content.exam.explain.explain')}</div>

          <div>
            <NormalText>{question.explanation}</NormalText>
          </div>
        </ExplanationTextStyles>
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
