import React, {MouseEvent} from 'react'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

export default function ArrayTopIcon() {
  const handleScrollTop = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }
  return (
    <div className='fixed bottom-14 right-12 w-16 h-16'>
      <button
        className='text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-600'
        onClick={handleScrollTop}
        aria-label='Top'>
        <ArrowCircleUpIcon sx={{height: '2em', width: '2em'}} />
      </button>
    </div>
  )
}
