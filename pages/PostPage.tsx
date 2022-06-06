import { NextPage } from 'next'
import { Suspense } from 'react'
import { Layout } from '../components/Layout'
import { PostForm } from '../components/PostForm'
import { PostLists } from '../components/PostLists'
import { Spinner } from '../components/Spinner'

const PostPage: NextPage = () => {
  return (
    <>
      <Layout title="投稿">
        <Suspense fallback={<Spinner />}>
          <PostForm />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <PostLists />
        </Suspense>
      </Layout>
    </>
  )
}

export default PostPage
