import type { ExamReport } from '../../../types'

import React from 'react'
import Summary from './Summary'
import ReviewExam, { type ReviewExamProps } from './ReviewExam'

export default ({ reviewMode, report, ...rest }: ReviewProps): React.JSX.Element => {
  if (reviewMode === 0) {
    return <Summary report={report} />
  } else {
    return <ReviewExam report={report} {...rest} />
  }
}

export interface ReviewProps extends ReviewExamProps {
  reviewMode: number
  report: ExamReport
}
