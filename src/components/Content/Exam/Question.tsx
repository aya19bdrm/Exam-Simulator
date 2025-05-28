import type { Question } from '../../../types'

import React from 'react'
import { styled } from 'styled-components'

const QuestionStyles = styled.div`
  & > :last-child {
    margin-bottom: 2rem;
  }
`

const NormalText = styled.div`
  font: 2rem 'Open Sans';
  margin-bottom: 0.5rem;
`

export default ({ text }: Question): React.JSX.Element => {
  return <QuestionStyles data-test="Question">{text && <NormalText>{text}</NormalText>}</QuestionStyles>
}
