import { DraftModle } from "@/components/admin/newEvent/types/new-event-db-schema";
import { CreateConectionFronSession, disconnectFromDb } from "@/lib/DB/Mongosee_Connection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v2 as cloudinary ,UploadApiErrorResponse, UploadApiResponse} from 'cloudinary';
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


type ResponseData = {
  message?: string
  id?:string
}
 

export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

  

  const API_NAME = "Update Draft Api (Click)";
  console.log(API_NAME);


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

  if(!connection?.connection.db){

        console.log("no db");
        res.status(4001).json({ message: "no db" });
    
  }

  const { id, ...rest }= req.body // removing the id from the to be saved data 
//  console.log(id);

  const Model = DraftModle

  const preview = rest.preview
  const eventName = rest.eventName

   if(!preview){ }

   console.log(preview);
  
    const createFolderName = (name: string): string => {
     const sanitizedName = name.replace(/\s+/g, "_"); // Replace spaces with underscores
     // console.log(`${session?.user?.name}/${sanitizedName}`);
       return `${session?.user?.name}/${sanitizedName}`;
     };
    const MoveToEventNameFolder = async (publicId:string,eventName :string):Promise<any|undefined>=>{

      try{ 
        const data = await cloudinary.uploader.explicit(
        publicId,
        {
          type:'upload',
          resource_type:'image',
          asset_folder: createFolderName(eventName),
        }
          )
        return data
       }
      catch (err){  
        console.log("MoveToEventNameFolder",err)
      }  
     }
     const MoveFile= async()=>{
       try{ 
        const result = await MoveToEventNameFolder(preview,eventName)
         console.log(result," Move Succsess");
         return true
     }
      catch (err){
      console.log(err  ,"Faled Finding Image, No Changes Made" );
      return false

     }
    } 

    MoveFile()

   const del_one_folder = async(Path:string):Promise<boolean|undefined>=>{
    try{ 
       const  data = await cloudinary.api.delete_folder(Path);
       return true
       }  
     
    catch (err){ 
        console.log("del_result", err);
     }
   
    }
   const find_sub_folders =  async(Path?:string)=>{
       try {
        // Fetch all subfolders under the root path
         const { folders } = await cloudinary.api.sub_folders(Path??"") 
        
    
         
        return folders
       } 
     catch (error) {
        console.log(`find_result  Error:`, error);
        return false
    
    }
    } 
   const delFolders =  async (Path?:string)=>{
         const folders = await find_sub_folders(Path)

           folders.map( 
             async (folder: any,i:number)=>{
                try{
                  const del_result = await del_one_folder(folder.path)
                  console.log(del_result,"*");
                  }
                catch (err){  
                  console.log("delFolderError",err);
                }
                
               

      })
    }

    delFolders(session.user?.name??"")
     

   const updatedDraft  = await Model.findOneAndUpdate({_id:id},rest,{new:true,lean:true})

    if(!updatedDraft){
      res.status(200).json({message:"No Draft With Id",id})
      console.warn("No Draft Updated")
      
       }

   console.log("Draft_Updated",id);
   res.status(200).json({message:"Draft_Updated",id})
  
   await disconnectFromDb(connection,API_NAME)
  
}