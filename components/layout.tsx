import React, {ReactNode} from 'react'
import styles from './layout.module.css'
import Nav from './nav'
import MenuList from '@/components/menuList'
import {PostData} from '@/lib/posts'
import Utterance from './utterance'
import Link from 'next/link'

interface Props {
  children: ReactNode
  home: boolean
  postsData: PostData[]
}
export default function Layout(props: Props) {
  return (
    <main
      className={`flex flex-col h-screen bg-white text-gray-800 dark:bg-black dark:text-white`}>
      <Nav />
      <section className={`${styles.container} h-full`}>
        <aside
          className='h-100 w-100 mt-20'
          style={{borderRight: '1px solid #E7EBF0'}}>
          <MenuList postsData={props.postsData} />
        </aside>
        <article className='flex-1 h-100 pl-3 mt-20'>
          {props.children}
          {!props.home && (
            <>
              <Utterance />
              <div>
                <Link
                  className='text-teal-500 font-semibold hover:text-teal-600'
                  href='/'>
                  ← Back to home
                </Link>
              </div>
            </>
          )}
        </article>
      </section>
    </main>
  )
}
