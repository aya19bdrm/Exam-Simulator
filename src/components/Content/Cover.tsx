import type { Exam, ThemedStyles } from '../../types'

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

function RenderCover({ title, description, image }: Exam): React.JSX.Element {
  return (
    <CoverStyles>
      {image && <Image src={image} alt="exam logo" />}
      {title && <BigText>{title}</BigText>}
      {description && <NormalText>{description}</NormalText>}
    </CoverStyles>
  )
}

export default React.memo(RenderCover)
