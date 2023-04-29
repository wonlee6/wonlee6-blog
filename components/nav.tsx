import React, {memo, useEffect, useState} from 'react'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import styles from './nav.module.css'
import Image from 'next/image'
import Link from 'next/link'
import moon from '@/public/images/moon.svg'
import sun from '@/public/images/sun.svg'
import useScrollDown from '@/hooks/useScrollDown'

function Nav() {
  const isScrollDown = useScrollDown()

  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark'
        ? 'dark'
        : 'light'
      : 'light'
  )

  const handleClick = () => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      ;(document.querySelector('body') as HTMLBodyElement).classList.add('dark')
    } else {
      ;(document.querySelector('body') as HTMLBodyElement).classList.remove(
        'dark'
      )
    }
  }, [theme])

  return (
    <header
      className={`w-full px-4 h-16 z-10 flex justify-center items-center bg-white bg-opacity-50 dark:bg-slate-950 dark:bg-opacity-50 dark:border-b dark:border-b-orange-200 ${
        isScrollDown ? styles.downdown : ''
      }`}>
      <nav className='w-3/4 xl:w-8/12'>
        <div className={`flex justify-between items-center`}>
          <div className='text-3xl font-semibold'>
            <Link href={`/`}>!!?!?!!??!</Link>
          </div>
          <div className='w-36 text-4xl flex justify-between items-center'>
            <button onClick={handleClick}>
              {theme === 'light' ? (
                <Image
                  className={`cursor-pointer hover:opacity-70`}
                  width={30}
                  height={40}
                  src={moon}
                  alt={moon}
                  loading='lazy'
                />
              ) : (
                <Image
                  className={`cursor-pointer hover:opacity-90`}
                  width={30}
                  height={40}
                  src={sun}
                  alt={sun}
                  loading='lazy'
                />
              )}
            </button>
            <GitHubIcon
              titleAccess='wonlee6'
              fontSize={'inherit'}
              className={`cursor-pointer ${styles.icon}`}
            />
            <EmailIcon
              titleAccess='wonlee6@gamil.com'
              fontSize={'inherit'}
              className={`cursor-pointer ${styles.icon}`}
            />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default memo(Nav)
