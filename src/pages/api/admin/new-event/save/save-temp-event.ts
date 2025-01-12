import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  connection, disconnectFromDb } from '@/lib/DB/Mongosee_Connection';
import  {TmepDbEventModle  } from '@/components/admin/newEvent/types/new-event-types';

 
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

  if(connection.connection.db){
    const body = req.body;
    console.log(body,body.infoFileds.image);
    
    const doc = new TmepDbEventModle(body.infoFileds,body.tickets); // Pass body to the model
    await doc.save(); // Save to the database
    console.log("saved new modle");
    
    res.status(200).json({ message: 'Hello from Next.js!' });
  }
  else{
      console.log("no db");
  }
}