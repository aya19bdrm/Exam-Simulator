import type { Session, SessionDispatch } from '../../session'
import { translate, type LangCode } from '../../settings'

import React, { useContext, useEffect, useReducer, useState } from 'react'
import Drawer from './Drawer'
import Footer from './Footer'
import Confirm, { type ConfirmProps } from '../Confirm'
import { Main } from '../../styles/Main'
import { ExamContext } from '../../exam'
import { SessionActionTypes, SessionContext, SessionReducer } from '../../session'
import { haveExpired, isPaused, wantsToEnd, canBegin } from '../../utils/state'

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

  const confirms: Omit<MyConfirmProps, 'title' | 'message' | 'buttons'>[] = [
    {
      id: 'start',
      show: canBegin(session),
      onConfirm: () => {
        session.update!(SessionActionTypes.SET_TIME, session.maxTime)
        session.update!(SessionActionTypes.SET_TIMER_STATE, 'running')
      }
    },
    {
      id: 'expired',
      show: haveExpired(session),
      onConfirm: () => session.update!(SessionActionTypes.SET_TIMER_STATE, 'stopped')
    },
    {
      id: 'end',
      show: wantsToEnd(session),
      onConfirm: () => session.update!(SessionActionTypes.SET_TIME, session.maxTime + session.time)
    },
    {
      id: 'pause',
      show: isPaused(session),
      onConfirm: () => session.update!(SessionActionTypes.SET_TIMER_STATE, 'running')
    }
  ]
  const newConfirms: MyConfirmProps[] = confirms.map((c) => ({
    ...c,
    title: translate(`confirm.${c.id}.title`),
    message: translate(`confirm.${c.id}.message`),
    buttons: [translate(`confirm.${c.id}.button0`), translate(`confirm.${c.id}.button1`)].filter(
      (str) => str !== ''
    ) as [string, string]
  }))

  return (
    <SessionContext.Provider value={session}>
      <div id="navigation">
        <Drawer open={open} session={session} toggleOpen={toggleOpen} />

        <Main $open={open}>{children}</Main>

        {exam && <Footer open={open} exam={exam} session={session} setLang={setLang} />}

        {newConfirms.map(
          (c, i) =>
            c.show && (
              <Confirm
                key={i}
                title={c.title}
                message={c.message}
                buttons={c.buttons}
                onConfirm={c.onConfirm}
                onClose={c.onClose}
              />
            )
        )}
      </div>
    </SessionContext.Provider>
  )
}

export interface NavigationProps {
  children: React.ReactElement | React.ReactElement[]
  startingSession: Session
  setLang: (lang: LangCode) => void
}

export interface MyConfirmProps extends ConfirmProps {
  id: string
  show: boolean
}
