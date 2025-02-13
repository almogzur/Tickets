// File: pages/api/public.ts

import { CapturedOrderType } from "@/types/pages-types/new-event-types";
import { Mongo } from "@/util/dbs/mongo-db/mongo";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { GetBillingInfoFromEventId } from "@/util/fn/pay-fn";
import {
  ApiError,
  CheckoutPaymentIntent,
  Client as PayPalClient ,
  Environment,
  LogLevel,
  OrdersController,
  PaymentsController,
} from "@paypal/paypal-server-sdk";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  return apiLimiter(req, res,
    async () => {
      const API_NAME = " payment aproved order api  "

      if (req.method !== 'POST') {
            res.status(401).json({ message: "Not Alowed " + API_NAME });
      }

      const Client = await Mongo()
     
      if(!Client){
           return res.status(500).json({massage:"no Db" + API_NAME})
       }
       const body   = req.body 
       const { orderID , eventId , publicId} =body // const isValidData = Schema.safeParse()
   

       const userInfo = await GetBillingInfoFromEventId(eventId, `${process.env.CIPHER_SECRET}`, Client)

        if (!userInfo) {    return res.status(404).json({ massage: "no auth" }) }


        const client = new PayPalClient({
          clientCredentialsAuthCredentials: {
              oAuthClientId: publicId,
              oAuthClientSecret: `${userInfo.info.clientSecret}`,
          },
          timeout: 0,
          environment: Environment.Sandbox,
          logging: {
              logLevel: LogLevel.Error,
              logRequest: { logBody: false },
              logResponse: { logHeaders: false },
          },
      });
      const ordersController = new OrdersController(client);
     
       const captureOrder = async (orderID: string) => {

        const collect = {
            id: orderID,
            prefer: "return=minimal",
        };
        
        try {
            const { body, ...httpResponse } = await ordersController.ordersCapture(collect);
          // Get more response info...
          // const { statusCode, headers } = httpResponse;
          return {
            jsonResponse:body ,
            httpStatusCode: httpResponse.statusCode,
          };
        } catch (error) {
          if (error instanceof ApiError) {
             const { statusCode, headers } = error;
            throw new Error(error.message);
          }
        }
      };


      const PayPalRes = await captureOrder(orderID)

      if(!PayPalRes){
         res.status(500).json({massage:"no date from Paypal roleback theater...  "  })
      }
      
      return res.status(200).json(PayPalRes?.jsonResponse)
    })

}

export const config = {
    api: {
      externalResolver: true,  // resolve by the rate limeter
    },
  }