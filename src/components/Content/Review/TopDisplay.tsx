import type { Exam, ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'

const TopDisplayStyles = styled.div<ThemedStyles>`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  & > :first-child {
    font: 2.5rem 'Open Sans';
    font-weight: 700;
    color: ${(props) => props.theme.grey[10]};
  }
  & > :last-child {
    font: 1.1rem 'Open Sans';
    font-weight: 700;
    color: ${(props) => props.theme.grey[10]};
    margin-left: 0.75rem;
    margin-top: 0.75rem;
  }
`

export default ({ exam, reviewQuestion, reviewType }: ReviewTopDisplayProps): React.JSX.Element => (
  <TopDisplayStyles>
    <div>
      Question {reviewQuestion + 1} of {exam ? exam.test.length : ''}
    </div>

    <div>[ {reviewType === 0 ? 'All ' : reviewType === 1 ? 'Incorrect ' : 'Incomplete '}Questions ]</div>
  </TopDisplayStyles>
)

export interface ReviewTopDisplayProps {
  exam: Exam
  reviewQuestion: number
  reviewType: number
}
