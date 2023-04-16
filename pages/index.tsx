import {GetStaticProps} from 'next'
import {PostData, getSortedPostsData} from '@/lib/posts'
import {Fragment} from 'react'
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}: {allPostsData: PostData[]}) {
  return (
    <section className='mt-28'>
      {allPostsData.map((item) => (
        <Fragment key={item.id}>
          <Link href={`/posts/${item.id}`}>{item.title}</Link>
        </Fragment>
      ))}
    </section>
  )
}
