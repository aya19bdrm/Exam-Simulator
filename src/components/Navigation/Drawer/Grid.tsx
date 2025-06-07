import type { GridTagTypes, QuestionFilter, ThemedStyles } from '../../../types'

import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { getGridItemBackground } from '../../../utils/analyze'
import { ExamContext } from '../../../exam'
import { SessionActionTypes, SessionContext } from '../../../session'
import { translate } from '../../../settings'

export const GridStyles = styled.div<ThemedStyles>`
  height: calc(100vh - 45rem);
  border-top: 1px solid ${({ theme }) => theme.grey[2]};
  border-bottom: 1px solid ${({ theme }) => theme.grey[2]};
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
        border: 0.5px solid ${({ theme }) => theme.grey[2]};
      }
      & > :last-child {
        font: 0.9rem 'Open Sans';
        font-weight: 600;
      }
    }
    .complete,
    .correct {
      background: ${({ theme }) => lighten(0.2, theme.primary)};
    }
    .bookmarked {
      background: ${({ theme }) => theme.quatro};
    }
    .incorrect {
      background: ${({ theme }) => lighten(0.2, theme.secondary)};
    }
    .incomplete {
      background: ${({ theme }) => theme.grey[2]};
    }
  }
  .grid {
    height: calc(100vh - 50rem);
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
  background: ${({ $background }) => $background};
  color: #333;
  border: 1px solid ${({ theme }) => theme.grey[3]};
  font: 1rem 'Open Sans';
  font-weight: 700;
  outline: 3px solid ${({ $selected, theme }) => ($selected ? theme.grey[10] : 'transparent')};
  cursor: pointer;
`

const GridComponent: React.FC<GridProps> = ({ open, show }) => {
  const exam = useContext(ExamContext)
  const session = useContext(SessionContext)
  const [bookmarks, setBookmarks] = React.useState<number[]>(session.bookmarks)

  useEffect(() => {
    setBookmarks(session.bookmarks)
  }, [session])

  if (!open || !exam || exam.test.length === 0) return <></>

  const answered = session.answers
    .map((answer, i) => {
      const isMultipleChoiceAnswered = answer !== null && !Number.isNaN(answer)
      const isMultipleAnswerAnswered = Array.isArray(answer) && answer.length > 0

      if (isMultipleChoiceAnswered || isMultipleAnswerAnswered) {
        return i
      }
    })
    .filter((i) => i !== undefined)
  const answeredCorrectly = session.answers
    .map((answer, i) => {
      const isCorrect = answer === exam.test[i].answer
      if (isCorrect) return i
    })
    .filter((i) => i !== undefined)
  const answeredIncorrectly = answered.filter((i) => !answeredCorrectly.includes(i))

  const onClickGridItem = (question: number) => {
    if (question === session.index) return
    session.update!(SessionActionTypes.SET_INDEX, question)
  }

  return (
    <GridStyles id="grid">
      <div className="legend">
        <GridTag type="marked" />
        <GridTag type="incomplete" />
        <GridTag type="complete" />
        {session.examState === 'completed' && (
          <>
            <GridTag type="incorrect" />
            <GridTag type="correct" />
          </>
        )}
      </div>

      <div className="grid">
        {show === 'marked'
          ? bookmarks.map((index, i) => <GridItemCreator i={i} index={index} />)
          : show === 'complete'
            ? answered.map((index, i) => <GridItemCreator i={i} index={index} />)
            : show === 'incorrect'
              ? answeredIncorrectly.map((index, i) => <GridItemCreator i={i} index={index} />)
              : show === 'correct'
                ? answeredCorrectly.map((index, i) => <GridItemCreator i={i} index={index} />)
                : show === 'incomplete'
                  ? Array(exam.test.length)
                      .fill(null)
                      .map((_, i) => (answered.includes(i) ? null : <GridItemCreator i={i} index={i} />))
                      .filter((item) => item !== null)
                  : Array(exam.test.length)
                      .fill(null)
                      .map((_, i) => <GridItemCreator i={i} index={i} />)}
      </div>
    </GridStyles>
  )

  function GridItemCreator({ i, index }) {
    return (
      <GridItem
        key={i}
        data-test={`Grid Item ${i}`}
        $background={getGridItemBackground(index, bookmarks, answered)}
        $selected={index === session.index}
        onClick={() => onClickGridItem(index)}
      >
        {index + 1}
      </GridItem>
    )
  }
}

export default GridComponent

const GridTag: React.FC<GridTagProps> = ({ type }) => {
  return (
    <div className="item">
      <div className={type} />
      <div>{translate(`nav.grid.${type}`)}</div>
    </div>
  )
}

export interface GridProps {
  open: boolean
  show: QuestionFilter
}

export interface GridTagProps {
  type: GridTagTypes
}

export interface GridItemStylesProps extends ThemedStyles {
  $background: string
  $selected: boolean
}
