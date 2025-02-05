// File: pages/api/public.ts



import { disconnectFromDb } from "@/lib/DB/Mongosee_Connection";
import {
    ApiError,
    CheckoutPaymentIntent,
    Client,
    Environment,
    LogLevel,
    OrdersController,
    PaymentsController,
} from "@paypal/paypal-server-sdk";
import { NextApiRequest, NextApiResponse } from "next";

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


const captureOrder = async (orderID:string) => {

  const collect = {
      id: orderID,
      prefer: "return=minimal",
  };


  const ordersController = new OrdersController(client);
  
  try {
      const { body, ...httpResponse } = await ordersController.ordersCapture(
          collect
      );
      // Get more response info...
      // const { statusCode, headers } = httpResponse;
      return {
          jsonResponse: JSON.parse(body as string),
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

   const API_NAME =  " payment aproved order api  "
  
   if (req.method  !== 'POST') {
    res.status(400).json({ message: "Not Alowed" });
  } 
  const { orderId } = req.query
  const body =req.body

try {
  const  data = await captureOrder(orderId as string ) 

  if(data ){
      res.status(data.httpStatusCode).json(data.jsonResponse);
  }
    res.status(400).json({massage :" no Data "})
  
} 
catch (error) {
  console.error("Failed to create order:", error);
  res.status(500).json({ error: "Failed to capture order." });
}




}