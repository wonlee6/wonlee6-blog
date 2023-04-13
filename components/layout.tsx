import React, {ReactNode} from 'react'
import styles from './layout.module.css'
import Nav from './nav'
import MenuList from '@/components/menuList'
import {PostData} from '@/lib/posts'

interface Props {
  children: ReactNode
  postsData: PostData[]
}

export default function Layout(props: Props) {
  return (
    <main className='flex flex-col h-screen bg-white text-gray800 dark:bg-black dark:text-gray-200'>
      <Nav />
      <section className={`h-screen p-3 mt-20 ${styles.container}`}>
        <aside
          className='h-100 w-100'
          style={{borderRight: '1px solid #E7EBF0'}}>
          <MenuList postsData={props.postsData} />
        </aside>
        <article className='flex-1 h-100 pl-3'>{props.children}</article>
      </section>
    </main>
  )
}
