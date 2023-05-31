import type {NextApiRequest, NextApiResponse} from 'next'
import {Client} from '@notionhq/client'

type PropertyModel = {
  가격: {
    id: string
    type: string
    number: number
  }
  설명: {
    id: string
    type: string
    rich_text: {
      type: string
      text: {
        content: string
        link: unknown
      }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: unknown
        href: unknown
      }
    }[]
    이름: {
      id: string
      type: string
      title: {
        type: string
        text: {
          content: string
          link: unknown
        }
        annotations: {
          bold: boolean
          italic: boolean
          strikethrough: boolean
          underline: boolean
          code: boolean
          color: unknown
          href: unknown
        }
      }[]
    }
  }
}

export type DatabaseItem = {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: {
    object: string
    id: string
  }
  last_edited_by: {
    object: string
    id: string
  }
  cover: unknown
  icon: unknown
  parent: {
    type: string
    database_id: string
  }
  archived: boolean
  properties: PropertyModel
  url: string
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY
})

const databaseId = process.env.NOTION_DATABASE_ID

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId as string,
      sorts: [
        {
          property: '가격',
          direction: 'ascending'
        }
      ]
    })
    return response
  } catch (error) {
    alert('아이템 정보 가져오는 도중 에러 발생')
  }
}
type Data = {
  items?: any
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await getItems()
    res.status(200).json({
      message: `Success get items`,
      items: response?.results
    })
  } catch (error) {
    res.status(400).json({message: `Failed get items`})
  }
}
