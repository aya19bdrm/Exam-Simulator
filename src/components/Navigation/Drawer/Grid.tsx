import type { ThemedStyles } from '../../../types'

import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { analyzeGridItem } from '../../../utils/analyze'
import { ExamContext } from '../../../exam'
import { SessionContext } from '../../../session'

export const GridStyles = styled.div<ThemedStyles>`
  height: calc(100vh - 35rem);
  border-top: 1px solid ${(props) => props.theme.grey[2]};
  border-bottom: 1px solid ${(props) => props.theme.grey[2]};
  .legend {
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      & > :first-child {
        width: 1rem;
        height: 1rem;
        margin-right: 0.25rem;
        border: 0.5px solid ${(props) => props.theme.grey[2]};
      }
      & > :last-child {
        font: 0.9rem 'Open Sans';
        font-weight: 600;
      }
    }
    .complete,
    .correct {
      background: ${(props) => lighten(0.1, props.theme.primary)};
    }
    .bookmarked {
      background: ${(props) => lighten(0.25, props.theme.tertiary)};
    }
    .incorrect {
      background: ${(props) => lighten(0.25, props.theme.secondary)};
    }
    .incomplete {
      background: ${(props) => props.theme.grey[2]};
    }
  }
  .grid {
    height: calc(100vh - 40rem);
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 1rem;
    overflow-y: auto;
  }
`

export const GridItem = styled.div<GridItemStylesProps>`
  width: 4.5rem;
  height: 4.5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background: ${(props) => props.$background};
  color: #333;
  border: 1px solid ${(props) => props.theme.grey[3]};
  font: 1rem 'Open Sans';
  font-weight: 700;
  outline: 3px solid ${(props) => (props.$selected ? props.theme.grey[10] : 'transparent')};
  cursor: pointer;
`

export default ({ open }: GridProps): React.JSX.Element | null => {
  const exam = useContext(ExamContext)
  const session = useContext(SessionContext)

  const [questionIndex, setQuestionIndex] = useState<number>(session.questionIndex)

  if (!open || !exam) {
    return null
  }

  const onClickGridItem = (question: number) => {
    session.questionIndex = question
    setQuestionIndex(question)
  }

  return (
    <GridStyles>
      <div className="legend">
        <div className="item">
          <div className="complete" />
          <div>Complete</div>
        </div>

        <div className="item">
          <div className="bookmarked" />
          <div>Bookmarked</div>
        </div>

        <div className="item">
          <div className="incomplete" />
          <div>Incomplete</div>
        </div>
      </div>

      <div className="grid">
        {Array(exam.test.length)
          .fill(null)
          .map((_, i) => {
            const background = analyzeGridItem(i, session.answers, session.bookmarks)

            return (
              <GridItem
                key={i}
                data-test={`Grid Item ${i}`}
                $background={background}
                $selected={i === questionIndex}
                onClick={() => onClickGridItem(i)}
              >
                {i + 1}
              </GridItem>
            )
          })}
      </div>
    </GridStyles>
  )
}

export interface GridProps {
  open: boolean
}

export interface GridItemStylesProps extends ThemedStyles {
  $background: string
  $selected: boolean
}
