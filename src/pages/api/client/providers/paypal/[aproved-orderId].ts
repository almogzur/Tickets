
import { PayPalCapturedRequestOrderVS } from "@/types/pages-types/client/client-event-type";
import {CreateMongooseClient} from "@/util/db/mongoose-connect";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import {  GetPayPalBillingInfoFromEventId } from "@/util/fn/pay-fn";
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


/**
 * 
Orders Capture#
Captures payment for an order. To successfully capture payment for an order,
 the buyer must first approve the order or a valid payment_source must 
 be provided in the request.
 A buyer can approve the order upon being redirected to  
 the rel:approve URL that was returned in
 the "HATEOAS" links in the create order response.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  return apiLimiter(req, res,
    async () => {
      const API_NAME = " payment approved order api  "

      if (req.method !== 'POST') {
            res.status(405).json({ message: "Not allowed " + API_NAME });
      }     
      const connection  = await CreateMongooseClient(null)
      

      if(!connection){  
        return res.status(500).json({massage:'No DB Connection'})
      }
   
  

      // add validate source 

       const body   = req.body 

       const isValidData = PayPalCapturedRequestOrderVS.safeParse(body)

       if(!isValidData.success){
        return res.status(400).json({massage:"bad data format "+API_NAME})
       }

       const { PaypalData , eventId  } =isValidData.data // const isValidData = Schema.safeParse()
       const { orderID  } = PaypalData
   
       const userInfo = await GetPayPalBillingInfoFromEventId(eventId, `${process.env.CIPHER_SECRET}`, connection)


        if (!userInfo) {    return res.status(404).json({ massage: "no auth" }) }


        const client = new PayPalClient({
          clientCredentialsAuthCredentials: {
              oAuthClientId: userInfo.clientId,
              oAuthClientSecret: `${userInfo.clientSecret}`,
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
         res.status(500).json({massage:"no date from Paypal rollback theater...  "  })
      }
      
      return res.status(200).json(PayPalRes?.jsonResponse)
    })

}

export const config = {
    api: {
      externalResolver: true,  // resolve by the rate limiter
    },
  }