import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import  {CreateMongooseClient,   userDataPrefix } from "@/util/db/mongosee-connect";
import { moveToEventNameFolder } from '@/util/fn/cloudinary_helper_functions';

import { NewDraftZVS } from '@/types/pages-types/admin/admin-event-types';
import { DraftModel } from '@/util/db/mongosee-models';


 
export default async function handler(req: NextApiRequest,res: NextApiResponse) {

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
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!session?.user.name) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ massage: 'You Shell Not Pass' });
  }

  const connection  = await CreateMongooseClient( session.user.name + userDataPrefix)

    if(!connection){
      console.log("no db");
      return res.status(500).json({massage:" No DB Connection"})
   }

     const body = req.body

     const isValideDate = NewDraftZVS.safeParse(body)

     if(!isValideDate.success){
        res.status(400).json({massage:"not valid data " + API_NAME})
     }

         // calling the Molde Only on Api call prevanting un wanted folder saves 

       const Modle = DraftModel(connection)

     const doc = new Modle(isValideDate.data) // Pass body to the model
      
     //console.log(body)
     const preview = body.info.preview
     const eventName = body.info.eventName
 
   // 1  -- move image to folder baced on event name 

   if(preview){
      await moveToEventNameFolder(preview,eventName,session,API_NAME)
   }  

   // 2 
   const saveResult =  await doc.save(); 

    if(saveResult.errors){
        console.log("Doc Err",saveResult.errors);

       return   res.status(400).json({ massage: 'Save Err' });
     }

   console.log("Saved new Doc",saveResult); 


   return res.status(200).json({ massage: "Saved New Modle" });
     



}

