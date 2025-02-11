import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/db/connections/mongosee/mongosee-connections";
import { PayPalModle } from "@/util/db/schmas/user-biling-info";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{

 const API_NAME =  'Get User Billing Info ( page - getServerProps) Only  ' 

    const session = await getServerSession(req, res, authOptions);
 
    const connection = await MongoseeWithSessionModleDb(session)
  
 if (req.method !== 'GET') {
    return   res.status(203).json({ message:API_NAME + "Not Allowd" });
 }
 if(!connection){
  return res.status(500).json({massage:" No DB Connection"})
}

 if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

  try{ 
     const result = await PayPalModle.findOne({},{},{lean:true})
      await disconnectFromMongooseDb(connection,API_NAME)

     return res.status(200).send(result)

   }
  catch (err){ 
         return res.status(500).json({massage:err})
   }
  
  



}