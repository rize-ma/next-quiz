import { FC, ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export const Frame: FC<Props> = ({ title, children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-1 mt-9 inline-block max-w-full border-8 border-double border-green-700  bg-green-100 p-3">
        <h1 className="my-6  text-center text-3xl">{title}</h1>
        <div>{children}</div>
      </div>
    </div>
  )
}
