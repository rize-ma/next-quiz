export const shuffleAnswers = (question: any) => {
  if (!question) {
    return []
  }
  const unshuffledAnswers = [
    question.correct,
    question.incorrect1,
    question.incorrect2,
    question.incorrect3,
  ]
  return unshuffledAnswers
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
}
