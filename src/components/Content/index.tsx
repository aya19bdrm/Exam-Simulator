import type { PageTypes, ThemedStyles } from '../../types'

import React from 'react'
import styled from 'styled-components'
import Cover from './Cover'
import Exam from './Exam'

const ContentStyles = styled.div<ContentStylesProps>`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  padding-right: ${(props) => (props.open ? '28rem' : '7rem')};
  transition: 0.3s;
`

export default (props: ContentProps): React.JSX.Element => {
  return (
    <ContentStyles open={props.open}>
      {props.page === 'cover' ? <Cover /> : props.page === 'exam' ? <Exam /> : null}
    </ContentStyles>
  )
}

export interface ContentProps {
  page: PageTypes
  open: boolean
}

export interface ContentStylesProps extends ThemedStyles {
  open: boolean
}
