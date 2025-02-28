import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserIsracardZVS } from "@/types/pages-types/admin/user-biling-info-types";
import { CreateMongooseClient, userDataPrefix } from "@/util/dbs/mongosee-fn";
import { IsracardModel } from "@/util/dbs/schma/models";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  '' 

  if (req.method !== '') { 
      return  res.status(405).json({ message: 'API_NAME' })
}

 const session = await getServerSession(req, res, authOptions);
if(!session){
       return res.status(401).json({massage:'you SHELL NOT PASS @!!' }) }

const connection  = await CreateMongooseClient( session.user.name + userDataPrefix)

if(!connection){  
     return res.status(500).json({massage:'No DB Connection'})
}
  
const isValedData = UserIsracardZVS
     const body = req.body  

     const Model = IsracardModel(connection)

})
}


export const config = {
api: {
 externalResolver: true, 
}
}