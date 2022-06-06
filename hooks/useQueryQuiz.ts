import { useQuery } from 'react-query'
import { supabase } from '../utils/supabase'
import { Question } from '../types'

export const useQueryQuiz = () => {
  const getQuiz = async () => {
    const { data, error } = await supabase
      .from('quiz')
      .select('*')
      .order('created_at', { ascending: true })
    if (error) {
      throw new Error(error.message)
    }
    return data
  }
  return useQuery<Question[], Error>({
    queryKey: ['quiz'],
    queryFn: getQuiz,
    staleTime: Infinity,
  })
}
