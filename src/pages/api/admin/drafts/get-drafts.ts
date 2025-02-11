import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/DB/mongosee-fn";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  DraftType } from "@/types/pages-types/new-event-types";
import { DraftModle } from "@/util/DB/schmas/event";

 // findOne(filter: Filter<TSchema>, options: FindOptions): Promise<WithId<TSchema> | null>;


type Message = {
  massage:string
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
    return res.status(401).json({ massage: 'You Shell Not Pass' });
  }

  const isConnected  = await MongoseeWithSessionModleDb(session)


 if(!isConnected){

      console.log(API_NAME,"no db");
      return res.status(500).json({massage:" No DB Connection"})
 
  }

      // calling the Molde Only on Api call prevanting un wanted folder saves 

   try{ 
       const Drafts  = await DraftModle.find({},{},{lean:true})
       console.log(API_NAME,"Succsess")
       await disconnectFromMongooseDb(isConnected,API_NAME) 
       return   res.send(Drafts)
      }
    catch (err){
      await disconnectFromMongooseDb(isConnected,API_NAME) 
        return    res.status(400).json({massage:`${API_NAME} Faled ${err} `})
       }
     
}