import type { Exam, PageTypes } from './types'

import React, { useEffect, useState } from 'react'
import LoadingMain from './components/LoadingMain'
import Content, { type ContentProps } from './components/Content'
import { defaultSession, type Session, SessionContext } from './session'
import { ExamContext } from './exam'

const contentProps: ContentProps = {
  open: true,

  examMode: 0,
  exam: null,
  answers: [],
  fillIns: [],
  marked: [],
  question: 0,
  time: 0,
  explanation: false,
  questionNumber: 0,
  onMultipleChoice: Function,
  onMultipleAnswer: Function
}

function App() {
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<PageTypes>('exam')
  const [exam, setExam] = useState<Exam | null>(null)
  const [session, setSession] = useState<Session>(defaultSession)

  useEffect(() => {
    contentProps.onBookmarkQuestion = (questionNumber: number, toMark: boolean) => {
      if (toMark) {
        contentProps.marked.push(questionNumber)
      } else {
        contentProps.marked = contentProps.marked.filter((q) => q !== questionNumber)
      }
    }

    contentProps.onMultipleChoice = (questionNumber: number, choiceNumber: number) => {
      contentProps.answers[questionNumber] = contentProps.answers[questionNumber] || []
      contentProps.answers[questionNumber].push(contentProps.exam[questionNumber].choices[choiceNumber])
    }

    contentProps.onMultipleAnswer = (questionNumber: number, choiceNumber: number) => {
      contentProps.answers[questionNumber] = contentProps.answers[questionNumber] || []
      contentProps.answers[questionNumber].push(contentProps.exam[questionNumber].choices[choiceNumber])
    }

    import('./exam.json').then((data) => {
      const exam: Exam = data.default as Exam

      setExam(exam)
      contentProps.exam = exam
    })

    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingMain size={100} height={100} />
  }

  return (
    <ExamContext.Provider value={exam}>
      <SessionContext.Provider value={session}>
        {/* <Navigation> */}
        <Content page={page} />
        {/* </Navigation> */}
      </SessionContext.Provider>
    </ExamContext.Provider>
  )
}

export default App
