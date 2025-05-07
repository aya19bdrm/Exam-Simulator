import type {} from '../../../types'

import React, { useContext } from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay from './TopDisplay'
import Question from './Question'
import MultipleChoice from './MultipleChoice'
import MultipleAnswer from './MultipleAnswer'
import { ExamContext } from '../../../exam'
import { SessionContext } from '../../../session'

const TestStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({}: ExamProps): React.JSX.Element => {
  const exam = useContext(ExamContext)
  const session = useContext(SessionContext)

  if (!exam) return <></>

  const { questionIndex } = session
  const question = exam.test[questionIndex]

  return (
    <TestStyles>
      <TopDisplay exam={exam} session={session} />

      <Slide key={questionIndex} direction="right">
        <Question {...question} />

        {question.type === 'multiple-choice' ? (
          <MultipleChoice exam={exam} session={session} />
        ) : question.type === 'multiple-answer' ? (
          <MultipleAnswer exam={exam} session={session} />
        ) : null}
      </Slide>
    </TestStyles>
  )
}

export interface ExamProps {}
