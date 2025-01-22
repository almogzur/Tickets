import { CreateConectionFronSession , disconnectFromDb} from "@/lib/DB/Mongosee_Connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  EventMongoseeDraftType } from "@/components/admin/newEvent/types/new-event-types";
import { DraftModle } from "@/components/admin/newEvent/types/new-event-db-schema";

 // findOne(filter: Filter<TSchema>, options: FindOptions): Promise<WithId<TSchema> | null>;


type Message = {
  message:string
}

export type getAdminDraftsApiReturndType = EventMongoseeDraftType[] |  Message

export default async function handler(req: NextApiRequest,res: NextApiResponse<getAdminDraftsApiReturndType>) {

  const API_NAME = "Get All Drafts Api (Hook)";
  console.log(API_NAME);
  
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
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

     const Model = DraftModle

     try{ 
       const Drafts  = await Model.find({},{},{lean:true})
       console.log(API_NAME,"Succsess")
       res.send(Drafts)

      }
     catch (err){
       res.status(200).json({message:"Faled Finding Image, No Changes Made"})
       }
     
    

  
  //console.log(RsolveCollection);



  await disconnectFromDb(connection,API_NAME) 

}