import { useMutation } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Question, EditedQuestion } from '../types'

export const useMutateQuiz = () => {
  const reset = useStore((state) => state.resetEditedQuestion)
  const createQuizMutation = useMutation(
    async (quiz: Omit<Question, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('quiz').insert(quiz)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const updateQuestionMutation = useMutation(
    async (quiz: EditedQuestion) => {
      const { id, question, correct, incorrect1, incorrect2, incorrect3 } = quiz
      const { data, error } = await supabase
        .from('quiz')
        .update({ question, correct, incorrect1, incorrect2, incorrect3 })
        .eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  const deleteQuizMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('quiz').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    }
  )
  return { createQuizMutation, updateQuestionMutation, deleteQuizMutation }
}
