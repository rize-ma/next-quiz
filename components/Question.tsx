import { FC } from 'react'
import { useQueryQuiz } from '../hooks/useQueryQuiz'
import { QuestionItem } from './QuestionItem'

export const Question: FC = () => {
  const { data: question } = useQueryQuiz()
  const questionArray = question?.slice()
  return (
    <div>
      <QuestionItem questionArray={questionArray} />
    </div>
  )
}
