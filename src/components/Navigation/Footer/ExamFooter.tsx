import type { ThemedStyles } from '../../../types'
import type { LangCode } from '../../../settings'

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Timer } from '@styled-icons/material/Timer'
import { SkipPrevious } from '@styled-icons/material/SkipPrevious'
import { KeyboardArrowRight } from '@styled-icons/material/KeyboardArrowRight'
import { KeyboardArrowLeft } from '@styled-icons/material/KeyboardArrowLeft'
import { Language } from '@styled-icons/material/Language'
import { SkipNext } from '@styled-icons/material/SkipNext'
import { formatTimer } from '../../../utils/format'
import { Session, SessionActionTypes } from '../../../session'

const ExamFooter = styled.div<ExamFooterStylesProps>`
  width: ${(props) => (props.$open ? 'calc(100% - 24rem)' : 'calc(100% - 5rem)')};
  height: 100%;
  display: grid;
  grid-template-columns: 10rem 1fr 5rem;
  align-items: center;
  transition: 0.3s;
  .timer {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => (props.$warning ? props.theme.secondary : props.theme.black)};
    svg {
      color: inherit;
      margin-right: 0.5rem;
    }
    & > :last-child {
      font: 2rem 'Open Sans';
      font-weight: 700;
    }
  }
  .arrows {
    justify-self: center;
    display: grid;
    grid-template-columns: repeat(4, 5rem);
  }
  .arrow {
    height: 5rem;
    display: grid;
    justify-items: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background: ${(props) => lighten(0.2, props.theme.primary)};
    }
    svg {
      color: ${(props) => props.theme.black};
      margin-right: 0.5rem;
    }
  }
  .language {
    height: 5rem;
    display: grid;
    justify-self: center;
    align-items: center;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background: ${(props) => lighten(0.2, props.theme.primary)};
    }
    svg {
      color: ${(props) => props.theme.black};
    }
  }
`

export default ({ open, session, questionCount, setLang }: ExamFooterProps): React.JSX.Element => {
  const [timer, setTimer] = React.useState<number>(session.time)

  useEffect(() => {
    let interval: number = 0

    session.update!(SessionActionTypes.SET_TIME, timer)

    if (session.timerState === 'running') {
      interval = setInterval(() => {
        setTimer((prev: number) => prev - 1)
      }, 1000)
    } else if (session.timerState === 'paused') {
      clearInterval(interval)
    } else if (session.timerState === 'stopped') {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
      session.update!(SessionActionTypes.SET_TIME, timer)
    }
  }, [session.timerState])

  const { questionIndex } = session

  const onFirstQuestion = () => session.update!(SessionActionTypes.SET_QUESTION_INDEX, 0)
  const onPrevQuestion = () => {
    if (questionIndex === 0) return
    session.update!(SessionActionTypes.SET_QUESTION_INDEX, questionIndex - 1)
  }
  const onNextQuestion = () => {
    if (questionIndex === questionCount - 1) return
    session.update!(SessionActionTypes.SET_QUESTION_INDEX, questionIndex + 1)
  }
  const onLastQuestion = () => session.update!(SessionActionTypes.SET_QUESTION_INDEX, questionCount - 1)

  return (
    <ExamFooter $open={open} $warning={timer < 120}>
      <div className="timer">
        <Timer size={30} />

        <div data-test="Timer">{formatTimer(timer)}</div>
      </div>

      <div className="arrows">
        <div className="arrow" onClick={onFirstQuestion}>
          <SkipPrevious size={30} />
        </div>

        <div className="arrow" onClick={onPrevQuestion}>
          <KeyboardArrowLeft size={30} />
        </div>

        <div className="arrow" onClick={onNextQuestion}>
          <KeyboardArrowRight size={30} />
        </div>

        <div className="arrow" onClick={onLastQuestion}>
          <SkipNext size={30} />
        </div>
      </div>

      <div className="language" onClick={() => setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar')}>
        <Language size={30} />
      </div>
    </ExamFooter>
  )
}

export interface ExamFooterProps {
  open: boolean
  session: Session
  questionCount: number
  setLang: (lang: LangCode) => void
}

export interface ExamFooterStylesProps extends ThemedStyles {
  $open: boolean
  $warning: boolean
}
