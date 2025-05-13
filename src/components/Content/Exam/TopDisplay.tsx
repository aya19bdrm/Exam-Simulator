import type { Exam, ThemedStyles } from '../../../types'
import { SessionActionTypes, type Session } from '../../../session'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Bookmark } from '@styled-icons/material/Bookmark'
import { BookmarkBorder } from '@styled-icons/material/BookmarkBorder'
import { type Lang, translate } from '../../../settings'

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

export default ({
  exam,
  session: { questionIndex, bookmarks, update },
  lang
}: ExamTopDisplayProps): React.JSX.Element => {
  const [bookmarked, setBookmarked] = useState<boolean>(bookmarks.includes(questionIndex))

  useEffect(() => {
    setBookmarked(bookmarks.includes(questionIndex))
  }, [questionIndex])

  const onBookmarkQuestion = (question: number, marked: boolean) => {
    setBookmarked(marked)

    if (marked) {
      bookmarks.push(question)
    } else {
      bookmarks.splice(bookmarks.indexOf(question), 1)
    }

    update(SessionActionTypes.SET_BOOKMARKS, bookmarks)
  }

  return (
    <TopDisplayStyles $bookmarked={bookmarked}>
      <div>
        <div dir={lang.dir}>
          {translate('content.exam.top-display.question', [questionIndex + 1, exam.test.length])}
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

export interface ExamTopDisplayProps {
  exam: Exam
  session: Session
  lang: Lang
}

export interface ExamTopDisplayStylesProps extends ThemedStyles {
  $bookmarked?: boolean
}
