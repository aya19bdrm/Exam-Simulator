import type { Exam, PageTypes } from './types'

import React, { useEffect, useState } from 'react'
import LoadingMain from './components/LoadingMain'
import Navigation from './components/Navigation'
import Content from './components/Content'
import { defaultSession, type Session } from './session'
import { ExamContext } from './exam'

export default ({}) => {
  const [loading, setLoading] = useState<number>(2)
  const [page, setPage] = useState<PageTypes>('exam')
  const [exam, setExam] = useState<Exam | null>(null)
  const [session, setSession] = useState<Session>(defaultSession)

  useEffect(() => {
    import('./exam.json').then((data) => {
      const exam: Exam = data.default as Exam
      setExam(exam)

      setLoading((prev) => prev - 1)
    })

    import('./session.json').then((data) => {
      const session: Session = data.default as Session
      setSession(session)

      setLoading((prev) => prev - 1)
    })
  }, [])

  if (loading > 0) {
    return <LoadingMain size={100} height={100} />
  }

  return (
    <ExamContext.Provider value={exam}>
      <Navigation startingSession={session}>
        <Content page={page} open={true} />
      </Navigation>
    </ExamContext.Provider>
  )
}
