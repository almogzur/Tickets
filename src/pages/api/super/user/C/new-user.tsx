// File: pages/api/public.ts

import {  ModleAuthUsersConncectin  ,disconnectFromDb} from "@/util/DB/connections/Mongosee_Connection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { UsersModle } from "@/util/DB/Schmas/new-user";



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