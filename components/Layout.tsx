import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title = 'QUIZ' }) => {
  return (
    <div className=" min-h-screen bg-quiz-img bg-cover bg-center font-mono text-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="flex h-20 w-screen items-center  justify-around  bg-gray-800">
          <Link href="/">
            <a className="text-2xl text-white hover:text-Lime">クイズ</a>
          </Link>
          <Link href="/PostPage">
            <a className="text-2xl text-white hover:text-Lime">投稿する</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
