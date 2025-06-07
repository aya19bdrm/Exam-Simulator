import type { PageTypes, ThemedStyles } from '../../types'

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

const ContentComponent: React.FC<ContentProps> = ({ page }) => {
  return (
    <ContentStyles id="content">{page === 'exam' ? <Exam /> : page === 'review' ? <Review /> : null}</ContentStyles>
  )
}

export default ContentComponent

export interface ContentProps {
  page: PageTypes
}
