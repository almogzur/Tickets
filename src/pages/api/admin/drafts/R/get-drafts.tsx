import { ModleDbNamedConnction , disconnectFromDb} from "@/lib/DB/Mongosee_Connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  DraftType } from "@/components/admin/newEvent/types/new-event-types";
import { DraftModle } from "@/components/admin/newEvent/types/new-event-db-schema";

 // findOne(filter: Filter<TSchema>, options: FindOptions): Promise<WithId<TSchema> | null>;


type Message = {
  message:string
}

export type getAdminDraftsApiReturndType =DraftType [] |  Message

export default async function handler(req: NextApiRequest,res: NextApiResponse<getAdminDraftsApiReturndType>) {

  const API_NAME = "Admin Get All Drafts Api (Hook)";
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

  const isConnected  = await ModleDbNamedConnction(session)


 if(!isConnected){

      console.log(API_NAME,"no db");
      res.status(4001).json({ message: "no db" });
 
  }

      // calling the Molde Only on Api call prevanting un wanted folder saves 



   try{ 
       const Drafts  = await DraftModle.find({},{},{lean:true})
       console.log(API_NAME,"Succsess")
       res.send(Drafts)
      }
   catch (err){
       res.status(200).json({message:`${API_NAME} Faled ${err} `})
       }
     

  await disconnectFromDb(isConnected,API_NAME) 

}