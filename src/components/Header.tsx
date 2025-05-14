import type { Exam, ThemedStyles } from '../types'
import type { LangDir } from '../settings'

import React from 'react'
import styled from 'styled-components'

// import { BLUE_LOGO_PATH } from '../../../utils/filepaths'

const HeaderStyles = styled.div<HeaderStylesProps>`
  position: fixed;
  width: 100%;
  height: 5rem;
  top: 0;
  z-index: 2;
  transition: 0.3s;
  background: ${(props) => props.theme.primary};
`
// ${(props) => (props.$dir === 'rtl' ? 'right' : 'left')}: ${(props) => (props.$open ? '24rem' : '5rem')};

export const InnerHeader = styled.div<ThemedStyles>`
  height: 5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 6rem 1fr;
  .title {
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${(props) => props.theme.black};
    margin-left: 1rem;
  }
  .image {
    justify-self: center;
    width: 3rem;
    height: 3rem;
  }
  .subtitle {
    font: 1.1rem 'Open Sans';
    font-weight: 700;
    color: ${(props) => props.theme.grey[10]};
    margin-top: 0.5rem;
    margin-left: 1rem;
  }
`

export default ({ open, exam }: HeaderProps): React.JSX.Element => {
  if (!exam) return <></>

  return (
    <HeaderStyles $open={open} $dir={'rtl'}>
      <InnerHeader dir={'rtl'}>
        <img className="image" src={exam.image} />
        <div className="title">{exam.title}</div>
      </InnerHeader>
    </HeaderStyles>
  )
}

export interface HeaderStylesProps extends ThemedStyles {
  $open: boolean
  $dir: 'rtl' | 'ltr'
}

export interface HeaderProps {
  open: boolean
  exam: Exam | null
}
