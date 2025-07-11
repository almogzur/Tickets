import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { CreateMongooseClient, userDataPrefix } from "@/util/db/mongoose-connect";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
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

    const API_NAME = 'Isracard Sale CallBack api ' 

    console.log(API_NAME)

  if (req.method !== 'POST') { 
      return  res.status(405).json({ message: "not allowed" + API_NAME })
}

const connection  = await CreateMongooseClient(null)

if(!connection){  
     return res.status(500).json({massage:'No DB Connection'})
  }
 const body = req.body 

 console.log(body,req.headers, req._read(100))


})
}


export const config = {
api: {
 externalResolver: true, 
}
}