import { FC, FormEvent, useEffect } from 'react'
import useStore from '../store'
import { useMutateQuiz } from '../hooks/useMutateQuiz'
import { UploadIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import { Frame } from './Frame'

export const PostForm: FC = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  const editedQuestion = useStore((state) => state.editedQuestion)
  const update = useStore((state) => state.updateEditedQuestion)
  const { createQuizMutation, updateQuestionMutation } = useMutateQuiz()
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedQuestion.id === '')
      createQuizMutation.mutate({
        user_id: session?.user?.id,
        question: editedQuestion.question,
        correct: editedQuestion.correct,
        incorrect1: editedQuestion.incorrect1,
        incorrect2: editedQuestion.incorrect2,
        incorrect3: editedQuestion.incorrect3,
      })
    else {
      updateQuestionMutation.mutate({
        id: editedQuestion.id,
        question: editedQuestion.question,
        correct: editedQuestion.correct,
        incorrect1: editedQuestion.incorrect1,
        incorrect2: editedQuestion.incorrect2,
        incorrect3: editedQuestion.incorrect3,
      })
    }
  }
  const disabled = () => {
    if (
      editedQuestion.question &&
      editedQuestion.correct &&
      editedQuestion.incorrect1 &&
      editedQuestion.incorrect2 &&
      editedQuestion.incorrect3
    ) {
      return true
    }
  }

  return (
    <Frame title="クイズの投稿ページ">
      <form onSubmit={submitHandler}>
        <div className="ml-6 ">
          <label
            htmlFor="question"
            className="mb-2 block cursor-pointer text-xl"
          >
            クイズの問題を入力してください。
          </label>
          <textarea
            placeholder="問題を入力"
            id="question"
            className="block min-w-full rounded"
            value={editedQuestion.question}
            onChange={(e) =>
              update({ ...editedQuestion, question: e.target.value })
            }
          />
        </div>
        <div className="ml-6">
          <label
            htmlFor="correct"
            className="my-2 block cursor-pointer text-xl"
          >
            正解を入力。
          </label>
          <input
            id="correct"
            type="text"
            placeholder="正解を入力"
            className="rounded"
            value={editedQuestion.correct}
            onChange={(e) =>
              update({ ...editedQuestion, correct: e.target.value })
            }
          />
        </div>
        <div className="flex flex-wrap">
          <div className="ml-6">
            <label
              htmlFor="incorrect1"
              className="my-2 block cursor-pointer text-xl"
            >
              不正解の選択肢を入力。
            </label>
            <input
              id="incorrect1"
              type="text"
              placeholder="不正解 1 を入力"
              className="rounded"
              value={editedQuestion.incorrect1}
              onChange={(e) =>
                update({ ...editedQuestion, incorrect1: e.target.value })
              }
            />
          </div>
          <div className="ml-6">
            <label
              htmlFor="incorrect2"
              className="my-2 block cursor-pointer text-xl"
            >
              不正解の選択肢を入力。
            </label>
            <input
              id="incorrect2"
              type="text"
              placeholder="不正解 2 を入力"
              className="rounded"
              value={editedQuestion.incorrect2}
              onChange={(e) =>
                update({ ...editedQuestion, incorrect2: e.target.value })
              }
            />
          </div>
          <div className="ml-6">
            <label
              htmlFor="incorrect3"
              className="my-2 block cursor-pointer text-xl"
            >
              不正解の選択肢を入力。
            </label>
            <input
              id="incorrect3"
              type="text"
              placeholder="不正解 3 を入力"
              className="rounded"
              value={editedQuestion.incorrect3}
              onChange={(e) =>
                update({ ...editedQuestion, incorrect3: e.target.value })
              }
            />
          </div>
        </div>
        <div className="my-7 ml-6 flex">
          <button
            disabled={!disabled()}
            type="submit"
            className={`rounded ${
              disabled() ? 'bg-pink-500' : 'bg-pink-100'
            } p-2 font-bold text-white`}
          >
            投稿する
            <UploadIcon className="inline h-5 w-5" />
          </button>
        </div>
      </form>
    </Frame>
  )
}
