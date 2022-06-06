import { NextPage } from 'next'
import { Suspense } from 'react'
import { Question } from '../components/Question'
import { Spinner } from '../components/Spinner'

const QuizPage: NextPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Question />
    </Suspense>
  )
}

export default QuizPage
