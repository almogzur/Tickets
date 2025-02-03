// File: pages/api/public.ts

import { NextApiRequest, NextApiResponse } from "next";

import {
    ApiError,
    CheckoutPaymentIntent,
    Client,
    Environment,
    LogLevel,
    OrdersController,
    PaymentsController,
    OrderRequest
} from "@paypal/paypal-server-sdk";
import { CartItem, PayPalReqType } from "./types";


const {
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
} = process.env;

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID as string ,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET as string  , 
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
    },
}); 

const ordersController = new OrdersController(client);
const paymentsController = new PaymentsController(client);




const createOrder = async (cart:CartItem[]) => {
    console.log("Create Order Cart",cart)

    const MapOvePurchases :OrderRequest['purchaseUnits'] =cart.map((item,i)=>{
                    return {
                        amount: {
                            currencyCode: "USD",
                            value: `${item.price}`,
                            },
                    }
            
    })

    const collect : PayPalReqType  = {
        body:  {
            intent:CheckoutPaymentIntent.Capture,
            purchaseUnits: [{
                amount: {
                    currencyCode: "USD",
                    value: `20`,
                    },
            }]
            
        },
        prefer: "return=minimal",

    }; 

   

    try {

        const { body, ...httpResponse } = await ordersController.ordersCreate(collect);
        // Get more response info...
        // const { statusCode, headers } = httpResponse;
        return {
            jsonResponse: JSON.parse(body.toString()),
            httpStatusCode: httpResponse.statusCode,
        };
    } catch (error) {
        if (error instanceof ApiError) {
            // const { statusCode, headers } = error;
            throw new Error(error.message);
        }
    }
};


export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{
 const API_NAME =  "Pay - Order"
 
 const { id } = req.query; 

 const { cart } = req.body;
 console.log(cart);

 if (req.method !== 'POST') {
    res.status(405).json({ message: `Method ${'$'}{req.method} not allowed` });
    return
  } 

     
  try {
    // use the cart information passed from the front-end to calculate the order amount detals

    const data = await createOrder(cart)

    if(data){
        res.status(data.httpStatusCode).json(data.jsonResponse);
    }
    res.status(400).json({massage:"no items"});    
    
} catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
}



}

