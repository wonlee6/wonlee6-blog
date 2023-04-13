import Layout from '@/components/layout'
import {
  PostData,
  getAllPostIds,
  getPostData,
  getSortedPostsData
} from '@/lib/posts'
import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import React from 'react'
import utilStyles from '../../styles/utils.module.css'
import Date from '@/components/date'
import {useRouter} from 'next/router'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
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
  }
  allPostsData: PostData[]
}

export default function Post({postData, allPostsData}: Props) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>...Loading</div>
  }

  return (
    <Layout postsData={allPostsData}>
      <div>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          {postData.contentHtml && (
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
          )}
          {/* {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )} */}
        </article>
      </div>
    </Layout>
  )
}
