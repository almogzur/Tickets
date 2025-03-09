import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IsracardZVS } from "@/types/pages-types/admin/user-biling-info-types";
import { CreateMongooseClient, userDataPrefix } from "@/util/db/mongosee-connect";
import { IsracardModel } from "@/util/db/mongosee-models";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { connection } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{

  return apiLimiter(req, res,async () => {

    const API_NAME =  'Get User Isracard Info' 

  if (req.method !== 'GET') { 
      return  res.status(405).json({ message: "not allowed" +  API_NAME })
}

 const session = await getServerSession(req, res, authOptions);

if(!session){
       return res.status(401).json({massage:'you SHELL NOT PASS @!!' }) 
  }

  const connection  = await CreateMongooseClient( session.user.name + userDataPrefix)

if(!connection){  
     return res.status(500).json({massage:'No DB Connection'})
  }
    
    const Model = IsracardModel(connection)

    const info = await Model.findOne().lean()
    
    if(!info){
        return res.status(201).json({ massage : "no user Info" + API_NAME})
    }
    return res.send(info)
    
    })
}


export const config = {
api: {
 externalResolver: true, 
}
}