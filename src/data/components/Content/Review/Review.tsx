import type { Exam } from '../../../types'
import type { Session } from '../../../session'
import type { Lang } from '../../../settings'

import React from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay from './TopDisplay'
import Question from '../Exam/Question'
import MultipleChoice from '../Exam/MultipleChoice'
import MultipleAnswer from '../Exam/MultipleAnswer'
import Explanation from '../Exam/Explanation'

const ReviewExamStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

const ReviewComponent: React.FC<ReviewExamProps> = ({ exam, session, lang }) => {
  const { index } = session
  const question = exam.test[index]

  return (
    <ReviewExamStyles>
      <TopDisplay exam={exam} session={session} />
      <Slide key={index} direction="right">
        <Question {...question} />

        {question.type === 'multiple-choice' ? (
          <MultipleChoice exam={exam} session={session} lang={lang} />
        ) : question.type === 'multiple-answer' ? (
          <MultipleAnswer exam={exam} session={session} lang={lang} />
        ) : null}

        <Slide direction="bottom">
          <Explanation question={question} answer={session.answers[session.index]} lang={lang} />
        </Slide>
      </Slide>
    </ReviewExamStyles>
  )
}

export default ReviewComponent

export interface ReviewExamProps {
  exam: Exam
  session: Session
  lang: Lang
}
