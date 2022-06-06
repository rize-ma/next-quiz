import { FC } from 'react'
import { useQueryQuiz } from '../hooks/useQueryQuiz'
import { useSubscribeQuiz } from '../hooks/useSubscribeQuiz'
import { Frame } from './Frame'
import { PostItems } from './PostItems'

export const PostLists: FC = () => {
  const { data: question } = useQueryQuiz()
  useSubscribeQuiz()
  return (
    <Frame title="投稿一覧">
      <div className="my-5">
        {question?.map((quiz) => (
          <PostItems
            key={quiz.id}
            id={quiz.id}
            user_id={quiz.user_id}
            question={quiz.question}
            correct={quiz.correct}
            incorrect1={quiz.incorrect1}
            incorrect2={quiz.incorrect2}
            incorrect3={quiz.incorrect3}
          />
        ))}
      </div>
    </Frame>
  )
}
