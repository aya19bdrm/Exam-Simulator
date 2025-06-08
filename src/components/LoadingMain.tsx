import type { ThemedStyles } from '../types'

import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Repeat } from '@styled-icons/material'
import { translate } from '../settings'

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoadingStyles = styled.div<LoadingStylesProps>`
  width: 100%;
  height: ${({ height }) => height}vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ color, theme }) => (color === 'grey' ? theme.grey[0] : 'white')};
  svg {
    color: ${({ theme }) => theme.secondary};
    animation: ${rotate} 1s infinite;
  }
`

export const TitleStyles = styled.div<ThemedStyles>`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 6rem 'Open Sans';
  font-weight: 700;
  color: ${({ theme }) => theme.black};
  margin-bottom: 5rem;
  img {
    width: 5rem;
    height: 5rem;
  }
`

const LoadingMainComponent: React.FC<LoadingMainProps> = ({ size, height }) => (
  <LoadingStyles id="loading-main" color="grey" height={height}>
    <TitleStyles>
      <span>{translate('loading')}</span>
    </TitleStyles>

    <Repeat size={size} />
  </LoadingStyles>
)

export default LoadingMainComponent

export interface LoadingMainProps {
  size: number
  height: number
}

export interface LoadingStylesProps extends ThemedStyles {
  color: string
  height: number
}
