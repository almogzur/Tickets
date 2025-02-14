import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/dbs/mongosee-fn";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  DraftModle } from "@/util/dbs/schma/new-event";


type Message = {
    massage:string
  }

export default async function handler(req: NextApiRequest,res: NextApiResponse<Message>) {

  const API_NAME = "Drafts Remove Api (Click)";
  console.log(API_NAME);
  
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(401).end(`Method ${req.method} Not Allowed`);
  }

  if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ massage: 'You Shell Not Pass' });
  }

  const isConnected  = await MongoseeWithSessionModleDb(session)


 if(!isConnected){
      console.log("no db");
      return res.status(500).json({massage:" No DB Connection"})
    }
  const id = req.body.id
  console.log(id);
      // calling the Molde Only on Api call prevanting un wanted folder saves  
   const Drafts  = await DraftModle.findOneAndDelete({_id:id})

       if(!Drafts){
        await disconnectFromMongooseDb(isConnected,API_NAME) 

        return  res.status(204).json({massage:`No Draft Removed`})

       }

      
     await disconnectFromMongooseDb(isConnected,API_NAME) 
    return    res.status(200).json({massage:`Draft ${id} Removed`})


    
  
}