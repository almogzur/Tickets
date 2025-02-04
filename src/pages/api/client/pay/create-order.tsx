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
    OrderRequest,
    OrderApplicationContextLandingPage,
    OrderApplicationContextShippingPreference,
    UpcType,
    ItemCategory,
    Item
} from "@paypal/paypal-server-sdk";
import { CartItemType, PayPalReqType } from "./paypal-types";


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

 // Item format  
// name: "T-Shirt", 
// description: "Super Fresh Shirt", 
// quantity: "1", 
// unitAmount: { currencyCode: "USD", value: total,  },
// category:ItemCategory.DigitalGoods





const createOrder = async (cart:Item[] , total:string) => {
    console.log("Create Order Cart",cart)

    


    const collect : PayPalReqType  = {
        body:  {
            intent:CheckoutPaymentIntent.Capture,

            purchaseUnits: [
                {
                amount:{
                     currencyCode:"USD",
                      value:total,
                      breakdown:{itemTotal:{value:total,currencyCode:"USD"}}
                 },
                 // total value need to match to total in brakedown else you get err 
               items:cart
                    },

     
             ],

            applicationContext:{
                brandName:"Styled-Tickets",
                locale:"he",        
                shippingPreference:OrderApplicationContextShippingPreference.NoShipping,
            },

            
   

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

 const { cart ,total} = req.body;
 console.log(cart);

 if (req.method !== 'POST') {
    res.status(405).json({ message: `Method ${'$'}{req.method} not allowed` });
    return
  } 

     
  try {
    // use the cart information passed from the front-end to calculate the order amount detals

    const data = await createOrder(cart , total)

    if(data){
        res.status(data.httpStatusCode).json(data.jsonResponse);
    }
    res.status(400).json({massage:"no items"});    
    
} catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
}



}


