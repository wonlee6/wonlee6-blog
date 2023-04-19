import React, {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import moon from '@/public/images/moon.svg'
import sun from '@/public/images/sun.svg'
import styles from './nav.module.css'
import Image from 'next/image'
import {throttle} from 'lodash'
import Link from 'next/link'

interface Props {
  clientHeight: number
  setIsShowIcon: Dispatch<SetStateAction<boolean>>
}

function Nav(props: Props) {
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

  const [isScrollDown, setIsScrollDown] = useState(true)
  const beforeScrollY = useRef(0)

  const scrollEvent = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY
        if (beforeScrollY.current < currentScrollY) {
          setIsScrollDown(false)
        } else {
          setIsScrollDown(true)
        }
        if (window.scrollY > props.clientHeight / 2) {
          props.setIsShowIcon(true)
        } else {
          props.setIsShowIcon(false)
        }
        beforeScrollY.current = currentScrollY
      }, 300),
    [beforeScrollY, props]
  )

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)
    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header
      className={`w-full h-16 z-10 flex justify-center items-center bg-white bg-opacity-50 dark:bg-slate-950 dark:bg-opacity-50 dark:border-b dark:border-b-orange-200 ${
        isScrollDown ? styles.downdown : ''
      }`}>
      <nav className={`w-3/4`}>
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
                />
              ) : (
                <Image
                  className={`cursor-pointer hover:opacity-90`}
                  width={30}
                  height={40}
                  src={sun}
                  alt={sun}
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
