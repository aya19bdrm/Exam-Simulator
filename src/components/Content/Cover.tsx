import type { ThemedStyles } from '../../types'

import React from 'react'
import styled from 'styled-components'
import { Image, BigText, NormalText } from '../../styles/repeated'
import { ExamContext } from '../../exam'
import { translate } from '../../settings'
// @ts-expect-error
import Logo from '../../assets/logo.png'

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

export default ({}: object): React.JSX.Element => {
  const exam = React.useContext(ExamContext)
  const { title, description } = exam || {}

  return (
    <CoverStyles>
      {<Image src={Logo} alt={translate('content.cover.logo-alt')} />}
      {title && <BigText>{title}</BigText>}
      {description && <NormalText>{description}</NormalText>}
    </CoverStyles>
  )
}
