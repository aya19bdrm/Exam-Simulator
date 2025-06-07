import React, { useContext } from 'react'
import Summary from './Summary'
import ReviewExam from './Review'
import { ExamContext } from '../../../exam'
import { SessionContext } from '../../../session'
import { LangContext } from '../../../settings'

const ReviewComponent: React.FC<object> = ({}) => {
  const exam = useContext(ExamContext)
  const session = useContext(SessionContext)
  const lang = useContext(LangContext)

  if (!exam) return <></>

  if (session.reviewState === 'summary') {
    return <Summary exam={exam} session={session} />
  } else {
    return <ReviewExam exam={exam} session={session} lang={lang} />
  }
}

export default ReviewComponent
