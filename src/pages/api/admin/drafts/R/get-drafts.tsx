import { CreateConectionFronSession , disconnectFromDb} from "@/lib/DB/Mongosee_Connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]";
import { FindOptions, ListCollectionsOptions } from "mongodb";
import mongoose from "mongoose";
import {  EventMongoseeDraftType } from "@/components/admin/newEvent/types/new-event-types";
import { createDynamicModel, TempNewEventSchema } from "@/components/admin/newEvent/types/new-event-db-schema";


 // findOne(filter: Filter<TSchema>, options: FindOptions): Promise<WithId<TSchema> | null>;


type Message = {
  message:string
}

export type getAdminDraftsApiReturndType = EventMongoseeDraftType[] |  Message

export default async function handler(req: NextApiRequest,res: NextApiResponse<getAdminDraftsApiReturndType>) {

  const API_NAME = "GET ADMIN Drafts Api";
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

  if(!connection.connection.db){
    console.log("no db");
    res.status(4001).json({ message: "no db" });

  }
  const quary = req.query

     const TempModel = createDynamicModel<EventMongoseeDraftType>("Drafts",TempNewEventSchema)

     const Collections  = await TempModel.find({})
  
    if(!Collections.length){
      res.status(200).json({message:"No Data"}) 
    }

    res.send(Collections)

  
  //console.log(RsolveCollection);



  disconnectFromDb(connection)
  
}