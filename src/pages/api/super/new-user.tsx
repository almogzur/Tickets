// File: pages/api/public.ts

import {  MongoseeAuthUsersDb  ,disconnectFromMongooseDb} from "@/util/DB/mongosee-fn";
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
    const connection  = await MongoseeAuthUsersDb()
    const Data = req.body
    const model = new  UsersModle(Data) 

  if (!session?.user.name) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }
  if(!connection){
      return  res.status(500).json({ message: "no db" });
   }

   const doc = await model.save({checkKeys:true})

   if( !doc || doc.errors){
      console.log(API_NAME,"Err",doc.errors,doc)
      return res.status(500).json({massage:"erros" ,})
   }

    await disconnectFromMongooseDb(connection,API_NAME)
    console.log(API_NAME,"Succsess")
    return res.status(200).json({massage:"new user saved "})



}