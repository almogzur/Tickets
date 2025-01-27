// File: pages/api/public.ts

import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 const API_NAME =  "Client Update Events"
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello, this is a public API endpoint!' });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${'$'}{req.method} not allowed` });
  }
}