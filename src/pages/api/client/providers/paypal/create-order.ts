import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from 'express-rate-limit';
import {Client as PayPalClient ,LogLevel, Environment,} from "@paypal/paypal-server-sdk";


import {  GetPayPalBillingInfoFromEventId } from "@/util/fn/pay-fn";
import { ObjectId } from "mongodb";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import {CreateMongooseClient} from "@/util/db/mongosee-connect";
import {  PayPalRequestCreateOrderVS } from "@/types/pages-types/client/client-event-type";
import { createPayPalOrder } from "@/util/fn/event-api-fn";

const apiLimiter = rateLimit(rateLimitConfig);


/**
 * Creates an order.
 *  Merchants and partners can add Level 2 and 3 data to payments to
 *  reduce risk and payment processing costs. 
 * For more information about processing payments,
 *  see checkout or multiparty checkout.
 */

/**
 * 
 * PayPal Public id coming from the react end is form the from end component 
 * 
 * 
 */


export default async function createOrderApi(req: NextApiRequest, res: NextApiResponse) {
    
    return apiLimiter(req, res,async () => {

            const API_NAME = " Client  PayPal Create new API "

            if (req.method !== 'POST') {
                return res.status(405).json({ message: `Method ${req.method} not allowed` });
            }


            // add validate soucre 

            const body  = req.body
            const IsValidData    = PayPalRequestCreateOrderVS.safeParse(body)

            if( ! IsValidData.success){
                console.log(IsValidData.error)
                return res.status(400).json({massage:"bad format Data"})
            }

            const  { cart, total,  eventId } =  IsValidData.data


             const connection  = await CreateMongooseClient(null)
            
             if(!connection){ 
                return res.status(500).json({err:'No DB Connection'})
             }
            if (!ObjectId.isValid(eventId)) {
                return res.status(400).json({ error: "Invalid eventId format" });
            }

            const userInfo = await GetPayPalBillingInfoFromEventId(eventId, `${process.env.CIPHER_SECRET}`,connection)

            if (!userInfo ) {
                return res.status(400).json({ massage: "no auth" })
            }

            const client = new PayPalClient({
                clientCredentialsAuthCredentials: {
                    oAuthClientId: userInfo.clientId,
                    oAuthClientSecret: userInfo.clientSecret,
                },
                timeout: 0,
                environment: Environment.Sandbox,
                logging: {
                    logLevel: LogLevel.Error,
                    logRequest: { logBody: false },
                    logResponse: { logHeaders: false },
                },
            });

            try {
                const data = await createPayPalOrder(cart , total , client)
                if (!data) 
                     return res.status(200).json({ massage: 'no_Data' + API_NAME })
                     return res.status(data.httpStatusCode).json(data.jsonResponse);
            } catch (error) {
                console.error("Failed to create order:", error);
                return res.status(500).json(error)
            }
        });
}


export const config = {
    api: {
      externalResolver: true,  // resolve by the rate limeter
    },
  }