import type { ThemedStyles } from '../types'

import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Repeat } from '@styled-icons/material'

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
  height: ${(props) => props.height}vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.color === 'grey' ? props.theme.grey[0] : 'white')};
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    font: 6rem 'Open Sans';
    font-weight: 700;
    color: ${(props) => props.theme.black};
    margin-bottom: 5rem;
    img {
      width: 5rem;
      height: 5rem;
    }
  }
  svg {
    color: ${(props) => props.theme.secondary};
    animation: ${rotate} 1s infinite;
  }
`

export default ({ size, height }) => (
  <LoadingStyles color="grey" height={height}>
    <div className="title">
      <span>Creativity House - محاكي الإختبار</span>
    </div>

    <Repeat size={size} />
  </LoadingStyles>
)

export interface LoadingStylesProps extends ThemedStyles {
  color: string
  height: number
}
