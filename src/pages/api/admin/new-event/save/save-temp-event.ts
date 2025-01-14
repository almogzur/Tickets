import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  CreateDynamicConnection, disconnectFromDb } from '@/lib/DB/Mongosee_Connection';
import mongoose from 'mongoose';
import { getDynamicModel, TempNewEventSchema } from '@/components/admin/newEvent/types/new-event-db-schema';

 
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

 const connectionStatus = await CreateDynamicConnection(session)

  if(connectionStatus.connection.db){
    const body = req.body;
    console.log(body,body.infoFileds);

     const TempModel = getDynamicModel("temp_events",TempNewEventSchema)
     const doc = new TempModel({...body.infoFileds,...body.tickets}) // Pass body to the model
     const result =   await doc.save(); // Save to the database

      if(result instanceof mongoose.Error){
          console.log("Doc Err");
          res.status(400).json({ message: 'Save Err' });
      }
    console.log("saved new modle",result);
    
    res.status(200).json({ message: 'Hello from Next.js!' });
  }
  else{
      console.log("no db");
  }
}