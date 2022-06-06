import { FC, memo, useEffect, useState } from 'react'
import { shuffleAnswers } from '../shuffle'
import { Question } from '../types'
import { EndPage } from './EndPage'
import { ChevronDoubleRightIcon } from '@heroicons/react/solid'

type Questions = {
  questionArray: Question[] | undefined
}

export const QuestionItemMemo: FC<Questions> = ({ questionArray }) => {
  const [question, setQuestion] = useState<Question[]>([])
  const [quizCount, setQuizCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [next, setNext] = useState(false)

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
    if ((e.target as HTMLInputElement).value === question[0].correct) {
      setCorrectCount(correctCount + 1)
    }
    setNext(!next)
  }
  const NextButton = () => {
    setNext(!next)
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

              <button
                className={`${
                  !next ? 'opacity-0' : null
                } mt-20 cursor-pointer rounded bg-cyan-500 px-2 py-1 text-2xl text-white shadow-lg shadow-cyan-500/50`}
                onClick={NextButton}
                disabled={!next}
              >
                次の問題へ進む
                <ChevronDoubleRightIcon className="inline h-6 w-6" />
              </button>

              <div className="mt-40 mb-9 flex flex-wrap ">
                <button
                  className={`${
                    next
                      ? answers[0] === quiz.correct
                        ? ' !bg-lime-500 !shadow-lime-500/50'
                        : 'bg-red-500 shadow-red-500/50'
                      : 'bg-cyan-500 shadow-cyan-500/50'
                  } mt-5 ml-5 cursor-pointer rounded px-2 py-1 text-2xl text-white shadow-lg`}
                  onClick={(e) => onClick(e)}
                  value={answers[0]}
                  disabled={next}
                >
                  {answers[0]}
                </button>
                <button
                  className={`${
                    next
                      ? answers[1] === quiz.correct
                        ? ' !bg-lime-500 !shadow-lime-500/50'
                        : 'bg-red-500 shadow-red-500/50'
                      : 'bg-cyan-500 shadow-cyan-500/50'
                  } mt-5 ml-5 cursor-pointer rounded px-2 py-1 text-2xl text-white shadow-lg`}
                  onClick={(e) => onClick(e)}
                  value={answers[1]}
                  disabled={next}
                >
                  {answers[1]}
                </button>
                <button
                  className={`${
                    next
                      ? answers[2] === quiz.correct
                        ? ' !bg-lime-500 !shadow-lime-500/50'
                        : 'bg-red-500 shadow-red-500/50'
                      : 'bg-cyan-500 shadow-cyan-500/50'
                  } mt-5 ml-5  cursor-pointer rounded px-2 py-1 text-2xl text-white shadow-lg`}
                  onClick={(e) => onClick(e)}
                  value={answers[2]}
                  disabled={next}
                >
                  {answers[2]}
                </button>
                <button
                  className={`${
                    next
                      ? answers[3] === quiz.correct
                        ? ' !bg-lime-500 !shadow-lime-500/50'
                        : 'bg-red-500 shadow-red-500/50'
                      : 'bg-cyan-500 shadow-cyan-500/50'
                  } mt-5 ml-5  cursor-pointer rounded px-2 py-1 text-2xl text-white shadow-lg`}
                  onClick={(e) => onClick(e)}
                  value={answers[3]}
                  disabled={next}
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
