import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PayPalInfoZVS } from "@/types/pages-types/admin/user-billing-info-types";
import {CreateMongooseClient, userDataPrefix} from "@/util/db/mongoose-connect";
import { PayPalModel } from "@/util/db/mongoose-models";

import {  encryptData } from "@/util/fn/crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


export const secretKey = `${process.env.CIPHER_SECRET}`;

if (!secretKey) {
  throw new Error("Cipher_Secret is missing");
}

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  
 const API_NAME =  'Save-Paypal-Billing-Info Api' 

   const session = await getServerSession(req, res, authOptions);
  
 
   if (req.method !== 'POST') {
    return   res.status(405).json({ message:API_NAME + "Not allowed" });
       }
       if (!session) {
        console.log(API_NAME, 'You Shell Not Pass');
        return res.status(401).json({ message: 'You Shell Not Pass' });
         }
  const connection = await CreateMongooseClient(`${session.user.name}${userDataPrefix}`)

   if(!connection){  
      return res.status(500).json({massage:" No DB Connection"})
    }   

   const body = req.body
   const isValidData = PayPalInfoZVS.safeParse(body)
  
    if(!isValidData.success){
        console.log("no valid data  Server" , API_NAME)
        return  res.status(400).json({ massage : "אין פרטי חשבון " })
      } 
    
  const { clientSecret } = isValidData.data
  const chipperSecret = encryptData(clientSecret,secretKey)

  const toSaveDoc = {
      ...isValidData.data,
        clientSecret:chipperSecret
    }

    const Model  = PayPalModel(connection)

   const doc = new  Model(toSaveDoc)
    
    const result = await doc.save()


       if(! result){

          console.log(API_NAME ,"failed" )  
              
          return   res.status(400).json({massage: API_NAME+  " Save Err"})
      }
      console.log(API_NAME ,"Success" )  
          
      return res.status(200).json({massage:" Info Saved  " + API_NAME})
      


}