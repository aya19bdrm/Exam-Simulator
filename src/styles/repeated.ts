import type { ThemedStyles } from '../types'

import styled from 'styled-components'

export const Image = styled.img<ThemedStyles>`
  max-height: 40vh;
  margin-bottom: 0.5rem;
  border: 1px solid ${(props) => props.theme.grey[2]};
`

export const NormalText = styled.div`
  font: 1.25rem 'Open Sans';
`

export const BigText = styled.div<ThemedStyles>`
  font: 3rem 'Open Sans';
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.black};
`
