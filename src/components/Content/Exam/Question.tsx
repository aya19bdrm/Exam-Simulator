import type { Question } from '../../../types'

import React from 'react'
import { styled } from 'styled-components'

const QuestionStyles = styled.div`
  & > :last-child {
    margin-bottom: 2rem;
  }
`

// const Image = styled.img<ThemedStyles>`
//   max-width: 75vw;
//   max-height: 60vh;
//   margin-top: 1rem;
//   margin-bottom: 1rem;
//   border: 1px solid ${(props) => props.theme.grey[1]};
// `

const NormalText = styled.div`
  font: 1.4rem 'Open Sans';
  margin-bottom: 0.5rem;
`

export default ({ text }: Question): React.JSX.Element => {
  return (
    <QuestionStyles data-test="Question">
      {/* {question.image && <React.Fragment key={index}><Image src={text} /><br /></React.Fragment>} */}
      {text && <NormalText>{text}</NormalText>}
    </QuestionStyles>
  )
}
