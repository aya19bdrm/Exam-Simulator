import type { Exam, ThemedStyles } from '../types'

import React from 'react'
import styled from 'styled-components'
// @ts-expect-error
import Logo from '../assets/logo.png'

const HeaderStyles = styled.div<HeaderStylesProps>`
  position: fixed;
  width: 100%;
  height: 5rem;
  top: 0;
  z-index: 2;
  transition: 0.3s;
  background: ${({ theme }) => theme.primary};
`

export const InnerHeader = styled.div<ThemedStyles>`
  height: 5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 8rem 1fr;
  .title {
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${({ theme }) => theme.black};
    margin-left: 1rem;
  }
  .image {
    justify-self: center;
    width: 6rem;
    height: 6rem;
  }
`

const HeaderComponent: React.FC<HeaderProps> = ({ exam }) => {
  if (!exam) return <></>

  return (
    <HeaderStyles id="header" $dir={'rtl'}>
      <InnerHeader id="inner-header" dir={'rtl'}>
        <img className="image" src={Logo} />
        <div className="title">{exam.title}</div>
      </InnerHeader>
    </HeaderStyles>
  )
}

export default HeaderComponent

export interface HeaderStylesProps extends ThemedStyles {
  $dir: 'rtl' | 'ltr'
}

export interface HeaderProps {
  exam: Exam | null
}
