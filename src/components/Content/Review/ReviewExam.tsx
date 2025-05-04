import type { ExamReport } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay, { type ReviewTopDisplayProps } from './TopDisplay'
import Question from '../Exam/Question'
import MultipleChoice from '../Exam/MultipleChoice'
import MultipleAnswer from '../Exam/MultipleAnswer'
import FillIn from '../Exam/FillIn'
import StaticList from './StaticList'
import Explanation from '../Exam/Explanation'

const ReviewExamStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({ exam, report, reviewQuestion, reviewType }: ReviewExamProps): React.JSX.Element => (
  <ReviewExamStyles>
    <TopDisplay exam={exam} reviewQuestion={reviewQuestion} reviewType={reviewType} />

    {exam.test.map((el, i) => {
      if (i !== reviewQuestion) {
        return null
      }

      const { variant } = el

      return (
        <Slide key={i} direction="right">
          <Question review={true} question={el.question} />

          {variant === 0 ? (
            <MultipleChoice review={true} question={el} answers={report.answers[i]} />
          ) : variant === 1 ? (
            <MultipleAnswer review={true} question={el} answers={report.answers[i]} />
          ) : variant === 2 ? (
            <FillIn review={true} fillIn={report.fillIns[i]} />
          ) : variant === 3 ? (
            <StaticList choices={el.choices} order={report.orders[i]} />
          ) : null}

          <Slide direction="bottom">
            <Explanation explanationRef={null} question={el} answers={report.answers[i]} />
          </Slide>
        </Slide>
      )
    })}
  </ReviewExamStyles>
)

export interface ReviewExamProps extends ReviewTopDisplayProps {
  report: ExamReport
}
