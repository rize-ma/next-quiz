import { FC } from 'react'
import useStore from '../store'
import { useMutateQuiz } from '../hooks/useMutateQuiz'
import { Question } from '../types'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

export const PostItems: FC<Omit<Question, 'created_at'>> = ({
  id,
  user_id,
  question,
  correct,
  incorrect1,
  incorrect2,
  incorrect3,
}) => {
  const session = useStore((state) => state.session)
  const update = useStore((state) => state.updateEditedQuestion)
  const { deleteQuizMutation } = useMutateQuiz()
  const Edit = () => {
    update({ id, question, correct, incorrect1, incorrect2, incorrect3 })
    scroll({ top: 0, behavior: 'smooth' })
  }
  return (
    <>
      {session?.user?.id === user_id && (
        <div className="mt-2">
          <PencilAltIcon
            className="m-2 mr-8 inline-block h-6 w-6 cursor-pointer text-pink-500"
            onClick={Edit}
          />
          <TrashIcon
            className="mx-2 inline-block h-7 w-6 cursor-pointer text-pink-500"
            onClick={() => {
              deleteQuizMutation.mutate(id)
            }}
          />
          <div className="rounded bg-white p-2 text-xl font-bold">
            {question}
          </div>
        </div>
      )}
    </>
  )
}
