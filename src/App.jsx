import React from 'react'
import {} from './db.js'

export default function App() {
  const { loading, ...rest } = this.state
  if (loading) {
    return <LoadingMain size={100} height={100} />
  }

  return (
    <Navigation
      {...rest}
      setMode={this.setMode}
      setMainMode={this.setMainMode}
      setQuestion={this.setQuestion}
      initTimer={this.initTimer}
      pauseTimer={this.pauseTimer}
      loadLocalExam={this.loadLocalExam}
      onShowExplanation={this.onShowExplanation}
      endExam={this.endExam}
      setExamMode={this.setExamMode}
      initReview={this.initReview}
      setReviewMode={this.setReviewMode}
      setReviewType={this.setReviewType}
      setReviewQuestion={this.setReviewQuestion}
      saveSession={this.saveSession}
      initSession={this.initSession}
      deleteExam={this.deleteExam}
      deleteHistory={this.deleteHistory}
      deleteSession={this.deleteSession}
      setExamExplanation={this.setExamExplanation}
    >
      <Content
        {...rest}
        explanationRef={this.explanation}
        setMode={this.setMode}
        setIndexExam={this.setIndexExam}
        setIndexHistory={this.setIndexHistory}
        setIndexSession={this.setIndexSession}
        initExam={this.initExam}
        onBookmarkQuestion={this.onBookmarkQuestion}
        onMultipleChoice={this.onMultipleChoice}
        onMultipleAnswer={this.onMultipleAnswer}
        onFillIn={this.onFillIn}
        onListOrder={this.onListOrder}
        setIntervals={this.setIntervals}
        loadRemoteExam={this.loadRemoteExam}
      />
    </Navigation>
  )
}
