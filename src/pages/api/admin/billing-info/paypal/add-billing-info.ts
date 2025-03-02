import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserPayPalInfo, UserPayPalInfoValidationSchema } from "@/types/pages-types/admin/user-biling-info-types";
import {CreateMongooseClient} from "@/util/dbs/mongosee-fn";
import { PayPalModel } from "@/util/dbs/schma/models";

import { decryptData, encryptData } from "@/util/fn/crypto";
import { m } from "framer-motion";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


const secretKey = `${process.env.CIPHER_SECRET}`;

if (!secretKey) {
  throw new Error("CIPHER_SECRET is missing");
}



export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
 const API_NAME =  ' Add Users PayPal Billing Info Api  ' 

   const session = await getServerSession(req, res, authOptions);
  
 
   if (req.method !== 'POST') {
    return   res.status(405).json({ message:API_NAME + "Not Allowd" });
       }
       if (!session) {
        console.log(API_NAME, 'You Shell Not Pass');
        return res.status(401).json({ message: 'You Shell Not Pass' });
         }
         const connection = await CreateMongooseClient(`${session.user.name}${process.env.BILING_FOLDER_NAME}`)

   if(!connection){  
  return res.status(500).json({massage:" No DB Connection"})
     }   

    
     const body = req.body
    const isValiedData = UserPayPalInfoValidationSchema.safeParse(body)
  
    if(!isValiedData.success){
        console.log("no valid data  Server" , API_NAME)
        return  res.status(400).json({ massage : "אין פרטי חשבון " })
      } 
    
  const { clientSecret } = isValiedData.data
  const ChiperSecret = encryptData(clientSecret,secretKey)

  const toSaveDoc = {
      ...isValiedData.data,
     clientSecret:ChiperSecret
    }

    const Modle  = PayPalModel(connection)

   const doc = new  Modle(toSaveDoc)
    
    const result = await doc.save()


       if(! result){

          console.log(API_NAME ,"faeld" )  
              
          return   res.status(400).json({massage: API_NAME+  " Save Err"})
      }
      console.log(API_NAME ,"Success" )  
          
      return res.status(200).json({massage:" Info Saved  " + API_NAME})
      


}