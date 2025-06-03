import type { Exam, ThemedStyles } from '../../../types'
import type { Session } from '../../../session'

import React from 'react'
import styled from 'styled-components'
import { translate } from '../../../settings'

const TopDisplayStyles = styled.div<ThemedStyles>`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  & > :first-child {
    font: 2.5rem 'Open Sans';
    font-weight: 700;
    color: ${({ theme }) => theme.grey[10]};
  }
  & > :last-child {
    font: 1.1rem 'Open Sans';
    font-weight: 700;
    color: ${({ theme }) => theme.grey[10]};
    margin-left: 0.75rem;
    margin-top: 0.75rem;
  }
`

const TopDisplayComponent: React.FC<ReviewTopDisplayProps> = ({ exam, session: { index } }) => (
  <TopDisplayStyles>
    <div>{translate('content.exam.top-display.question', [index + 1, exam.test.length])}</div>
  </TopDisplayStyles>
)

export default TopDisplayComponent

export interface ReviewTopDisplayProps {
  exam: Exam
  session: Session
}
