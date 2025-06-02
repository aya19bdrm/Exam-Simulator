import type { Exam } from './types'

import React, { useEffect, useState } from 'react'
import LoadingMain from './components/LoadingMain'
import Header from './components/Header'
import Navigation from './components/Navigation'
import { defaultSession, type Session } from './session'
import { ExamContext } from './exam'
import { type Lang, LangContext, setTranslation, langs, LangCode } from './settings'
import { useForceUpdate, useLocalStorage } from './@mantine/hooks'
import { formatExam, formatSession } from './utils/format'

export default ({}): React.JSX.Element => {
  const [lang, setLang] = useLocalStorage<Lang>({ key: 'settings.lang', defaultValue: langs.ar })
  const [loading, setLoading] = useState<number>(2)
  const [exam, setExam] = useState<Exam | null>(null)
  const [session, setSession] = useState<Session>(defaultSession)
  const forceUpdate = useForceUpdate()

  useEffect(() => {
    import('./assets/exams/exam1.json').then((data) => {
      // @ts-expect-error
      let exam: Exam = data.default as Exam
      exam = formatExam(exam)
      setExam(exam)

      setSession(formatSession(session, exam))

      setLoading((prev) => prev - 1)
    })

    import('./session.json').then((data) => {
      // @ts-expect-error
      const session: Session = data.default as Session
      if (exam) {
        setSession(formatSession(session, exam))
      } else {
        setSession(session)
      }

      setLoading((prev) => prev - 1)
    })
  }, [])

  useEffect(() => {
    import(`./langs/${lang.code}.json`).then((data) => {
      const translations: object = data.default as object

      setTranslation(lang, translations)
      forceUpdate()
    })

    document.documentElement.lang = lang.code
    // document.documentElement.dir = lang.dir
  }, [lang])

  if (loading > 0) {
    return <LoadingMain size={100} height={100} />
  }

  return (
    <LangContext.Provider value={lang}>
      <ExamContext.Provider value={exam}>
        <Header exam={exam} />

        <Navigation startingSession={session} setLang={(code: LangCode) => setLang(langs[code])} />
      </ExamContext.Provider>
    </LangContext.Provider>
  )
}
