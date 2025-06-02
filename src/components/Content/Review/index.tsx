import React, { useContext } from 'react'
import Summary from './Summary'
import ReviewExam from './Review'
import { ExamContext } from '../../../exam'
import { SessionContext } from '../../../session'
import { LangContext } from '../../../settings'

export default ({}: object): React.JSX.Element => {
  const exam = useContext(ExamContext)
  const session = useContext(SessionContext)
  const lang = useContext(LangContext)

  if (!exam) return <></>

  // if (reviewMode === 0) {
  // return <Summary exam={exam} session={session} />
  // } else {
  return <ReviewExam exam={exam} session={session} lang={lang} />
  // }
}
