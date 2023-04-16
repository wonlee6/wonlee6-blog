import React, {ReactNode} from 'react'
import Nav from './nav'

interface Props {
  children: ReactNode
  home: boolean
}

export default function Layout(props: Props) {
  return (
    <main
      className={`flex flex-col h-screen dark:h-full bg-white text-gray-800 dark:bg-black dark:text-white`}>
      <Nav />
      {props.children}
    </main>
  )
}
