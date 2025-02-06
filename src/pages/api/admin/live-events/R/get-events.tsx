// File: pages/api/public.ts

import { AdminEventModle } from "@/components/admin/newEvent/types/new-event-db-schema";
import { disconnectFromDb, ModleDbNamedConnction } from "@/lib/DB/Mongosee_Connection";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 const API_NAME =  "Admin Get All Events (hook)"

 console.log(API_NAME)
   const session = await getServerSession(req, res, authOptions);
   const connection  = await ModleDbNamedConnction(session)
 
 if (req.method !== 'GET') {
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}

if(!connection){
  res.status(400).json({massage:" No DB Connection"})
 }

if(!session){
   res.status(400).json({massage:"you SHELL NOT PASS @!!"})
 }

 try{ 
    const Events = await AdminEventModle.find({},{},{lean:true})
    res.status(200).send(Events)
  }
 catch (err){  
    console.log(err)
    res.status(400).json({massage: `${err}`})
 }
 


 


 await disconnectFromDb(connection,API_NAME)
}