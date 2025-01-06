import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
 
type ResponseData = {
  message: string
}
 
export default async function handler(

  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  const API_NAME = "SAVE TEMP EVENT";
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }


  if (!session) {
    console.log(API_NAME, 'Unauthorized');
    return res.status(401).json({ message: 'Unauthorized' });
  }




  res.status(200).json({ message: 'Hello from Next.js!' })
}