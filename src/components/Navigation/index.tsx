import type { Session, SessionDispatch } from '../../session'

import React, { useContext, useEffect, useReducer, useState } from 'react'
import Drawer from './Drawer'
import Footer from './Footer'
import Confirm, { type ConfirmProps } from '../Confirm'
import Content from '../Content'
import { Main } from '../../styles/Main'
import { ExamContext } from '../../exam'
import { SessionActionTypes, SessionContext, SessionReducer } from '../../session'
import { timerHaveExpired, timerIsPaused, examWantsToFinish, examNotStarted, examFinished } from '../../utils/state'
import { translate, type LangCode } from '../../settings'

export default ({ startingSession, setLang }: NavigationProps): React.JSX.Element => {
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
      show: examNotStarted(session),
      onConfirm: () => {
        session.update!(SessionActionTypes.SET_TIME, session.maxTime)
        session.update!(SessionActionTypes.SET_TIMER_STATE, 'running')
        session.update!(SessionActionTypes.SET_EXAM_STATE, 'in-progress')
      }
    },
    {
      id: 'expired',
      show: timerHaveExpired(session),
      onConfirm: () => {
        session.update!(SessionActionTypes.SET_TIME, 0)
        session.update!(SessionActionTypes.SET_TIMER_STATE, 'stopped')
        session.update!(SessionActionTypes.SET_EXAM_STATE, 'completed')
      }
    },
    {
      id: 'end',
      show: examWantsToFinish(session),
      onConfirm: () => {
        session.update!(SessionActionTypes.SET_TIME, session.time)
        session.update!(SessionActionTypes.SET_TIMER_STATE, 'stopped')
        session.update!(SessionActionTypes.SET_EXAM_STATE, 'completed')
      }
    },
    {
      id: 'pause',
      show: timerIsPaused(session),
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

        <Main $open={open}>{<Content page={examFinished(session) ? 'review' : 'exam'} />}</Main>

        {exam && <Footer open={open} exam={exam} session={session} setLang={setLang} />}

        {newConfirms
          .filter((c) => c.show)
          .map((c, i) => (
            <Confirm
              key={i}
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

export interface NavigationProps {
  startingSession: Session
  setLang: (lang: LangCode) => void
}

export interface MyConfirmProps extends ConfirmProps {
  id: string
  show: boolean
}
