import type { Choice, ExamReport, Exam as ExamType, ThemedStyles } from '../../types'

import React from 'react'
import styled from 'styled-components'
import Cover from './Cover'
import Exam from './Exam'

const ContentStyles = styled.div<ContentStylesProps>`
  display: grid;
  justify-items: center;
  align-items: center;
  padding: 2rem;
  padding-right: ${(props) => (props.open ? '28rem' : '7rem')};
  transition: 0.3s;
`

export default (props: ContentProps): React.JSX.Element => {
  return (
    <ContentStyles open={props.open}>
      {props.mode === 0 ? <Cover cover={props.exam.cover} /> : props.mode === 1 ? <Exam {...props} /> : null}
    </ContentStyles>
  )
}

export interface ContentProps {
  mode: number
  open: boolean
  exam: ExamType

  // --- ReviewProps ---
  reviewMode: number
  report: ExamReport
  // exam: Exam
  reviewQuestion: number
  reviewType: number

  // --- ExamProps ---
  explanationRef: React.RefObject<HTMLDivElement>
  explanation: boolean
  // exam: Exam
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

export interface ContentStylesProps extends ThemedStyles {
  open: boolean
}
