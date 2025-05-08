import type { Exam, PageTypes } from './types'

import React, { useEffect, useState } from 'react'
import LoadingMain from './components/LoadingMain'
import Navigation from './components/Navigation'
import Content from './components/Content'
import { defaultSession, type Session, SessionContext } from './session'
import { ExamContext } from './exam'

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<PageTypes>('exam')
  const [exam, setExam] = useState<Exam | null>(null)
  const [session, setSession] = useState<Session>(defaultSession)

  useEffect(() => {
    import('./exam.json').then((data) => {
      const exam: Exam = data.default as Exam
      setExam(exam)
    })

    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingMain size={100} height={100} />
  }

  return (
    <ExamContext.Provider value={exam}>
      <SessionContext.Provider value={session}>
        <Navigation time={0}>
          <Content page={page} open={true} />
        </Navigation>
      </SessionContext.Provider>
    </ExamContext.Provider>
  )
}

export default App
