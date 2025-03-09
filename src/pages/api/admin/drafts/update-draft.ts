import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { delEmptyFolders, moveToEventNameFolder } from "../../../../util/fn/cloudinary_helper_functions";
import { UpdateDraftZVS } from "@/types/pages-types/admin/admin-event-types";
import { ObjectId } from "mongodb";
import  {CreateMongooseClient, userDataPrefix } from "@/util/db/mongosee-connect";
import { DraftModel } from "@/util/db/mongosee-models";



export default async function handler(req: NextApiRequest,res: NextApiResponse) {

  const API_NAME = "Update Draft Api (Click)";
  console.log(API_NAME);

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
    !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
     console.error("Cloudinary configuration is missing");
     return res.status(500).json({ massage: "Server configuration error" });
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

  const connection  = await CreateMongooseClient( `${session.user.name}${userDataPrefix}`)

  if(!connection){
        console.log("no db");
        return res.status(500).json({massage:" No DB Connection"})
  }

  const  body = req.body
   
   const isValidData = UpdateDraftZVS.safeParse(  body)

   if(!isValidData.success || !isValidData.data ){
     return   res.status(400).json({massage:'bad Data  input '})
   }

   if ( !ObjectId.isValid(isValidData.data._id)) {
    return res.status(400).json({ error: "Invalid eventId format" });
}

  const preview = isValidData.data.info.preview
  const eventName =isValidData.data.info.eventName
  const _id = isValidData.data._id

  // console.log(preview);

      await delEmptyFolders(session.user?.name)

      await moveToEventNameFolder(preview,eventName,session,API_NAME)

     const Modle = DraftModel(connection)
    
    const updatedDraft  = await Modle.findOneAndReplace({_id:_id},isValidData.data,{new:true,lean:true})

    if(!updatedDraft){
      console.warn("No Draft Updated")
    return   res.status(204).json({massage:"No Draft With Id"})
       }

   console.log("Draft_Updated",_id);
   return res.status(202).json({massage:"Draft_Updated  " + _id ,})
  
  
}