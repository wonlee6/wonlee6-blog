// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PostData, getSortedPostsData} from '@/lib/posts'
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
  message: string
  postsData?: PostData[] | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const postsData = await getSortedPostsData()
    res.status(200).json({
      message: 'Success',
      postsData
    })
  } catch (error) {
    res.status(400).json({message: `Error ${error}`, postsData: undefined})
  }
}
