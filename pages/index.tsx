import {GetStaticProps} from 'next'
import {PostData, getSortedPostsData} from '@/lib/posts'
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
    <section className='h-full w-3/4 mt-0 mb-0 ml-auto mr-auto'>
      <div className='mt-28 w-full h-full'>
        {allPostsData.map((item) => (
          <div key={item.id} className='flex flex-col'>
            <div className='flex justify-evenly'>
              <p>
                Title : <Link href={`/posts/${item.id}`}>{item.title}</Link>
              </p>
              <p>{item.date}</p>
            </div>
            <div>{item.description ?? ''}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
