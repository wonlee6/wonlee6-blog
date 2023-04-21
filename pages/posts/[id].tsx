import React from 'react'
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
import LoadingSpinner from '@/components/loadingSpinner'

const EditerMarkdown = dynamic(() => import('@/components/markdownView'))

const MenuList = dynamic(() => import('@/components/menuList'), {
  loading: () => <LoadingSpinner />
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

interface Props {
  postData: {
    date: string
    id: string
    tag: string
    title: string
    contentHtml: string
    mdxSource?: any
  }
  allPostsData: PostData[]
}

export default function Post({postData, allPostsData}: Props): JSX.Element {
  const router = useRouter()

  if (router.isFallback) {
    return <p>...Loading</p>
  }

  return (
    <section className='h-full flex justify-center w-3/4 mt-0 mb-0 ml-auto mr-auto'>
      <aside
        className='h-100 w-1/4 mt-20'
        style={{borderRight: '1px solid #E7EBF0'}}>
        <MenuList postsData={allPostsData} />
      </aside>
      <article className='w-3/4 h-full pl-4 mt-20'>
        <div>
          <Head>
            <title>{postData.title}</title>
          </Head>
          <div>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
              <Date dateString={postData.date} />
            </div>
            {postData.contentHtml && (
              <div className='prose prose-slate prose-headings:underline dark:prose-invert dark:prose-blockquote:text-black'>
                <EditerMarkdown contentHtml={postData.contentHtml} />
              </div>
            )}
            {/* {postData.mdxSource && (
              <MDXRemote {...postData.mdxSource} components={components} />
            )} */}
            <Utterance />
            <div>
              <Link
                className='text-teal-500 font-semibold hover:text-teal-600'
                href='/'>
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
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
