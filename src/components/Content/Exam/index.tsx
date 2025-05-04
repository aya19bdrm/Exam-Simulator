import type { Choice, Exam } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay from './TopDisplay'
import Question from './Question'
import MultipleChoice from './MultipleChoice'
import MultipleAnswer from './MultipleAnswer'

const TestStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({
  exam,
  examMode,
  questionNumber,
  marked,
  onBookmarkQuestion,
  onMultipleChoice,
  onMultipleAnswer
}: ExamProps): React.JSX.Element => {
  const question = exam.test[questionNumber]

  return (
    <TestStyles>
      <TopDisplay
        questionNumber={questionNumber}
        questionCount={exam.test.length}
        examMode={examMode}
        bookmarked={marked.includes(questionNumber)}
        onBookmarkQuestion={onBookmarkQuestion}
      />

      <Slide key={questionNumber} direction="right">
        <Question {...question} />

        {question.type === 'multiple-choice' ? (
          <MultipleChoice index={questionNumber} question={question} onMultipleChoice={onMultipleChoice} />
        ) : question.type === 'multiple-answer' ? (
          <MultipleAnswer index={questionNumber} question={question} onMultipleAnswer={onMultipleAnswer} />
        ) : null}
      </Slide>
    </TestStyles>
  )
}

export interface ExamProps {
  exam: Exam
  examMode: number
  questionNumber: number
  answers: Choice[][]
  fillIns: string[]
  intervals: number[]
  marked: number[]
  confirmPauseTimer: boolean
  onBookmarkQuestion: (question: number, marked: boolean) => void
  onMultipleChoice: (questionIndex: number, answer: number) => void
  onMultipleAnswer: (questionIndex: number, answers: number[]) => void
  onFillIn: (x: string) => void
  setIntervals: React.Dispatch<React.SetStateAction<number[]>>
}
