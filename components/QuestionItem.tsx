import { FC, memo, useEffect, useState } from 'react'
import { shuffleAnswers } from '../shuffle'
import { Question } from '../types'
import { EndPage } from './EndPage'

type Questions = {
  questionArray: Question[] | undefined
}

export const QuestionItemMemo: FC<Questions> = ({ questionArray }) => {
  const [question, setQuestion] = useState<Question[]>([])
  const [quizCount, setQuizCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  useEffect(() => {
    if (quizCount < 10) {
      let length = questionArray?.length
        ? questionArray.length
        : Math.random() * 11
      const randomNum = Math.floor(Math.random() * length)
      const Question = questionArray ? questionArray.splice(randomNum, 1) : []
      setAnswers(shuffleAnswers(Question[0]))
      setQuestion(Question)
    }
  }, [quizCount])
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCorrectCount(
      (e.target as HTMLInputElement).value === question[0].correct
        ? correctCount + 1
        : correctCount
    )
    setQuizCount(quizCount + 1)
  }
  return (
    <>
      {quizCount === 10 ? (
        <EndPage correctCount={correctCount} />
      ) : (
        question.map((quiz) => (
          <div
            key={quiz.id}
            className=" min-h-screen bg-quiz-img bg-cover bg-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mx-1 mt-36 inline-block max-w-full rounded border-4 border-blue-500  bg-blue-100 p-3">
                {quiz.question}
              </div>
              <div className="mt-96 flex flex-wrap justify-around">
                <button
                  className="mt-5 cursor-pointer rounded bg-cyan-500 px-2 py-1 text-2xl text-white shadow-lg shadow-cyan-500/50"
                  onClick={(e) => onClick(e)}
                  value={answers[0]}
                >
                  {answers[0]}
                </button>
                <button
                  className="mt-5 ml-5 cursor-pointer rounded bg-cyan-500 px-2 py-1 text-2xl text-white shadow-lg shadow-cyan-500/50"
                  onClick={(e) => onClick(e)}
                  value={answers[1]}
                >
                  {answers[1]}
                </button>
                <button
                  className="mt-5 ml-5  cursor-pointer rounded bg-cyan-500 px-2 py-1 text-2xl text-white shadow-lg shadow-cyan-500/50"
                  onClick={(e) => onClick(e)}
                  value={answers[2]}
                >
                  {answers[2]}
                </button>
                <button
                  className="mt-5 ml-5  cursor-pointer rounded bg-cyan-500 px-2 py-1 text-2xl text-white shadow-lg shadow-cyan-500/50"
                  onClick={(e) => onClick(e)}
                  value={answers[3]}
                >
                  {answers[3]}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  )
}

export const QuestionItem = memo(QuestionItemMemo)
