import type { ThemedStyles } from '../../../types'

import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { BigText } from '../../../styles/repeated'

const QuestionStyles = styled.div`
  & > :last-child {
    margin-bottom: 2rem;
  }
`

const Image = styled.img<ThemedStyles>`
  max-width: 75vw;
  max-height: 60vh;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.grey[1]};
`

const NormalText = styled.div`
  font: 1.4rem 'Open Sans';
  margin-bottom: 0.5rem;
`

function Question({
  review,
  question,
  index,
  confirmPauseTimer,
  intervals,
  setIntervals
}: QuestionProps): React.JSX.Element {
  const [time, setTime] = useState<number>(0)
  const timerRef = useRef<number | null>(null)
  const shouldUpdate = useRef(false)

  useEffect(() => {
    // Equivalent to componentDidMount
    if (!review) {
      initTimer()
    }

    // Equivalent to componentWillUnmount
    return () => {
      if (!review && timerRef.current) {
        clearInterval(timerRef.current)
        intervals[index] += time
        setIntervals([...intervals])
      }
    }
  }, [])

  // Handle the pause timer changes (equivalent to componentDidUpdate)
  useEffect(() => {
    if (confirmPauseTimer && timerRef.current) {
      clearInterval(timerRef.current)
    } else if (!confirmPauseTimer && shouldUpdate.current) {
      initTimer()
    }

    // Skip the first render
    if (!shouldUpdate.current) {
      shouldUpdate.current = true
    }
  }, [confirmPauseTimer])

  const initTimer = () => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)
  }

  // Implement shouldComponentUpdate logic
  // In functional components, we use React.memo with a custom comparison function

  return (
    <QuestionStyles data-test="Question">
      {question.map(({ variant, text }, i: number) =>
        variant === 0 ? (
          <React.Fragment key={i}>
            <Image src={text} />
            <br />
          </React.Fragment>
        ) : variant === 1 ? (
          <NormalText key={i}>{text}</NormalText>
        ) : variant === 2 ? (
          <BigText key={i}>{text}</BigText>
        ) : null
      )}
    </QuestionStyles>
  )
}

// Use React.memo with a custom comparison function to implement shouldComponentUpdate
// This always returns true to prevent updates (mimicking the original shouldComponentUpdate returning false)
export default React.memo(Question, () => true)

export interface QuestionProps {
  review: boolean
  question: QuestionText[]
  index?: number
  confirmPauseTimer?: boolean
  intervals?: number[]
  setIntervals?: React.Dispatch<React.SetStateAction<number[]>>
}

// export interface QuestionProps {
//   review: true
//   question: QuestionText[]
// }

// export interface QuestionProps2 {
//   review: false
//   question: QuestionText[]
//   index: number
//   confirmPauseTimer: boolean
//   intervals: number[]
//   setIntervals: React.Dispatch<React.SetStateAction<number[]>>
// }

export interface QuestionText {
  variant: number
  text: string
}
