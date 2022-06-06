import { useState, FormEvent, FC } from 'react'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const Auth: FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  } = useMutateAuth()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  return (
    <>
      <p className="mb-8 font-extrabold  text-blue-500">
        {isLogin ? 'ログイン' : '新規登録'}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            required
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
            placeholder="パスワード"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="my-6 flex items-center justify-center text-sm">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium hover:text-indigo-500"
          >
            {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
          </span>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm text-white"
        >
          {isLogin ? 'ログイン' : '登録'}
        </button>
      </form>
    </>
  )
}
