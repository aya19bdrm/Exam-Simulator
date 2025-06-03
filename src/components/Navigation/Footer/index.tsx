import type { Exam, ThemedStyles } from '../../../types'
import type { LangCode } from '../../../settings'
import type { Session } from '../../../session'

import React from 'react'
import styled from 'styled-components'
import ExamFooter from './ExamFooter'

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

const FooterComponent: React.FC<NavigationFooterProps> = ({ open, exam, session, setLang }) => {
  return (
    <FooterStyles id="footer" $open={open}>
      <ExamFooter open={open} session={session} questionCount={exam.test.length} setLang={setLang} />
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
