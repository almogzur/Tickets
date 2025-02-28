import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {  IsracardGanerateSaleRequestZVS } from "@/types/pages-types/client/client-event-type";
import { CreateMongooseClient } from "@/util/dbs/mongosee-fn";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import axios from "axios";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";



/**

Multi Payment Page

Also known as “Template Sale”. Enables payments on a single sale link, by multiple buyers.
For example, you will be able to generate a single sale and share its payment link on any social network site to allow multiple customers to pay on their own.
Every payment will create a new sale with a different ID. Creation of a template sale should be done by adding the sale_type="template" attribute to the request:
 
*/


const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  'Creat Iracard Payment Api ' 

    console.log(API_NAME)

  if (req.method !== 'POST') { 
      return  res.status(405).json({ message: API_NAME + " not allowed" })
}

const connection  = await CreateMongooseClient(null)

if(!connection){  
     return res.status(500).json({massage:'No DB Connection'})
}


// add validate soucre 

const  API_URL  = " https://sandbox.payme.io/api/generate-sale"

const body = req.body 

const isValedData  = IsracardGanerateSaleRequestZVS.safeParse(body)

const paymentReq = axios.post(API_URL,)


// this return Ifram 


})
}


export const config = {
api: {
 externalResolver: true, 
}
}