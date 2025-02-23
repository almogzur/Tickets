// File: pages/api/public.ts

import { AdminEventModle } from "@/util/dbs/schma/modles";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession  } from "next-auth";
import { NewEventZVS } from "@/types/pages-types/admin/admin-event-types";
import  {CreateMongooseClient, userDataPrefix } from "@/util/dbs/mongosee-fn";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 
  const API_NAME = "Create Live Event Api " 

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
 
  const body = req.body 

 const session = await getServerSession(req, res, authOptions);

  if(!session?.user.name){
    return res.status(401).json({massage:" you SHELL NOT PASS @!!" })
  }

  const connection  = await CreateMongooseClient( session.user.name + userDataPrefix)
  
  if(!connection){
     return res.status(500).json({massage:" No DB Connection"})
    }
  
   const isValidData = NewEventZVS.safeParse(body)

     if(!isValidData.success){
       return res.status(400).json({massage:'invalide data ' + API_NAME })
    }
 
      const Modle = AdminEventModle(connection)

      const doc =  new Modle(isValidData.data)
  
      const saveResult =  await doc.save();

      if(saveResult.errors){

       return    res.status(206).json({massage:`${API_NAME}, save err : ${saveResult.errors} `})
      }
      
    return     res.status(200).json({massage:  API_NAME +"succsess " })
    
}