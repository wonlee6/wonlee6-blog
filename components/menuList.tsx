import React, {useState, useMemo, memo, useEffect} from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import {PostData, Tag} from '@/lib/posts'
import Link from 'next/link'
import {useRouter} from 'next/router'

interface ListModel {
  tag: Tag
  children: PostData[]
}

function MenuList({postsData}: {postsData: PostData[]}) {
  const {query, asPath} = useRouter()

  const [open, setOpen] = useState<{[K: string]: boolean}>(
    postsData
      .reduce(
        (acc: Tag[], cur: PostData) =>
          acc.includes(cur.tag) ? acc : [...acc, cur.tag],
        []
      )
      .reduce(
        (acc: {[key: string]: boolean}, cur: Tag) => ({
          ...acc,
          [cur]: false
        }),
        {}
      )
  )

  const handleClick = (tag: Tag) => {
    setOpen((prev) => {
      return {
        ...prev,
        [tag]: !prev[tag]
      }
    })
  }

  const filteredPostsData: ListModel[] = useMemo(() => {
    return postsData
      .reduce((acc: ListModel[], cur: PostData) => {
        if (acc.find((i) => i.tag === cur.tag)) {
          return acc.map((i) => {
            if (i.tag === cur.tag) {
              return {
                ...i,
                children: [...i.children, cur]
              }
            }
            return i
          })
        }
        const data = {
          tag: cur.tag,
          children: [cur]
        }
        return [...acc, data]
      }, [])
      .sort((a, b) => {
        if (a.tag > b.tag) {
          return -1
        } else if (a.tag < b.tag) {
          return 1
        } else {
          return 0
        }
      })
  }, [postsData])

  useEffect(() => {
    const tag = asPath.split('tag=')[1]
    setOpen((prev) => ({...prev, [tag]: true}))
  }, [asPath])

  return (
    <>
      <List
        sx={{width: '100%', maxWidth: 360, position: 'sticky', top: 0}}
        component='aside'
        aria-labelledby='nested-list-subheader'>
        {filteredPostsData.map((item) => (
          <React.Fragment key={item.tag}>
            <ListItemButton onClick={() => handleClick(item.tag)}>
              <ListItemText
                className='font-semibold'
                title={item.tag}
                primary={item.tag}
              />
              {open[item.tag] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {item.children.length > 0
              ? item.children.map((value, index) => (
                  <React.Fragment key={index}>
                    <Collapse in={open[item.tag]} timeout='auto' unmountOnExit>
                      <List
                        className='text-base font-medium leading-6 truncate text'
                        component='div'
                        disablePadding
                        title={value.title}>
                        <Link href={`/posts/${value.id}`}>
                          <ListItemButton
                            className={`${
                              query.id === value.id
                                ? 'bg-sky-50 dark:bg-slate-600'
                                : ''
                            }`}
                            sx={{pl: 4}}>
                            <ListItemText
                              primary={value.title}
                              className={`truncate text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-700 font-semibold`}
                            />
                          </ListItemButton>
                        </Link>
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))
              : null}
            <Divider className='dark:bg-orange-200' />
          </React.Fragment>
        ))}
      </List>
    </>
  )
}
export default memo(MenuList)
