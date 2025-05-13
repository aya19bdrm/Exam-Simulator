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
  left: ${(props) => (props.$open ? '24rem' : '5rem')};
  z-index: 2;
  transition: 0.3s;
  background: ${(props) => props.theme.grey[0]};
  border-top: 1px solid ${(props) => props.theme.grey[1]};
`

export default ({ open, exam, session, setLang }: NavigationFooterProps): React.JSX.Element => {
  return (
    <FooterStyles $open={open}>
      <ExamFooter open={open} session={session} questionCount={exam.test.length} setLang={setLang} />
    </FooterStyles>
  )
}

export interface NavigationFooterProps {
  open: boolean
  exam: Exam
  session: Session
  setLang: (lang: LangCode) => void
}

export interface FooterStylesProps extends ThemedStyles {
  $open: boolean
}
