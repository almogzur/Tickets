import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {CreateMongooseClient} from "@/util/dbs/mongosee-fn";
import  {  userDataPrefix } from "@/util/dbs/mongosee-fn";
import { PayPalModel } from "@/util/dbs/schma/models";

import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{

 const API_NAME =  'Get User Billing Info ( page - getServerProps) Only  ' 

  
 if (req.method !== 'GET') {
    return   res.status(405).json({ message:API_NAME + "Not Allowd" });
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

     const Modle = PayPalModel(connection)

     const result = await Modle.findOne({},{},{lean:true})

     return res.status(200).send(result)

   }
  catch (err){ 
         return res.status(500).json({massage:err})
   }
  
}