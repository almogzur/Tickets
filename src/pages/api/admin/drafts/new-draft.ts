import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/db/connections/mongosee/mongosee-connections";
import { moveToEventNameFolder } from '@/util/fn/cloudinary_helper_functions';
import {  DraftModle,  } from '@/util/db/schmas/event';

 
type ResponseData = {
  massage: string
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

  const API_NAME = "CREATE NEW DRAFT API";

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
       console.error("Cloudinary configuration is missing");
       return res.status(401).json({ massage: "Server configuration error" });
    }



  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(401).end(`Method ${req.method} Not Allowed`);
  }

  if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ massage: 'You Shell Not Pass' });
  }

  const connection  = await MongoseeWithSessionModleDb(session)

    if(!connection){
      console.log("no db");
      return res.status(500).json({massage:" No DB Connection"})
  
   }
     const body = req.body

         // calling the Molde Only on Api call prevanting un wanted folder saves 

     const doc = new DraftModle(body) // Pass body to the model
      
     //console.log(body)
     const preview = body.info.preview
     const eventName = body.info.eventName
 
   //Stage 1  -- move image to folder baced on event name 
   if(!preview){}  

   try{ 
      const result = await moveToEventNameFolder(preview,eventName,session,API_NAME)
        if(result){
          console.log(API_NAME,"MoveFile Succsess");
         }
      }
   catch (err){
      console.log(API_NAME, " Falied MoveFile" , err );
 }
  

   //Stage 2 
   const saveResult =  await doc.save(); 

    if(saveResult.errors){
        console.log("Doc Err",saveResult.errors);
        await disconnectFromMongooseDb(connection,API_NAME) 

       return   res.status(400).json({ massage: 'Save Err' });
     }

   console.log("Saved new Doc",saveResult); 

   await disconnectFromMongooseDb(connection,API_NAME) 

   return res.status(200).json({ massage: "Saved New Modle" });
     

  // Stage 2 on file re-location continue saving 


}

