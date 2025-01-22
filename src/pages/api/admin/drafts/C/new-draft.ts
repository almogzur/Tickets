import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  CreateConectionFronSession, disconnectFromDb } from '@/lib/DB/Mongosee_Connection';
import {  DraftModle } from '@/components/admin/newEvent/types/new-event-db-schema';

import { v2 as cloudinary ,UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';

 
type ResponseData = {
  message: string
}
 
export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

  const API_NAME = "Creating NEW DRAFT";

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
       console.error("Cloudinary configuration is missing");
       return res.status(500).json({ message: "Server configuration error" });
    }

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

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

 const connection = await CreateConectionFronSession(session)

    if(!connection){
      console.log("no db");
      res.status(4001).json({ message: "no db" });
  
   }

      
     const body = req.body
     const Model = DraftModle
     const doc = new Model(body) // Pass body to the model
      
   //  console.log(body)
   const preview = body.preview
   const eventName = body.eventName
 

   //Stage 1  -- move image to folder baced on event name 
   if(!preview){

      }
      console.log(preview);
      const createFolderName = (name: string): string => {
      const sanitizedName = name.replace(/\s+/g, "_"); // Replace spaces with underscores
      // console.log(`${session?.user?.name}/${sanitizedName}`);
        return `${session?.user?.name}/${sanitizedName}`;
      };
      const MoveToEventNameFolder = async (publicId:string  , eventName :string):Promise<UploadApiResponse|UploadApiErrorResponse>=>{
          const data : UploadApiResponse|UploadApiErrorResponse  = await cloudinary.uploader.explicit(
               publicId,
              {
                type:'upload',
                resource_type:'image',
                asset_folder: createFolderName(eventName),
              }
            );
          return data
      }
      const MoveFile= async()=>{
       try{ 
         const result = await MoveToEventNameFolder(preview,eventName)
          console.log(API_NAME,"MoveFile Succsess");
          return true
      }
       catch (err){
       console.log(err  ,"Faled Finding Image, No Changes Made" );
       return false

      }
      } 

      MoveFile()
  


   //Stage 2 
   const saveResult =  await doc.save(); // Save to the database

    if(saveResult.errors){
        console.log("Doc Err",saveResult.errors);
        res.status(400).json({ message: 'Save Err' });
     }

   console.log("Saved new Doc",saveResult); 

   res.status(200).json({ message: "Saved New Modle" });
     
 
     await disconnectFromDb(connection,API_NAME) 

  // Stage 2 on file re-location continue saving 


}
