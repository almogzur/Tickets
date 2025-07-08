import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {CreateMongooseClient} from "@/util/db/mongoose-connect";
import  {  userDataPrefix } from "@/util/db/mongoose-connect";
import { PayPalModel } from "@/util/db/mongoose-models";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{

 const API_NAME =  'Get User  PayPal Billing Info ( page - getServerProps) Only  ' 

  
 if (req.method !== 'GET') {
    return   res.status(405).json({ message:API_NAME + "Not allowed" });
 }

 const session = await getServerSession(req, res, authOptions);


 if (!session?.user.name) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

  const connection  = await CreateMongooseClient(session.user.name+userDataPrefix)

  if(!connection){
   return res.status(500).json({massage:" No DB Connection"})
 }

  try{ 

     const Model = PayPalModel(connection)

     const result = await Model.findOne({},{},{lean:true})

     return res.status(200).send(result)

   }
  catch (err){ 
         return res.status(500).json({massage:err})
   }
  
}