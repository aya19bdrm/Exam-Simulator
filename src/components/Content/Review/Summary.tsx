import type { Exam, ThemedStyles } from '../../../types'
import type { Session } from '../../../session'

import React from 'react'
import styled from 'styled-components'
import { formatDate, formatTimer } from '../../../utils/format'
import { translate } from '../../../settings'

const SummaryStyles = styled.div<SummaryStylesProps>`
  width: 100%;
  height: calc(100vh - 14rem);
  display: grid;
  grid-template-rows: 3rem 1.5fr 3rem 2fr;
  .title {
    justify-self: center;
    font: 2rem 'Open Sans';
    font-weight: 700;
    color: ${({ theme }) => theme.black};
    transform: translateX(-3rem);
  }
  .summary {
    justify-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .column {
      align-self: center;
      display: grid;
      grid-template-rows: repeat(4, 3rem);
      .row {
        display: grid;
        grid-template-columns: 10rem 10rem;
        align-items: center;
        & > :first-child {
          font: 1.2rem 'Open Sans';
          font-weight: 700;
          color: ${({ theme }) => theme.grey[10]};
        }
        .image {
          width: 4rem;
          height: 4rem;
        }
        .data {
          font: 1.25rem 'Open Sans';
          font-weight: 700;
          color: ${({ theme }) => theme.black};
        }
        .status {
          color: ${({ $status, theme }) => ($status ? theme.quatro : theme.secondary)};
        }
      }
    }
  }
`

const SummaryComponent: React.FC<SummaryProps> = ({ exam, session }) => {
  const incompleteQuestions = session.answers.filter((a) => a === null)
  const completedQuestions = session.answers.filter((a) => a !== null)
  const conrrectQuestions = completedQuestions.filter((a, i) => a === exam.test[i].answer)
  const incorrectQuestions = completedQuestions.filter((a, i) => a !== exam.test[i].answer)

  const score = Math.round((conrrectQuestions.length / exam.test.length) * 100)
  const status = score >= exam.pass
  const date = new Date()
  const elapsed = exam.time * 60 - session.time

  return (
    <SummaryStyles $status={status}>
      <div id="title" className="title">
        {translate('content.review.summary.title')}
      </div>

      <div id="summary" className="summary">
        <div className="column">
          {SummaryRow(
            'status',
            status ? translate('content.review.summary.pass') : translate('content.review.summary.fail')
          )}
          {SummaryRow('passing', `${exam.pass} %`)}
          {SummaryRow('time', formatTimer(elapsed))}
          {SummaryRow('date', formatDate(date))}
        </div>

        <div className="column">
          {SummaryRow('score', `${score} %`)}
          {SummaryRow('correct', `${conrrectQuestions.length} / ${exam.test.length}`)}
          {SummaryRow('incorrect', `${incorrectQuestions.length} / ${exam.test.length}`)}
          {SummaryRow('incomplete', `${incompleteQuestions.length} / ${exam.test.length}`)}
        </div>
      </div>
    </SummaryStyles>
  )
}

export default SummaryComponent

const SummaryRow = (key: string, value: string) => {
  return (
    <div className="row">
      <div>{translate(`content.review.summary.${key}`)}</div>
      <div className="data">{value}</div>
    </div>
  )
}

export interface SummaryProps extends ThemedStyles {
  exam: Exam
  session: Session
}

export interface SummaryStylesProps extends ThemedStyles {
  $status: boolean
}
