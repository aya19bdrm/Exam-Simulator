import type { ThemedStyles } from '../../types'
import type { Session } from '../../session'

import React from 'react'
import styled from 'styled-components'
import Exam from './Exam'
import Review from './Review'
import { examFinished } from '../../utils/state'

const ContentStyles = styled.div<ThemedStyles>`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  padding-right: 28rem;
  transition: 0.3s;
`

const ContentComponent: React.FC<ContentProps> = ({ session }) => {
  return <ContentStyles id="content">{examFinished(session) ? <Review /> : <Exam />}</ContentStyles>
}

export default ContentComponent

export interface ContentProps {
  session: Session
}
