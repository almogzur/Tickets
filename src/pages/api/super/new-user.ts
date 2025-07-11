// File: pages/api/public.ts

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import  {CreateMongooseClient,  UserPrefix } from "@/util/db/mongoose-connect";
import { UsersModel } from "@/util/db/mongoose-models";
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
    const Data = req.body



    // add new user validation schema  

  if (!session?.user.name) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

  const connection  = await CreateMongooseClient(UserPrefix)


  if(!connection){
      return  res.status(500).json({ message: "no db" });
   }

   const Model = UsersModel(connection)

   const model = new  Model(Data) 

   const doc = await model.save({checkKeys:true})

   if( !doc || doc.errors){
      console.log(API_NAME,"Err",doc.errors,doc)

      return res.status(500).json({massage:"error" ,})
   }

    console.log(API_NAME,"success")
    return res.status(200).json({massage:"new user saved "})



}