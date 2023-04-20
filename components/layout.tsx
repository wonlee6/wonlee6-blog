import React, {MouseEvent, ReactNode, useMemo, useRef, useState} from 'react'
import dynamic from 'next/dynamic'
import Nav from './nav'

const IconButton = dynamic(() => import('@mui/material/IconButton'), {
  ssr: false
})

const ArrowCircleUpIcon = dynamic(
  () => import('@mui/icons-material/ArrowCircleUp'),
  {
    ssr: false
  }
)

interface Props {
  children: ReactNode
  home: boolean
}

export default function Layout(props: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isShowIcon, setIsShowIcon] = useState(false)

  const handleScrollTop = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

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
      {isShowIcon && (
        <IconButton
          className='fixed bottom-14 right-12 w-16 h-16 text-5xl text-emerald-400 dark:hover:text-emerald-600'
          onClick={handleScrollTop}
          aria-label='Top'>
          <ArrowCircleUpIcon sx={{height: '2em', width: '2em'}} />
        </IconButton>
      )}
    </main>
  )
}
