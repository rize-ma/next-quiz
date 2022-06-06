import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedQuestion } from '../types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedQuestion: EditedQuestion
  updateEditedQuestion: (payload: EditedQuestion) => void
  resetEditedQuestion: () => void
}

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedQuestion: {
    id: '',
    question: '',
    correct: '',
    incorrect1: '',
    incorrect2: '',
    incorrect3: '',
  },
  updateEditedQuestion: (payload) =>
    set({
      editedQuestion: {
        id: payload.id,
        question: payload.question,
        correct: payload.correct,
        incorrect1: payload.incorrect1,
        incorrect2: payload.incorrect2,
        incorrect3: payload.incorrect3,
      },
    }),
  resetEditedQuestion: () =>
    set({
      editedQuestion: {
        id: '',
        question: '',
        correct: '',
        incorrect1: '',
        incorrect2: '',
        incorrect3: '',
      },
    }),
}))

export default useStore
