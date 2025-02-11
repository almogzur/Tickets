// File: pages/api/public.ts

import { AdminEventModle } from "@/util/db/schmas/event";
import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/db/connections/mongosee/Mongosee";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession  } from "next-auth";
import { ClientEventType } from "@/types/pages-types/new-event-types";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 
  const API_NAME = "Create Live Event Api " 
 
 const body = req.body  as ClientEventType

  const session = await getServerSession(req, res, authOptions);

  const connection  = await MongoseeWithSessionModleDb(session)

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(401).end(`Method ${req.method} Not Allowed`);
  }
  
  if(!connection){
     return res.status(500).json({massage:" No DB Connection"})
    }

  if(!session){
      return res.status(401).json({massage:"you SHELL NOT PASS @!!"})
    }
     
      console.log(body,API_NAME)
      const doc =  new AdminEventModle(body)
      const saveResult =  await doc.save(); 
      
      if(saveResult.errors){
        await disconnectFromMongooseDb(connection,API_NAME)

       return    res.status(206).json({massage:`${API_NAME}, save err : ${saveResult.errors} `})
      }
      
     await disconnectFromMongooseDb(connection,API_NAME)
    return     res.status(200).json({massage:  API_NAME +"succsess " })
    
}