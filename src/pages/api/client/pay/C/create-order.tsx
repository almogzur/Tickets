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


type CartItem ={
    id: string,
    quantity: number,
    price:number,
    description :string,
    
}


const createOrder = async (cart:CartItem[]) => {




    const collect = {
        body: {
            intent: "CAPTURE",
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: "USD",
                        value: "100",
                    },
                },
            ],
            items:[
                {
                    name:"asd"
                    
                }
            ]
        },
        prefer: "return=minimal",
    }; 

    try {

        const { body, ...httpResponse } = await ordersController.ordersCreate(collect as any );
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

 if (req.method !== 'POST') {
    res.status(405).json({ message: `Method ${'$'}{req.method} not allowed` });
    return
  } 

  try {
    // use the cart information passed from the front-end to calculate the order amount detals
    const { cart } = req.body;

    
    
    const { jsonResponse, httpStatusCode } = await createOrder(cart  ) as any  ;
    res.status(httpStatusCode).json(jsonResponse);
} catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
}



}

export const config = {
    api: {
      bodyParser: true,
    },
  };