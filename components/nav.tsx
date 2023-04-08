import React, {useEffect, useMemo, useRef, useState} from 'react'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import BoyIcon from '@mui/icons-material/Boy'
import styles from './nav.module.css'
import useScrollDown from '@/hooks/useScrolldown'
import Image from 'next/image'
import darkImg from '@/public/images/dark.svg'
import lightImg from '@/public/images/moon.svg'

function Nav() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme') === 'dark'
        ? 'dark'
        : 'light'
      : 'light'
  )

  const isScrollDown = useScrollDown()

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
    <nav
      id={`${styles.navbar}`}
      className={`${isScrollDown ? styles.downdown : ''}`}>
      <div className="text-3xl font-semibold">
        <BoyIcon fontSize={'inherit'} />
        <span>wonlee1205 Blog</span>
      </div>
      <div className="w-28 text-4xl flex justify-between items-center">
        <button onClick={handleClick}>
          <Image
            className="w-7"
            src={theme === 'light' ? darkImg : lightImg}
            alt={theme === 'light' ? darkImg : lightImg}
          />
        </button>
        <GitHubIcon
          titleAccess="wonlee6"
          fontSize={'inherit'}
          className={`cursor-pointer ${styles.icon}`}
        />
        <EmailIcon
          titleAccess="wonlee6@gamil.com"
          fontSize={'inherit'}
          className={`cursor-pointer ${styles.icon}`}
        />
      </div>
    </nav>
  )
}

export default React.memo(Nav)
