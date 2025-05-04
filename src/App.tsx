import type { Exam } from './types'

import React, { useEffect, useState } from 'react'
import LoadingMain from './components/LoadingMain'
import Content, { type ContentProps } from './components/Content'

const exam: Exam = {
  id: '12345',
  title: 'Example Exam',
  description: 'An example exam',
  author: {
    id: '67890',
    name: 'Benjaminadk',
    image: 'http://www.example.com/image.png'
  },
  code: '123-abc',
  time: 60,
  pass: 75,
  image: 'http://www.example.com/image.png',
  cover: [
    {
      variant: 0,
      text: 'https://imgs.search.brave.com/tC_EOIwXTBhInK1zNFFEGLa2mkidUN_4SpgjE9S01Io/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9h/aS1jbG91ZC1jb25j/ZXB0LXdpdGgtcm9i/b3QtYXJtc18yMy0y/MTQ5NzM5NzQ5Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA'
    },
    { variant: 2, text: 'Large Text' },
    { variant: 1, text: 'Normal Text' }
  ],
  test: [
    {
      variant: 0,
      question: [
        { variant: 1, text: 'Normal text' },
        { variant: 0, text: 'Image URL' }
      ],
      choices: [
        { label: 'A', text: 'Option A' },
        { label: 'B', text: 'Option B' },
        { label: 'C', text: 'Option C' },
        { label: 'D', text: 'Option D' }
      ],
      answer: [true, false, false, false],
      explanation: [
        { variant: 1, text: 'Normal text' },
        { variant: 0, text: 'Image URL' }
      ]
    }
  ]
}

const contentProps: ContentProps = {
  mainMode: 0,
  mode: 1,
  open: true,

  examMode: 0,
  exam: exam,
  answers: [],
  fillIns: [],
  orders: [],
  marked: [],
  question: 0,
  time: 0,
  explanation: false

  // --- ExamProps ---
  // explanationRef: React.RefObject<HTMLDivElement>,
  // intervals: number[],
  // confirmPauseTimer: boolean,
  // onBookmarkQuestion: (question: number, marked: boolean) => void,
  // onMultipleChoice: Function,
  // onMultipleAnswer: Function,
  // onFillIn: (x: string) => void,
  // setIntervals: React.Dispatch<React.SetStateAction<number[]>>,
}

function App() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return <LoadingMain size={100} height={100} />
  }

  return (
    // <Navigation>
    <Content {...contentProps} />
    // </Navigation>
  )
}

export default App
