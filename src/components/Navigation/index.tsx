import type { Session, SessionDispatch } from '../../session'
import type { LangCode } from '../../settings'

import React, { useContext, useEffect, useReducer, useState } from 'react'
import Drawer from './Drawer'
import Footer from './Footer'
// import Confirm from '../Confirm'
import { Main } from '../../styles/Main'
import { ExamContext } from '../../exam'
import { SessionContext, SessionReducer } from '../../session'

// const Navigation: React.FC<NavigationProps> = ({})=>{}

export default ({ children, startingSession, setLang }: NavigationProps): React.JSX.Element => {
  const [session, updateSession] = useReducer(SessionReducer, startingSession)
  const exam = useContext(ExamContext)

  const [open, setOpen] = useState<boolean>(true)
  // const [confirmBeginExam, setConfirmBeginExam] = useState<boolean>(false)
  // const [confirmEndExam, setConfirmEndExam] = useState<boolean>(false)
  // const [confirmTimeExpired, setConfirmTimeExpired] = useState<boolean>(false)
  // const [confirmReviewExam, setConfirmReviewExam] = useState<boolean>(false)
  // const [confirmSaveSession, setConfirmSaveSession] = useState<boolean>(false)
  // const [confirmStartSession, setConfirmStartSession] = useState<boolean>(false)
  // const [confirmPauseTimer, setConfirmPauseTimer] = useState<boolean>(false)
  // const [confirmDeleteExam, setConfirmDeleteExam] = useState<boolean>(false)
  // const [confirmDeleteHistory, setConfirmDeleteHistory] = useState<boolean>(false)
  // const [confirmDeleteSession, setConfirmDeleteSession] = useState<boolean>(false)
  // const [showNotes, setShowNotes] = useState<boolean>(false)

  session.update = ((type, payload) => {
    updateSession({ type, payload })
  }) as SessionDispatch

  // useEffect(() => {
  //   if (time === 0) {
  //     setConfirmTimeExpired(true)
  //   }
  // }, [time])

  useEffect(() => {
    session.update = ((type, payload) => {
      updateSession({ type, payload })
    }) as SessionDispatch
  }, [startingSession])

  const toggleOpen = () => setOpen(!open)

  return (
    <SessionContext.Provider value={session}>
      <>
        <Drawer open={open} toggleOpen={toggleOpen} />

        <Main $open={open}>{children}</Main>

        {exam && <Footer open={open} exam={exam} session={session} setLang={setLang} />}

        {/* <Confirm
        show={confirmBeginExam}
        title="Start Exam"
        message={`Do you want to start ${exam ? exam.title : 'this exam'} ?`}
        buttons={['Start Exam', 'Cancel']}
        onConfirm={startExam}
        onClose={() => setConfirmBeginExam(false)}
      />
      <Confirm
        show={confirmEndExam}
        title="End Exam"
        message="Do you want to end exam ?"
        buttons={['End Exam', 'Cancel']}
        onConfirm={handleEndExam}
        onClose={() => setConfirmEndExam(false)}
      />
      <Confirm
        show={confirmTimeExpired}
        title="Time Expired"
        message="Time has expired. Your exam has ended."
        buttons={['Continue']}
        onConfirm={endExamExpired}
      />
      <Confirm
        show={confirmReviewExam}
        title="Review Exam"
        message="Do you want to review exam report ?"
        buttons={['Review Exam', 'Cancel']}
        onConfirm={reviewExam}
        onClose={() => setConfirmReviewExam(false)}
      />
      <Confirm
        show={confirmSaveSession}
        title="Save Session"
        message="Do you want to save current session and exit ?"
        buttons={['Save Session', 'Cancel']}
        onConfirm={handleSaveSession}
        onClose={() => setConfirmSaveSession(false)}
      />
      <Confirm
        show={confirmStartSession}
        title="Resume Session"
        message="Do you want to resume current session ?"
        buttons={['Resume Session', 'Cancel']}
        onConfirm={startSession}
        onClose={() => setConfirmStartSession(false)}
      />
      <Confirm
        show={confirmPauseTimer}
        title="Exam Paused"
        message="Exam paused. Click to resume."
        buttons={['Resume Exam']}
        onConfirm={unPauseExam}
        onClose={() => {}}
      />
      <Confirm
        show={confirmDeleteExam}
        title="Delete Exam"
        message={`Do you want to delete ${exam ? exam.title : 'this exam'} ?`}
        buttons={['Delete Exam', 'Cancel']}
        onConfirm={handleDeleteExam}
        onClose={() => setConfirmDeleteExam(false)}
      />
      <Confirm
        show={confirmDeleteHistory}
        title="Delete History"
        message={`Do you want to delete this exam history report ?`}
        buttons={['Delete History', 'Cancel']}
        onConfirm={handleDeleteHistory}
        onClose={() => setConfirmDeleteHistory(false)}
      />
      <Confirm
        show={confirmDeleteSession}
        title="Delete Session"
        message={`Do you want to delete this exam session ?`}
        buttons={['Delete Session', 'Cancel']}
        onConfirm={handleDeleteSession}
        onClose={() => setConfirmDeleteSession(false)}
      /> */}
      </>
    </SessionContext.Provider>
  )
}

export interface NavigationProps {
  children: React.ReactElement | React.ReactElement[]
  startingSession: Session
  setLang: (lang: LangCode) => void
}
