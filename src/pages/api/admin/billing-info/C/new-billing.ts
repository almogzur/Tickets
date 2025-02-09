import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
 const API_NAME =  'Add Admin Billing Info' 

   const session = await getServerSession(req, res, authOptions);
 
  if (req.method !== 'POST') {
     res.status(200).json({ message:API_NAME + "Not Allowd" });
 }


 if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

  


}