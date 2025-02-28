import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CreateMongooseClient, userDataPrefix } from "@/util/dbs/mongosee-fn";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { X } from "@mui/icons-material";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";



/**
 * Sale Callbacks
  Once the sale is paid successfully, we will notify the marketplace with the sale details with a POST 
 of type x-www-form-urlencoded request to the marketplace Callback URL.
 */




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
     return res.status(500).json({massage:'No DB Connection'})}
 const body = req.body 
})
}


export const config = {
api: {
 externalResolver: true, 
}
}