import type {NextApiRequest, NextApiResponse} from 'next'
import {Client} from '@notionhq/client'
import {GetPagePropertyResponse} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_API_KEY
})

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId
    })
    return response
  } catch (error) {
    alert('상세 정보 가져오는 도중 에러 발생')
  }
}
type Data = {
  detail?: GetPagePropertyResponse
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const {pageId, propertyId} = req.query

    const response = await getDetail(String(pageId), String(propertyId))
    res.status(200).json({
      message: `Success get detail`,
      detail: response
    })
  } catch (error) {
    res.status(400).json({message: `Failed get detail`})
  }
}
