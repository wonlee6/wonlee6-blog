import {Inter} from 'next/font/google'
import Layout from '@/components/layout'
import {GetStaticProps} from 'next'
import {PostData, getSortedPostsData} from '@/lib/posts'

const inter = Inter({subsets: ['latin']})

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
    <Layout postsData={allPostsData}>
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section> */}
      <div>awodkawokd</div>
    </Layout>
  )
}
