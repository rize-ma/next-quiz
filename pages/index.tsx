import type { NextPage } from 'next'
import { useEffect } from 'react'
import useStore from '../store'
import { supabase } from '../utils/supabase'
import { Auth } from '../components/Auth'
import { QuizHome } from '../components/QuizHome'

const Home: NextPage = () => {
  const session = useStore((state) => state.session)
  const setSession = useStore((state) => state.setSession)
  useEffect(() => {
    setSession(supabase.auth.session())
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [setSession])
  return (
    <>
      {!session ? (
        <div className="flex min-h-screen flex-col items-center justify-center font-mono text-gray-800">
          <Auth />
        </div>
      ) : (
        <QuizHome />
      )}
    </>
  )
}

export default Home
