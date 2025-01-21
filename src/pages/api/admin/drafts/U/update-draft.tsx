import { DraftModle } from "@/components/admin/newEvent/types/new-event-db-schema";
import { CreateConectionFronSession, disconnectFromDb } from "@/lib/DB/Mongosee_Connection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


type ResponseData = {
  message?: string
  id?:string
}
 

export default async function handler(req: NextApiRequest,res: NextApiResponse<ResponseData>) {

  const API_NAME = "Update Draft Api (Click)";
  console.log(API_NAME);
  
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

  if(!connection.connection.db){
    const reTryConnection =   await CreateConectionFronSession(session)
    if(!reTryConnection.connection.db){
        console.log("no db");
        res.status(4001).json({ message: "no db" });
    }
  }

  const { id, ...rest }= req.body // removing the id from the to be saved data 
  console.log(id);
  

  const Model = DraftModle
    const Drafts  = await Model.findOneAndUpdate({_id:id},rest,{new:true,lean:true})

    if(Drafts){
      res.status(200).json({message:"Draft_Updated",id})
        console.log("Draft_Updated",id);
    }
    else{
      res.status(200).json({message:"No Draft With Id",id})
      console.warn("No Draft Updated")
    }


  disconnectFromDb(connection,API_NAME)
  
}