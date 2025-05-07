import type { ThemedStyles } from '../../../types'

import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Bookmark } from '@styled-icons/material/Bookmark'
import { BookmarkBorder } from '@styled-icons/material/BookmarkBorder'
import { SessionContext } from '../../../session'
import { ExamContext } from '../../../exam'

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
    color: ${(props) => (props.$bookmarked ? props.theme.tertiary : props.theme.grey[10])};
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.tertiary};
    }
  }
`

function TopDisplay({}: ExamTopDisplayProps): React.JSX.Element {
  const exam = useContext(ExamContext)
  const { questionIndex, bookmarks } = useContext(SessionContext)

  if (!exam) return <></>

  const [bookmarked, setBookmarked] = useState<boolean>(bookmarks.includes(questionIndex))

  const onBookmarkQuestion = (question: number, marked: boolean) => {
    setBookmarked(marked)
    if (marked) {
      bookmarks.push(question)
    } else {
      bookmarks.splice(bookmarks.indexOf(question), 1)
    }
  }

  return (
    <TopDisplayStyles $bookmarked={bookmarked}>
      <div>
        <div>
          Question {questionIndex + 1} of {exam.test.length}
        </div>
      </div>

      {bookmarked ? (
        <Bookmark size={40} onClick={() => onBookmarkQuestion(questionIndex, false)} />
      ) : (
        <BookmarkBorder size={40} onClick={() => onBookmarkQuestion(questionIndex, true)} />
      )}
    </TopDisplayStyles>
  )
}

export default React.memo(TopDisplay)

export interface ExamTopDisplayProps {}

export interface ExamTopDisplayStylesProps extends ThemedStyles {
  $bookmarked?: boolean
}
