
import { IsracardCreateOrderZVS} from "@/types/pages-types/client/client-event-type";
import { CreateMongooseClient } from "@/util/db/mongoose-connect";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { CreateIsracardSaleLink, updateEvent } from "@/util/fn/frontend_api-fn";
import {  GetIsracardBillingInfoFromEventId } from "@/util/fn/pay-fn";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";



/**

Multi Payment Page

Also known as “Template Sale”. Enables payments on a single sale link, by multiple buyers.
For example, you will be able to generate a single sale and share its payment link on any social network site to allow multiple customers to pay on their own.
Every payment will create a new sale with a different ID. Creation of a template sale should be done by adding the sale_type="template" attribute to the request:
 
*/


const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return apiLimiter(req, res, async () => {

    const API_NAME = 'Create isracard Payment Link Api '


    console.log(API_NAME)

    if (req.method !== 'POST') {
      return res.status(405).json({ message: API_NAME + " not allowed" })
    }

    const connection = await CreateMongooseClient(null)

    if (!connection) {
      return res.status(500).json({ massage: 'No DB Connection' })
    }

    // add validate source 

    const body = req.body
    const isValidData = IsracardCreateOrderZVS.safeParse(body)


    if (!isValidData.success) {
      return res.status(400).json({ massage: "bad input" })
    }

    const { eventId, cart, total ,  TheaterState} = isValidData.data

    const userInfo = await GetIsracardBillingInfoFromEventId(eventId, `${process.env.CIPHER_SECRET}`, connection)

   if(!userInfo) {
      return res.status(401).json({ massage: "no auth" })
    }

    const EventUpdated = await  updateEvent(TheaterState, eventId, cart)


   if(!EventUpdated){
    console.log("EventUpdated", "Update Error" , API_NAME)
     return res.status(400).json({massage: 'bad Event Update Responce' + API_NAME })
   }

   console.log("EventUpdated", "Update success", API_NAME)
   const isracardResponce = await CreateIsracardSaleLink(userInfo, total , eventId, cart)

   if(!isracardResponce){
      return res.status(400).json({massage: 'bad Payment Request' + API_NAME })
   }

  return res.send(isracardResponce.sale_url)

  })
}


export const config = {
  api: {
    externalResolver: true,
  }
}