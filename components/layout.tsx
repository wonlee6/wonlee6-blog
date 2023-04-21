import React, {ReactNode, useMemo, useRef, useState} from 'react'
import Nav from './nav'
import dynamic from 'next/dynamic'

const ArrayTopIcon = dynamic(() => import('./arrayTopIcon'), {
  ssr: false
})

interface Props {
  children: ReactNode
}

export default function Layout(props: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isShowIcon, setIsShowIcon] = useState(false)

  const clientHeight = useMemo(() => {
    if (!scrollRef.current) return 0
    return scrollRef.current.clientHeight
  }, [scrollRef])

  return (
    <main
      ref={scrollRef}
      className={`flex flex-col h-full dark:h-full bg-white text-gray-800 dark:bg-black dark:text-white`}>
      <Nav clientHeight={clientHeight} setIsShowIcon={setIsShowIcon} />
      {props.children}
      {isShowIcon ? <ArrayTopIcon /> : null}
    </main>
  )
}
