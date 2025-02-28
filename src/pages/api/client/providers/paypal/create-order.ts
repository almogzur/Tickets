import { NextApiRequest, NextApiResponse } from "next";
import rateLimit from 'express-rate-limit';
import {
    ApiError,
    CheckoutPaymentIntent,
    Client as PayPalClient ,
    Environment,
    LogLevel,
    OrdersController,
    PaymentsController,
    OrderApplicationContextShippingPreference,
    Item
} from "@paypal/paypal-server-sdk";


import { GetBillingInfoFromEventId } from "@/util/fn/pay-fn";
import { ObjectId } from "mongodb";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import {   PayPalClollectInfoObjectType, PayPalRequestCreateOrderVS, } from "@/types/pages-types/client/client-event-type";
import {CreateMongooseClient} from "@/util/dbs/mongosee-fn";

const apiLimiter = rateLimit(rateLimitConfig);


/**
 * Creates an order.
 *  Merchants and partners can add Level 2 and 3 data to payments to
 *  reduce risk and payment processing costs. 
 * For more information about processing payments,
 *  see checkout or multiparty checkout.
 */


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    return apiLimiter(req, res,async () => {

            const API_NAME = " Client  PayPal Create new API "

            if (req.method !== 'POST') {
                return res.status(405).json({ message: `Method ${req.method} not allowed` });
            }


            // add validate soucre 

            const body  = req.body
            const IsValidData    = PayPalRequestCreateOrderVS.safeParse( body )

            if( ! IsValidData.success){
                console.log(IsValidData.error)
                return res.status(400).json({massage:"bad format Data"})
            }

            const  { cart, total, publicId, eventId } =  IsValidData.data


             const connection  = await CreateMongooseClient(null)
            
             if(!connection){ 
                return res.status(500).json({err:'No DB Connection'})
             }
            if (!ObjectId.isValid(eventId)) {
                return res.status(400).json({ error: "Invalid eventId format" });
            }

            const userInfo = await GetBillingInfoFromEventId(eventId, `${process.env.CIPHER_SECRET}`,connection)

            if (!userInfo || ! publicId) {
                return res.status(400).json({ massage: "no auth" })
            }

            const client = new PayPalClient({
                clientCredentialsAuthCredentials: {
                    oAuthClientId: publicId,
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


            const createOrder = async (cart: Item[], total: string) => {
                const collect: PayPalClollectInfoObjectType = {
                    body: {
                        intent: CheckoutPaymentIntent.Capture,
                        purchaseUnits: [
                            {
                                amount: {
                                    currencyCode: "USD",
                                    value: total,
                                    breakdown: { itemTotal: { value: total, currencyCode: "USD" } }
                                },
                                items: cart
                            },
                        ],
                        applicationContext: {
                            brandName: "Styled-Tickets",
                            locale: "he",
                            shippingPreference: OrderApplicationContextShippingPreference.NoShipping,
                        },
                    },
                    prefer: "return=minimal",
                };

                try {
                    const { body, ...httpResponse } = await ordersController.ordersCreate(collect);
                    return {
                        jsonResponse: body,
                        httpStatusCode: httpResponse.statusCode,
                    };
                }
                catch (error) {
                    if (error instanceof ApiError) {
                        const { statusCode } = error;
                        return {
                            jsonResponse: { error: error.message },
                            httpStatusCode: statusCode
                        };
                    }
                    // Handle non-ApiError cases
                    return {
                        jsonResponse: { error: 'An unexpected error occurred' },
                        httpStatusCode: 500
                    };
                }
            };


           const ordersController = new OrdersController(client);


            try {
                const data = await createOrder(cart, total)
                if (!data) 
                     return res.status(200).json({ massage: 'no_Data' + API_NAME })
                     return res.status(data.httpStatusCode).json(data.jsonResponse);
            } catch (error) {
                console.error("Failed to create order:", error);
                return {
                    jsonResponse: { error: "Failed to create order." },
                    httpStatusCode: 500
                };
            }
        });
}


export const config = {
    api: {
      externalResolver: true,  // resolve by the rate limeter
    },
  }