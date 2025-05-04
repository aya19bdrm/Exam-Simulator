import type { ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { Bookmark } from '@styled-icons/material/Bookmark'
import { BookmarkBorder } from '@styled-icons/material/BookmarkBorder'

const TopDisplayStyles = styled.div<ExamTopDisplayStylesProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  & > :first-child {
    display: flex;
    align-items: center;
    font: 2.5rem 'Open Sans';
    font-weight: 700;
    color: ${(props) => props.theme.grey[10]};
    .bookmarked {
      font: 1.1rem 'Open Sans';
      font-weight: 700;
      color: ${(props) => props.theme.grey[10]};
      margin-left: 0.75rem;
      margin-top: 0.75rem;
    }
  }
  & > :last-child {
    margin-right: 5rem;
    color: ${(props) => (props.bookmarked ? props.theme.tertiary : props.theme.grey[10])};
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.tertiary};
    }
  }
`

function TopDisplay({
  question,
  length,
  examMode,
  marked,
  onBookmarkQuestion
}: ExamTopDisplayProps): React.JSX.Element {
  const bookmarked = marked.includes(question)

  return (
    <TopDisplayStyles bookmarked={bookmarked || undefined}>
      <div>
        <div>
          Question {question + 1} of {length}
        </div>

        <div className="bookmarked">{examMode === 1 ? '[ Bookmarked Questions ]' : null}</div>
      </div>

      {bookmarked ? (
        <Bookmark size={40} onClick={() => onBookmarkQuestion(question, false)} />
      ) : (
        <BookmarkBorder size={40} onClick={() => onBookmarkQuestion(question, true)} />
      )}
    </TopDisplayStyles>
  )
}

export default React.memo(TopDisplay)

export interface ExamTopDisplayProps {
  question: number
  length: number
  examMode: number
  marked: number[]
  onBookmarkQuestion: (question: number, marked: boolean) => void
}

export interface ExamTopDisplayStylesProps extends ThemedStyles {
  bookmarked: boolean
}
