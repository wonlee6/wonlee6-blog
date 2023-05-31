import type {NextApiRequest, NextApiResponse} from 'next'
import {Client} from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY
})

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(name: string) {
  try {
    await notion.pages.create({
      parent: {database_id: databaseId as string},
      properties: {
        title: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        }
      }
    })
  } catch (error) {
    alert('아이템 추가하는 도중 에러 발생')
  }
}
type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {name} = req.query

  if (name == null) {
    return res.status(400).json({message: 'No Name'})
  }

  try {
    await addItem(String(name))
    res.status(200).json({
      message: `Success ${name} add item`
    })
  } catch (error) {
    res.status(400).json({message: `Failed ${name} add item`})
  }
}
