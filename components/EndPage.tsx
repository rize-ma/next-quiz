import Link from 'next/link'
import { FC } from 'react'
import { Frame } from './Frame'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

type Props = {
  correctCount: number
}

export const EndPage: FC<Props> = ({ correctCount }) => {
  return (
    <div className="min-h-screen bg-quiz-img bg-cover bg-center">
      <Frame title="あなたの得点は...">
        <div className="my-5 text-2xl">
          10/<p className="m-5 inline text-4xl text-red-400">{correctCount}</p>
          点です!
        </div>
        <div className="my-8">
          <Link href="/">
            <a className=" rounded bg-lime-500 px-2 py-1 text-2xl text-white shadow-lg shadow-lime-500/50">
              ホームに戻る
              <ChevronDoubleLeftIcon className="inline h-6 w-6" />
            </a>
          </Link>
        </div>
      </Frame>
    </div>
  )
}
