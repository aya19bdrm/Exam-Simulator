import type { ThemedStyles } from '../../../types'

import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { SkipPrevious } from '@styled-icons/material/SkipPrevious'
import { KeyboardArrowRight } from '@styled-icons/material/KeyboardArrowRight'
import { KeyboardArrowLeft } from '@styled-icons/material/KeyboardArrowLeft'
import { SkipNext } from '@styled-icons/material/SkipNext'
import { Session, SessionActionTypes } from '../../../session'

const ArrowsStyles = styled.div<ThemedStyles>`
  justify-self: center;
  display: grid;
  grid-template-columns: repeat(4, 5rem);
`

const ArrowStyles = styled.div<ThemedStyles>`
  height: 5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => lighten(0.2, theme.primary)};
  }
  svg {
    color: ${({ theme }) => theme.black};
    margin-right: 0.5rem;
  }
`

const ArrowsComponent: React.FC<ArrowsProps> = ({ session, questionCount }) => {
  const { index } = session

  const onFirstQuestion = () => session.update!(SessionActionTypes.SET_INDEX, 0)
  const onPrevQuestion = () => session.update!(SessionActionTypes.SET_INDEX, index - 1)
  const onNextQuestion = () => session.update!(SessionActionTypes.SET_INDEX, index + 1)
  const onLastQuestion = () => session.update!(SessionActionTypes.SET_INDEX, questionCount - 1)

  const arrows: ArrowProps[] = [
    {
      func: onFirstQuestion,
      Icon: SkipPrevious
    },
    {
      func: onPrevQuestion,
      Icon: KeyboardArrowLeft
    },
    {
      func: onNextQuestion,
      Icon: KeyboardArrowRight
    },
    {
      func: onLastQuestion,
      Icon: SkipNext
    }
  ]

  return (
    <ArrowsStyles id="arrows">
      {arrows.map(({ func, Icon }) => (
        <ArrowStyles onClick={func}>
          <Icon size={30} />
        </ArrowStyles>
      ))}
    </ArrowsStyles>
  )
}

export default ArrowsComponent

export interface ArrowsProps {
  session: Session
  questionCount: number
}

export interface ArrowProps {
  func: MouseEventHandler<HTMLDivElement>
  Icon: React.FC<{ size: number }>
}
