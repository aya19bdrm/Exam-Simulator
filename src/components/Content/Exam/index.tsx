import React, { useContext } from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay from './TopDisplay'
import Question from './Question'
import MultipleChoice from './MultipleChoice'
import MultipleAnswer from './MultipleAnswer'
import { ExamContext } from '../../../exam'
import { SessionContext } from '../../../session'
import { LangContext } from '../../../settings'

const TestStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({}: object): React.JSX.Element => {
  const exam = useContext(ExamContext)
  const session = useContext(SessionContext)
  const lang = useContext(LangContext)

  if (!exam) return <></>

  const question = exam.test[session.index]

  return (
    <TestStyles id="exam" dir={lang.dir}>
      <TopDisplay exam={exam} session={session} lang={lang} />

      <Slide key={session.index} direction="right">
        <Question {...question} />

        {question.type === 'multiple-choice' ? (
          <MultipleChoice exam={exam} session={session} lang={lang} />
        ) : question.type === 'multiple-answer' ? (
          <MultipleAnswer exam={exam} session={session} lang={lang} />
        ) : null}
      </Slide>
    </TestStyles>
  )
}
