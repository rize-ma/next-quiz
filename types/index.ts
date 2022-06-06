export type Question = {
  id: string
  created_at: string
  user_id: string | undefined
  question: string
  correct: string
  incorrect1: string
  incorrect2: string
  incorrect3: string
}
export type EditedQuestion = {
  id: string
  question: string
  correct: string
  incorrect1: string
  incorrect2: string
  incorrect3: string
}
