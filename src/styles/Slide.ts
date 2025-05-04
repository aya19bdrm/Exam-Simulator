import type { SlideProps } from '../types'

import styled, { keyframes } from 'styled-components'

const slideFromRight = keyframes`
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(0)
  }
`

const slideFromBottom = keyframes`
  from {
    transform: translateY(100vw);
  }
  to {
    transform: translateY(0)
  }
`

export const Slide = styled.div<SlideProps>`
  width: 100%;
  animation: ${(props) =>
      props.direction === 'right' ? slideFromRight : props.direction === 'bottom' ? slideFromBottom : null}
    0.5s;
`
