import type { Session, SessionDispatch } from '../../session'
import type { LangCode } from '../../settings'

import React, { useContext, useEffect, useReducer, useState } from 'react'
import Drawer from './Drawer'
import Footer from './Footer'
import { Main } from '../../styles/Main'
import { ExamContext } from '../../exam'
import { SessionContext, SessionReducer } from '../../session'

export default ({ children, startingSession, setLang }: NavigationProps): React.JSX.Element => {
  const [session, updateSession] = useReducer(SessionReducer, startingSession)
  const exam = useContext(ExamContext)

  const [open, setOpen] = useState<boolean>(true)

  session.update = ((type, payload) => {
    updateSession({ type, payload })
  }) as SessionDispatch

  useEffect(() => {
    session.update = ((type, payload) => {
      updateSession({ type, payload })
    }) as SessionDispatch
  }, [startingSession])

  const toggleOpen = () => setOpen(!open)

  if (!exam) return <></>

  return (
    <SessionContext.Provider value={session}>
      <Drawer open={open} session={session} toggleOpen={toggleOpen} />

      <Main $open={open}>{children}</Main>

      {exam && <Footer open={open} exam={exam} session={session} setLang={setLang} />}
    </SessionContext.Provider>
  )
}

export interface NavigationProps {
  children: React.ReactElement | React.ReactElement[]
  startingSession: Session
  setLang: (lang: LangCode) => void
}
