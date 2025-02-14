import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/dbs/mongosee-fn";
import {  DraftModle } from "@/util/dbs/schma/event";
import { delFolder, findSubFolders, moveToEventNameFolder } from "../../../../util/fn/cloudinary_helper_functions";
import { DraftValidationSchema } from "@/types/pages-types/admin/new-event-types";

type ResponseData = {
  massage?: string
  id?:string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

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
    return res.status(401).end(`Method ${req.method} Not Allowed`);
  }

  if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ massage: 'You Shell Not Pass' });
  }

  const isConnected  = await MongoseeWithSessionModleDb(session)

  if(!isConnected){
        console.log("no db");
        return res.status(500).json({massage:" No DB Connection"})
  }

  const  body = req.body
   const isValidData = DraftValidationSchema.safeParse(  body)

   if(!isValidData){
      res.status(400).json({massage:'bad Data  input '})
   }

   
  const { id, ...rest }=  isValidData.data // removing the id from the to be saved data 



  const preview = rest.preview
  const eventName = rest.eventName

   if(!preview){ }

  // console.log(preview);
  

   try{ 
    const result = await moveToEventNameFolder(preview,eventName,session,API_NAME)
     console.log(" moveToEventNameFolder Succsess",  eventName , API_NAME, result);
    }catch (err){
     console.log ("moveToEventNameFolder", err , eventName, API_NAME);
  }

   const delEmptyFolders =  async (Path?:string|null):Promise<boolean>=>{

    const folders = await findSubFolders(Path)

     if(!folders){
          console.log ( " delFolders Return false folders are null " )
        return false
      }
     else if(Array.isArray(folders)){
         folders.map( 
             async (folder: any,i:number)=>{
                 try{
                   const del_result = await delFolder(folder.path)
                   console.log( " folders.map :  del_result ", del_result, "Path " , folder.path );
                   }
                 catch (err){  
                   console.log("delFolders Map_Over : Del Error",err ,  "Path " , folder.path ) ;
                 }
            })
            return true
     }
     else if(folders && !Array.isArray(folders)) {
        try{ 
         const del_result = await delFolder(folders.path)
         console.log( " folders singel : del_result ", del_result, "Path " , folders.path  , "folders is not array " , );
         if(del_result ){
          return true
         }
         return false
          
        }
        catch (err){
          console.log("delFolders folders singel : Del Error",err , "Path " , folders.path , "folders is not array " );
            return false
         }
     }
     else{
        console.log (  "delEmptyFolders  :  Return false" , typeof folders ,folders,   );
        
      return false
     }
    }


    try{
      const data = await delEmptyFolders(session.user?.name)
      if(data){
        console.log(API_NAME,"delFolders","Seccsess");
      }
        
     }catch (err){ 
      console.log(API_NAME,"delFolders", err);
     }
    
  
   const updatedDraft  = await DraftModle.findOneAndUpdate({_id:id},rest,{new:true,lean:true})

    if(!updatedDraft){
      console.warn("No Draft Updated")
    return     res.status(204).json({massage:"No Draft With Id",id})
  
      
       }

   console.log("Draft_Updated",id);
    await disconnectFromMongooseDb(isConnected,API_NAME)
   return res.status(202).json({massage:"Draft_Updated",id})
  
  
}