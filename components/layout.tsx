import React, {ReactNode} from 'react'
import NestedList from '@/components/list'
import styles from './layout.module.css'
import Nav from './nav'

interface Props {
  children: ReactNode
}

export default function Layout(props: Props) {
  return (
    <main className="flex flex-col h-screen bg-white text-gray800 dark:bg-black dark:text-gray-200">
      <Nav />
      <section className={`h-screen p-3 mt-20 ${styles.container}`}>
        <aside
          className="h-100 w-100"
          style={{borderRight: '1px solid #E7EBF0'}}>
          <NestedList />
        </aside>
        <article className="flex-1 h-100 pl-3">{props.children}</article>
      </section>
    </main>
  )
}
