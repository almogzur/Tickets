import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserPayPalInfo } from "@/types/pages-types/biling-types";
import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/db/connections/mongosee/mongosee-connections";
import { PayPalModle } from "@/util/db/schmas/user-biling-info";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
 const API_NAME =  'Add PayPal Billing Info' 

   const session = await getServerSession(req, res, authOptions);

   const connection = await MongoseeWithSessionModleDb(session)
 
  if (req.method !== 'POST') {
    return   res.status(200).json({ message:API_NAME + "Not Allowd" });
 }
 if(!connection){
  return res.status(500).json({massage:" No DB Connection"})
}

 if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

const body = req.body as UserPayPalInfo

console.log(body)

const { AccountId, payEmail , phone ,clientId , clientSecret ,} = body

if(! AccountId || ! payEmail || ! phone || ! clientId || !clientId || !clientSecret ){
     return  res.status(400).json({ massage : "אין פרטי חשבון " })
}

const doc = new  PayPalModle(body)
try{ 
   const result = await doc.save()
   await disconnectFromMongooseDb(connection,API_NAME)

      if(result && result._id){
        return   res.status(200).json({massage: API_NAME+  " Succsess"})
      }
      return res.status(204).end()
 } catch (err){ 
      return  res.status(400).json({massage: API_NAME +  " err " + err})
 }

}