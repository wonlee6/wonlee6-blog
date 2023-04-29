// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {PostData} from '@/lib/posts'
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
    res.status(200).json({
      message: 'Welcome'
    })
  } catch (error) {
    res.status(500).json({message: `Error ${error}`})
  }
}
