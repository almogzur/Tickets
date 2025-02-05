// File: pages/api/public.ts

import { createModel } from "@/components/admin/newEvent/types/new-event-db-schema";
import {  ModleAuthUsersConncectin  ,disconnectFromDb} from "@/lib/DB/Mongosee_Connection";
import { NewUserSchemaDefinition, NewUserType } from "@/lib/supervisor_types";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";



export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{

 const API_NAME = "New Tickets User "

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

    const session = await getServerSession(req, res, authOptions);
  

  if (!session?.user.name) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

  const isConnected  = await ModleAuthUsersConncectin()

    if(!isConnected){
      console.log("no db");
      res.status(4001).json({ message: "no db" });
   }

   const Data = req.body
   
  const UsersModle = createModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)

   const model = new  UsersModle(Data) 

   const doc = await model.save({checkKeys:true})

   if(doc.errors){
    console.log(API_NAME,"Eroor  Saving ", doc.errors );
    
    res.status(400).json({massage:"erros" ,})
   }

   console.log(doc);
   
  await disconnectFromDb(isConnected,API_NAME)

   res.status(200).json({massage:"new user saved "})


}