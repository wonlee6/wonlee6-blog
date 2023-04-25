import React, {useMemo} from 'react'
import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import {
  PostData,
  getAllPostIds,
  getPostData,
  getSortedPostsData
} from '@/lib/posts'
import Date from '@/components/date'
import utilStyles from '../../styles/utils.module.css'
import Loading from '@/components/loading'
import * as _ from 'lodash'

interface Props {
  postData: {
    date: string
    id: string
    tag: string
    title: string
    contentHtml: string
    description: string
    mdxSource?: any
  }
  allPostsData: PostData[]
}

export default function Post({postData, allPostsData}: Props): JSX.Element {
  const router = useRouter()

  const prevPost = useMemo(() => {
    const findIndex = _.findIndex(
      allPostsData,
      (item) => item.id === postData?.id
    )
    if (findIndex <= 0) {
      return null
    }

    if (findIndex > 0) {
      return allPostsData[findIndex - 1]
    }
  }, [allPostsData, postData])

  const nextPost = useMemo(() => {
    const findIndex = _.findIndex(
      allPostsData,
      (item) => item.id === postData?.id
    )

    if (findIndex === -1 || findIndex === allPostsData.length) {
      return null
    }

    if (findIndex < allPostsData.length) {
      return allPostsData[findIndex + 1]
    }
  }, [allPostsData, postData])

  if (router.isFallback) {
    return <p>...Loading</p>
  }

  return (
    <section className='w-3/4 xl:w-8/12 h-full flex justify-center my-0 mx-auto'>
      <aside
        className='h-100 w-1/4 mt-20'
        style={{borderRight: '1px solid #E7EBF0'}}>
        <MenuList postsData={allPostsData} />
      </aside>
      <article className='w-3/4 h-full pl-10 mt-20'>
        <Head>
          <title>{postData.title}</title>
          <meta name={postData.title} content={postData.description ?? ''} />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <meta property='og:title' content={postData.title} />
          <meta property='og:type' content='website' />
          <meta
            property='og:url'
            content={'https://wonlee6-blog.vercel.app/'}
          />
          <meta property='og:article:author' content='sangwon Blog' />
        </Head>
        <div className='w-full'>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          {postData.contentHtml && (
            <div className='w-full prose 2xl:prose-lg prose-neutral prose-headings:underline dark:prose-invert dark:prose-blockquote:text-black'>
              <EditerMarkdown contentHtml={postData.contentHtml} />
            </div>
          )}
          {/* {postData.mdxSource && (
              <MDXRemote {...postData.mdxSource} components={components} />
            )} */}
          <Utterance />
          <div className='flex justify-between'>
            <Link
              className='text-teal-500 font-semibold hover:text-teal-600'
              href={prevPost ? `/posts/${prevPost.id}` : `/`}>
              {prevPost ? `<- Prev: ${prevPost?.title ?? ''}` : '<- Go to Home'}
            </Link>
            {nextPost && (
              <Link
                className='text-teal-500 font-semibold hover:text-teal-600'
                href={`/posts/${nextPost.id}`}>
                {`Next: ${nextPost.title ?? ''} ->`}
              </Link>
            )}
          </div>
        </div>
      </article>
    </section>
  )
}

const EditerMarkdown = dynamic(() => import('@/components/markdownView'), {
  ssr: false,
  loading: () => <Loading />
})

const MenuList = dynamic(() => import('@/components/menuList'), {
  ssr: false
})
const Utterance = dynamic(() => import('@/components/utterance'))

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true
  }
}
export const getStaticProps: GetStaticProps = async ({params}) => {
  const postData = await getPostData(params?.id as string)
  const allPostsData = getSortedPostsData()
  return {
    props: {
      postData,
      allPostsData
    }
  }
}
// const Button = ({children}: {children: any}): JSX.Element => {
//   return (
//     <button
//       className='bg-black dark:bg-white text-lg text-teal-200 dark:text-teal-700 rounded-lg px-5'
//       onClick={() => alert(`thanks to ${children}`)}>
//       {children}
//     </button>
//   )
// }

// const components = {CodeBlock}
