import type { Exam, ThemedStyles } from '../../../types'
import type { LangCode } from '../../../settings'
import type { Session } from '../../../session'

import React from 'react'
import styled from 'styled-components'
import lighten from 'polished/lib/color/lighten'
import { Language } from '@styled-icons/material/Language'
import Timer from './Timer'
import Arrows from './Arrows'

const FooterStyles = styled.div<FooterStylesProps>`
  position: fixed;
  width: 100%;
  height: 5rem;
  bottom: 0;
  left: ${({ $open }) => ($open ? '24rem' : '5rem')};
  z-index: 2;
  transition: 0.3s;
  background: ${({ theme }) => theme.grey[0]};
  border-top: 1px solid ${({ theme }) => theme.grey[1]};
`

const InnerFooterStyles = styled.div<InnerFooterStylesProps>`
  width: ${({ $open }) => ($open ? 'calc(100% - 24rem)' : 'calc(100% - 5rem)')};
  height: 100%;
  display: grid;
  grid-template-columns: 10rem 1fr 5rem;
  align-items: center;
  transition: 0.3s;
`

const LanguageStyles = styled.div<ThemedStyles>`
  .language {
    height: 5rem;
    display: grid;
    justify-self: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background: ${({ theme }) => lighten(0.2, theme.primary)};
    }
    svg {
      color: ${({ theme }) => theme.black};
    }
  }
`

const FooterComponent: React.FC<NavigationFooterProps> = ({ open, exam, session, setLang }) => {
  return (
    <FooterStyles id="footer" $open={open}>
      <InnerFooterStyles id="inner-footer" $open={open}>
        <Timer session={session} />

        <Arrows session={session} questionCount={exam.test.length} />

        <LanguageStyles
          className="language"
          onClick={() => setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar')}
        >
          <Language size={30} />
        </LanguageStyles>
      </InnerFooterStyles>
    </FooterStyles>
  )
}

export default FooterComponent

export interface NavigationFooterProps {
  open: boolean
  exam: Exam
  session: Session
  setLang: (lang: LangCode) => void
}

export interface FooterStylesProps extends ThemedStyles {
  $open: boolean
}

export interface InnerFooterStylesProps extends ThemedStyles {
  $open: boolean
}
