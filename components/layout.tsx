import React, {ReactNode} from 'react'
import Nav from './nav'
import Footer from './footer'

interface Props {
  children: ReactNode
}

export default function Layout(props: Props) {
  return (
    <main
      className={`flex flex-col h-full dark:h-full bg-white text-gray-800 dark:bg-black dark:text-white`}>
      <Nav />
      {props.children}
      <Footer />
    </main>
  )
}
