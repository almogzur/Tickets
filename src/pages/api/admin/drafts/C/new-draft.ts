import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  ModleDbNamedConnction, disconnectFromDb } from '@/util/DB/connections/Mongosee_Connection';
import { moveToEventNameFolder } from '../cloudinary_helper_functions';
import {  DraftModle,  } from '@/util/DB/Schmas/event';

 
type ResponseData = {
  message: string
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

  const API_NAME = "CREATE NEW DRAFT API";

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
       console.error("Cloudinary configuration is missing");
       return res.status(401).json({ message: "Server configuration error" });
    }



  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

  const connection  = await ModleDbNamedConnction(session)

    if(!connection){
      console.log("no db");
      res.status(4001).json({ message: "no db" });
  
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
        res.status(400).json({ message: 'Save Err' });
     }

   console.log("Saved new Doc",saveResult); 

   res.status(200).json({ message: "Saved New Modle" });
     
 
      await disconnectFromDb(connection,API_NAME) 

  // Stage 2 on file re-location continue saving 


}

