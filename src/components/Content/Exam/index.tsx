import type { Choice, Exam } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { Slide } from '../../../styles/Slide'
import TopDisplay from './TopDisplay'
import Question from './Question'
import MultipleChoice from './MultipleChoice'
import MultipleAnswer from './MultipleAnswer'
import { ExamContext } from '../../../exam'

const TestStyles = styled.div`
  width: 100%;
  height: calc(100vh - 14rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default ({}: ExamProps): React.JSX.Element => {
  const exam = React.useContext(ExamContext)
  const { image, title, description } = exam || {}

  if (!exam) {
    return <div>Loading...</div>
  }

  const session = React.useContext(ExamContext)
  const { questionIndex } = session || {}

  const question = exam.test[questionIndex]

  return (
    <TestStyles>
      <TopDisplay
      // questionIndex={questionIndex}
      // questionCount={exam.test.length}
      // examMode={examMode}
      // bookmarked={marked.includes(questionIndex)}
      // onBookmarkQuestion={onBookmarkQuestion}
      />

      <Slide key={questionIndex} direction="right">
        <Question {...question} />

        {question.type === 'multiple-choice' ? (
          // <MultipleChoice index={questionIndex} question={question} onMultipleChoice={onMultipleChoice} />
          <MultipleChoice />
        ) : question.type === 'multiple-answer' ? (
          // <MultipleAnswer index={questionIndex} question={question} onMultipleAnswer={onMultipleAnswer} />
          <MultipleAnswer />
        ) : null}
      </Slide>
    </TestStyles>
  )
}

export interface ExamProps {
  // exam: Exam
  // examMode: number
  // questionIndex: number
  // answers: Choice[][]
  // fillIns: string[]
  // intervals: number[]
  // marked: number[]
  // confirmPauseTimer: boolean
  // onBookmarkQuestion: (question: number, marked: boolean) => void
  // onMultipleChoice: (questionIndex: number, answer: number) => void
  // onMultipleAnswer: (questionIndex: number, answers: number[]) => void
  // onFillIn: (x: string) => void
  // setIntervals: React.Dispatch<React.SetStateAction<number[]>>
}
