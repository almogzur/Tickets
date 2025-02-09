import { NextApiRequest, NextApiResponse } from "next";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
 const API_NAME =  '' 
  if (req.method !== 'POST') {
     res.status(200).json({ message: API_NAME+ "Not _ Approved Call" });
 }

 
}