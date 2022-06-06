import { LogoutIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { FC } from 'react'
import { useQueryClient } from 'react-query'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Frame } from './Frame'
import { Layout } from './Layout'

export const QuizHome: FC = () => {
  const queryClient = useQueryClient()
  const signOut = () => {
    supabase.auth.signOut()
    queryClient.removeQueries(['profile'])
    queryClient.removeQueries(['notices'])
    queryClient.removeQueries(['posts'])
  }
  return (
    <>
      <Layout title="クイズぺージ">
        <Frame title="クイズに挑戦してみよう！">
          <div className="flex  flex-1 flex-col items-center">
            <Link href="/QuizPage">
              <a className="my-24 rounded bg-lime-500 px-2 py-1 text-2xl text-white shadow-lg shadow-lime-500/50">
                クイズに挑戦する!!
              </a>
            </Link>
            <div
              className="mt-9 cursor-pointer font-extrabold "
              onClick={signOut}
            >
              <p>ログアウト</p>
              <LogoutIcon
                data-testid="logout"
                className="mx-auto h-12 w-12 text-blue-500"
              />
            </div>
          </div>
        </Frame>
      </Layout>
    </>
  )
}
