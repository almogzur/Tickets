import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  disconnectFromDb, TmepDbEventModle } from '@/lib/DB/Mongosee_Models';

 
type ResponseData = {
  message: string
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

  const API_NAME = "SAVE TEMP EVENT";
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }


  if (!session) {
    console.log(API_NAME, 'Your Shell Not Pass');
    return res.status(401).json({ message: 'Your Shell Not Pass' });
  }
  const body = await req.body;

  const newModle =  new TmepDbEventModle(body);

  await newModle.save(); // Save to the database.


  
  res.status(200).json({ message: 'Hello from Next.js!' })
}