import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { supabase } from '../utils/supabase'
import { Question } from '../types'

export const useSubscribeQuiz = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('quiz')
      .on('INSERT', (payload: SupabaseRealtimePayload<Question>) => {
        let previousQuiz = queryClient.getQueryData<Question[]>(['quiz'])
        if (!previousQuiz) {
          previousQuiz = []
        }
        queryClient.setQueryData(
          ['quiz'],
          [
            ...previousQuiz,
            {
              id: payload.new.id,
              created_at: payload.new.created_at,
              user_id: payload.new.user_id,
              question: payload.new.question,
              correct: payload.new.correct,
              incorrect1: payload.new.incorrect1,
              incorrect2: payload.new.incorrect2,
              incorrect3: payload.new.incorrect3,
            },
          ]
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Question>) => {
        let previousQuiz = queryClient.getQueryData<Question[]>(['quiz'])
        if (!previousQuiz) {
          previousQuiz = []
        }
        queryClient.setQueryData(
          ['quiz'],
          previousQuiz.map((quiz) =>
            quiz.id === payload.new.id
              ? {
                  id: payload.new.id,
                  created_at: payload.new.created_at,
                  user_id: payload.new.user_id,
                  question: payload.new.question,
                  correct: payload.new.correct,
                  incorrect1: payload.new.incorrect1,
                  incorrect2: payload.new.incorrect2,
                  incorrect3: payload.new.incorrect3,
                }
              : quiz
          )
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Question>) => {
        let previousQuiz = queryClient.getQueryData<Question[]>(['quiz'])
        if (!previousQuiz) {
          previousQuiz = []
        }
        queryClient.setQueryData(
          ['quiz'],
          previousQuiz.filter((quiz) => quiz.id !== payload.old.id)
        )
      })
      .subscribe()
    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
