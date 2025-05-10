import React, { useContext, useEffect, useState } from 'react'
import Drawer from './Drawer'
// import Footer from './Footer'
// import Confirm from '../Confirm'
import { Main } from '../../styles/Main'
import { ExamContext } from '../../exam'
import { SessionContext } from '../../session'
import Footer from './Footer'

// const Navigation: React.FC<NavigationProps> = ({})=>{}

export default ({ children }: NavigationProps): React.JSX.Element => {
  const exam = useContext(ExamContext)
  const session = useContext(SessionContext)

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

  // useEffect(() => {
  //   if (time === 0) {
  //     setConfirmTimeExpired(true)
  //   }
  // }, [time])

  const toggleOpen = () => setOpen(!open)

  return (
    <>
      <Drawer open={open} toggleOpen={toggleOpen} />

      <Main $open={open}>{children}</Main>

      {exam && <Footer open={open} exam={exam} session={session} />}

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
  )
}

export interface NavigationProps {
  children: React.ReactElement | React.ReactElement[]
}
