import type { Session, SessionDispatch } from '../../session'

import React, { useContext, useEffect, useReducer, useState } from 'react'
import Drawer from './Drawer'
import Footer from './Footer'
import Confirm, { type ConfirmProps } from '../Confirm'
import Content from '../Content'
import { Main } from '../../styles/Main'
import { ExamContext } from '../../exam'
import { SessionActionTypes, SessionContext, SessionReducer } from '../../session'
import { timerHaveExpired, timerIsPaused } from '../../utils/state'
import { translate, type LangCode } from '../../settings'

const NavigationComponent: React.FC<NavigationProps> = ({ startingSession, onSessionUpdate, setLang }) => {
  const [session, updateSession] = useReducer(SessionReducer, startingSession)
  const exam = useContext(ExamContext)
  const [open, setOpen] = useState<boolean>(true)

  session.update = ((type, payload) => {
    updateSession({ type, payload })
    onSessionUpdate(SessionReducer(session, { type, payload }))
  }) as SessionDispatch

  useEffect(() => {
    session.update = ((type, payload) => {
      updateSession({ type, payload })
      onSessionUpdate(SessionReducer(session, { type, payload }))
    }) as SessionDispatch
  }, [startingSession])

  const toggleOpen = () => setOpen(!open)

  if (!exam) return null

  const confirms: Omit<MyConfirmProps, 'title' | 'message' | 'buttons'>[] = [
    {
      id: 'expired',
      show: timerHaveExpired(session),
      onConfirm: () => {
        session.update!(SessionActionTypes.SET_TIME, 0)
        session.update!(SessionActionTypes.SET_TIMER_PAUSED, true)
        session.update!(SessionActionTypes.SET_EXAM_STATE, 'completed')
      }
    },
    {
      id: 'pause',
      show: timerIsPaused(session),
      onConfirm: () => session.update!(SessionActionTypes.SET_TIMER_PAUSED, false)
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

        <Main $open={open}>
          <Content session={session} />
        </Main>

        {exam && <Footer open={open} exam={exam} session={session} setLang={setLang} />}

        {newConfirms
          .filter((c) => c.show)
          .map((c, i) => (
            <Confirm
              key={`${c.id}-${i}`}
              title={c.title}
              message={c.message}
              buttons={c.buttons}
              onConfirm={c.onConfirm}
              onClose={c.onClose}
            />
          ))}
      </div>
    </SessionContext.Provider>
  )
}

export default NavigationComponent

export interface NavigationProps {
  startingSession: Session
  onSessionUpdate: (session: Session) => void
  setLang: (lang: LangCode) => void
}

export interface MyConfirmProps extends ConfirmProps {
  id: string
  show: boolean
}
