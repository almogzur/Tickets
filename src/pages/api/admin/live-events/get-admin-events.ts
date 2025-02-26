// File: pages/api/public.ts

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { EventModel } from "@/util/dbs/schma/models";
import  {CreateMongooseClient, userDataPrefix } from "@/util/dbs/mongosee-fn";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 const API_NAME =  "Admin Get All Events (hook)"

 console.log(API_NAME)

 
 if (req.method !== 'GET') {
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
const session = await getServerSession(req, res, authOptions);

if(!session?.user.name){
  return res.status(401).json({massage:"you SHELL NOT PASS @!!"})
}


  const connection  = await CreateMongooseClient( `${session.user.name}${userDataPrefix}`)


if(!connection){
  return res.status(500).json({massage:" No DB Connection"})
}

 try{ 

   const Model = EventModel(connection)
    const Events = await Model.find().lean()

    if(!  Events.length ){
        
   
      return   res.status(200).json({massage:" No Events"})
    }

   return  res.status(200).send(Events)
  }
 catch (err){  
    console.log(err)

    return   res.status(400).json({massage: `${err}`})
 }
 



}

