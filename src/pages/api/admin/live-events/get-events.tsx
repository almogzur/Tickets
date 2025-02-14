// File: pages/api/public.ts

import { AdminEventModle } from "@/util/dbs/schma/new-event";
import { disconnectFromMongooseDb, MongoseeWithSessionModleDb } from "@/util/dbs/mongosee-fn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 const API_NAME =  "Admin Get All Events (hook)"

 console.log(API_NAME)
   const session = await getServerSession(req, res, authOptions);
   const connection  = await MongoseeWithSessionModleDb(session)
 
 if (req.method !== 'GET') {
  res.setHeader('Allow', ['GET']);
  return res.status(401).end(`Method ${req.method} Not Allowed`);
}

if(!connection){
  return res.status(500).json({massage:" No DB Connection"})
}

if(!session){
    return res.status(401).json({massage:"you SHELL NOT PASS @!!"})
 }

 try{ 
    const Events = await AdminEventModle.find({},{},{lean:true})
    await disconnectFromMongooseDb(connection,API_NAME)

   return  res.status(200).send(Events)
  }
 catch (err){  
    console.log(err)
    await disconnectFromMongooseDb(connection,API_NAME)

    return   res.status(400).json({massage: `${err}`})
 }
 



}