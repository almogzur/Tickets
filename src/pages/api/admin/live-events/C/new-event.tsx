// File: pages/api/public.ts

import { AdminEventModle } from "@/util/DB/Schmas/event";
import { disconnectFromDb, ModleDbNamedConnction } from "@/util/DB/connections/Mongosee_Connection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession  } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 
  const API_NAME = "Create Live Event Api " 
 
 const body = req.body 

  const session = await getServerSession(req, res, authOptions);

  const connection  = await ModleDbNamedConnction(session)

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  if(!connection){
     res.status(400).json({massage:" No DB Connection"})
    }

  if(!session){
      res.status(400).json({massage:"you SHELL NOT PASS @!!"})
    }
     
      console.log(body,API_NAME)
      const doc =  new AdminEventModle(body)
      const saveResult =  await doc.save(); 
      
      if(saveResult.errors){
          res.status(400).json({massage:`${API_NAME}, save err : ${saveResult.errors} `})
      }
      
      await disconnectFromDb(connection,API_NAME)

      res.status(200).json({massage:  API_NAME +"succsess " })
    
}