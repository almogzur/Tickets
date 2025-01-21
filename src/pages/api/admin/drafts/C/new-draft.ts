import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  CreateConectionFronSession, disconnectFromDb } from '@/lib/DB/Mongosee_Connection';
import { createDynamicModel, DraftModle, TempNewEventSchema } from '@/components/admin/newEvent/types/new-event-db-schema';
import { EventMongoseeDraftType } from '@/components/admin/newEvent/types/new-event-types';

 
type ResponseData = {
  message: string
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

  const API_NAME = "Creating NEW DRAFT";
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

 const connection = await CreateConectionFronSession(session)


 if(!connection.connection.db){
  const reTryConnection =   await CreateConectionFronSession(session)
  if(!reTryConnection.connection.db){
      console.log("no db");
      res.status(4001).json({ message: "no db" });
  }
}
      const body = req.body
    console.log(body)
     const Model = DraftModle
      const doc = new Model(body) // Pass body to the model
      const saveResult =  await doc.save(); // Save to the database
    
   // console.log(body,body.infoFileds);

   if(saveResult.errors){
        console.log("Doc Err",saveResult.errors);
        res.status(400).json({ message: 'Save Err' });
      }

    console.log("saved new modle",saveResult); 

    await disconnectFromDb(connection,API_NAME) 

    res.status(200).json({ message: "Saved New Modle" });
 
}

