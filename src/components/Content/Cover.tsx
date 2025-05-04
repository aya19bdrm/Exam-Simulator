import type { Cover, ThemedStyles } from '../../types'

import React from 'react'
import styled from 'styled-components'
import { Image, BigText, NormalText } from '../../styles/repeated'

const CoverStyles = styled.div<ThemedStyles>`
  width: 50vw;
  height: calc(100vh - 14rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.grey[0]};
  border: 1px solid ${(props) => props.theme.grey[2]};
`

function RenderCover({ cover }: CoverProps): React.JSX.Element {
  return (
    <CoverStyles>
      {cover.map(({ variant, text }, i) =>
        variant === 0 ? (
          <Image key={i} src={text} />
        ) : variant === 1 ? (
          <NormalText key={i}>{text}</NormalText>
        ) : variant === 2 ? (
          <BigText key={i}>{text}</BigText>
        ) : null
      )}
    </CoverStyles>
  )
}

export default React.memo(RenderCover)

export interface CoverProps {
  cover: Cover
}
