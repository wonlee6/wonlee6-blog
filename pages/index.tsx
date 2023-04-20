import {useMemo, useState} from 'react'
import {GetStaticProps} from 'next'
import Link from 'next/link'
import {PostData, getSortedPostsData} from '@/lib/posts'
import dynamic from 'next/dynamic'

const Stack = dynamic(() => import('@mui/material/Stack'), {
  ssr: false
})

const Pagination = dynamic(() => import('@mui/material/Pagination'), {
  ssr: false
})

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}: {allPostsData: PostData[]}) {
  const postsLength = Math.ceil(allPostsData.length / 10)
  const [currentPage, setCurrentPage] = useState(1)

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  const filteredPostsData = useMemo(() => {
    return [...allPostsData].slice(currentPage * 10 - 10, currentPage * 10)
  }, [allPostsData, currentPage])

  return (
    <main className='h-full w-3/4 my-0 mx-auto'>
      <div className='mt-28 w-full h-full mb-auto divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Latest
          </h1>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {filteredPostsData.map((item) => (
            <li key={item.id} className='py-12'>
              <article>
                <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'></dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      {item.date}
                    </dd>
                  </dl>
                  <div className='space-y-5 xl:col-span-3'>
                    <div className='space-y-6'>
                      <div>
                        <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                          {item.title}
                        </h2>
                        <div className='flex flex-wrap'>{item.tag}</div>
                      </div>
                      <div className='prose max-w-none text-gray-500 dark:text-gray-400'>
                        {item.description ?? ''}
                      </div>
                    </div>
                    <div className='text-base leading-6 text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-700 font-semibold'>
                      <Link
                        href={{
                          pathname: `/posts/${item.id}`,
                          query: {tag: item.tag}
                        }}>
                        Read More -{'>'}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className='mb-28 pt-12 flex justify-center'>
          <Stack spacing={2}>
            <Pagination
              page={currentPage}
              onChange={handlePagination}
              count={postsLength}
              color='primary'
              size='large'
            />
          </Stack>
        </div>
      </div>
    </main>
  )
}
