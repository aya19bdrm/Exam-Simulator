import type { QuestionFilter, ThemedStyles } from '../../../types'

import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { getGridItemBackground } from '../../../utils/analyze'
import { ExamContext } from '../../../exam'
import { SessionActionTypes, SessionContext } from '../../../session'
import { translate } from '../../../settings'

export const GridStyles = styled.div<ThemedStyles>`
  height: calc(100vh - 45rem);
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
      background: ${(props) => lighten(0.2, props.theme.primary)};
    }
    .bookmarked {
      background: ${(props) => props.theme.quatro};
    }
    .incorrect {
      background: ${(props) => lighten(0.2, props.theme.secondary)};
    }
    .incomplete {
      background: ${(props) => props.theme.grey[2]};
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
  background: ${(props) => props.$background};
  color: #333;
  border: 1px solid ${(props) => props.theme.grey[3]};
  font: 1rem 'Open Sans';
  font-weight: 700;
  outline: 3px solid ${(props) => (props.$selected ? props.theme.grey[10] : 'transparent')};
  cursor: pointer;
`

export default ({ open, show }: GridProps): React.JSX.Element => {
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

  const onClickGridItem = (question: number) => {
    if (question === session.questionIndex) return
    session.update!(SessionActionTypes.SET_QUESTION_INDEX, question)
  }

  return (
    <GridStyles>
      <div className="legend">
        <div className="item">
          <div className="complete" />
          <div>{translate('nav.grid.complete')}</div>
        </div>

        <div className="item">
          <div className="bookmarked" />
          <div>{translate('nav.grid.marked')}</div>
        </div>

        <div className="item">
          <div className="incomplete" />
          <div>{translate('nav.grid.incomplete')}</div>
        </div>
      </div>

      <div className="grid">
        {show === 'marked'
          ? bookmarks.map((index, i) => <GridItemCreator i={i} index={index} />)
          : show === 'answered'
            ? answered.map((index, i) => <GridItemCreator i={i} index={index} />)
            : show === 'incomplete'
              ? Array(exam.test.length)
                  .fill(null)
                  .map((_, i) => (answered.includes(i) ? null : <GridItemCreator i={i} index={i} />))
                  .filter((item) => item !== null)
              : Array(exam.test.length)
                  .fill(null)
                  .map((_, i) => <GridItemCreator i={i} key={i} index={i} />)}
      </div>
    </GridStyles>
  )

  function GridItemCreator({ i, index }) {
    return (
      <GridItem
        key={i}
        data-test={`Grid Item ${i}`}
        $background={getGridItemBackground(index, bookmarks, answered)}
        $selected={index === session.questionIndex}
        onClick={() => onClickGridItem(i)}
      >
        {index + 1}
      </GridItem>
    )
  }
}

export interface GridProps {
  open: boolean
  show: QuestionFilter
}

export interface GridItemStylesProps extends ThemedStyles {
  $background: string
  $selected: boolean
}
