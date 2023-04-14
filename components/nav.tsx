import React, {useEffect, useState} from 'react'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import moon from '@/public/images/moon.svg'
import sun from '@/public/images/sun.svg'
import styles from './nav.module.css'
import Image from 'next/image'
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
    <nav
      id={`${styles.navbar}`}
      className={`${isScrollDown ? styles.downdown : ''}`}>
      <div className='text-3xl font-semibold'>
        {/* <BoyIcon fontSize={'inherit'} /> */}
        <span>!!?!?!!??!</span>
      </div>
      <div className='w-36 text-4xl flex justify-between items-center'>
        <button onClick={handleClick}>
          {theme === 'light' ? (
            <Image width={30} height={40} src={moon} alt={moon} />
          ) : (
            <Image width={30} height={40} src={sun} alt={sun} />
          )}
          {/* <Image
            width={30}
            height={40}
            src={theme === 'light' ? moon : sun}
            alt={theme === 'light' ? moon : sun}
            loading='lazy'
          /> */}
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
    </nav>
  )
}

export default React.memo(Nav)
