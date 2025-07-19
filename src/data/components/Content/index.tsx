import type { ThemedStyles } from '../../types'
import type { Session } from '../../session'

import React from 'react'
import styled from 'styled-components'
import Exam from './Exam'
import Review from './Review'

const ContentStyles = styled.div<ThemedStyles>`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  padding-right: 28rem;
  transition: 0.3s;
`

const ContentComponent: React.FC<ContentProps> = ({ session }) => {
  const finished = session.examState === 'completed'

  return <ContentStyles id="content">{finished ? <Review /> : <Exam />}</ContentStyles>
}

export default ContentComponent

export interface ContentProps {
  session: Session
}
