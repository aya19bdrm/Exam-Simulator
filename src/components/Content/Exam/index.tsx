import type { Choice, Exam, QuestionType } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay from './TopDisplay'
import Question from './Question'
import MultipleChoice from './MultipleChoice'
import MultipleAnswer from './MultipleAnswer'
import FillIn from './FillIn'
import Explanation from './Explanation'

const TestStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({
  explanationRef,
  explanation,
  exam,
  examMode,
  question,
  answers,
  fillIns,
  intervals,
  marked,
  confirmPauseTimer,
  onBookmarkQuestion,
  onMultipleChoice,
  onMultipleAnswer,
  onFillIn,
  setIntervals
}: ExamProps): React.JSX.Element => {
  return (
    <TestStyles>
      <TopDisplay
        question={question}
        length={exam.test.length}
        examMode={examMode}
        marked={marked}
        onBookmarkQuestion={onBookmarkQuestion}
      />

      {exam.test.map((el: QuestionType, i: number) => {
        if (i === question) {
          const { variant } = el

          return (
            <Slide key={i} direction="right">
              <Question
                review={false}
                question={el.question}
                index={i}
                confirmPauseTimer={confirmPauseTimer}
                intervals={intervals}
                setIntervals={setIntervals}
              />

              {variant === 0 ? (
                <MultipleChoice review={false} question={el} answers={answers[i]} onMultipleChoice={onMultipleChoice} />
              ) : variant === 1 ? (
                <MultipleAnswer review={false} question={el} answers={answers[i]} onMultipleAnswer={onMultipleAnswer} />
              ) : variant === 2 ? (
                <FillIn review={false} fillIn={fillIns[question]} onFillIn={onFillIn} />
              ) : null}

              {explanation ? (
                <Slide direction="bottom">
                  <Explanation explanationRef={explanationRef} question={el} answers={answers[i]} />
                </Slide>
              ) : null}
            </Slide>
          )
        }
      })}
    </TestStyles>
  )
}

export interface ExamProps {
  explanationRef: React.RefObject<HTMLDivElement>
  explanation: boolean
  exam: Exam
  examMode: number
  question: number
  answers: Choice[][]
  fillIns: string[]
  intervals: number[]
  marked: number[]
  confirmPauseTimer: boolean
  onBookmarkQuestion: (question: number, marked: boolean) => void
  onMultipleChoice: Function
  onMultipleAnswer: Function
  onFillIn: (x: string) => void
  setIntervals: React.Dispatch<React.SetStateAction<number[]>>
}
