import { CreateMongooseClient, userDataPrefix } from "@/util/dbs/mongosee-fn";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { X } from "@mui/icons-material";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import axios from "axios";
import qs from "qs";
import { GetBillingInfoFromEventId, PayPalAccessToken } from "@/util/fn/pay-fn";
import { ObjectId } from "mongodb";
import { z } from "zod";
const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

   return apiLimiter(req, res, async () => {

      const API_NAME = ''
      const parms = req.query

      if (req.method !== 'GET') {
         return res.status(405).json({ message: API_NAME + "not allowed" })
      }

      const isValideData  = z.object({id:z.string()}).safeParse(parms)
      
      if (  !isValideData.success||  ! ObjectId.isValid( isValideData.data.id )) {
         return res.status(400).json({ error: "Invalid eventId format" });
       }

      const session = await getServerSession(req, res, authOptions);

      if (!session?.user.name) {
         return res.status(401).json({ massage: 'you SHELL NOT PASS @!!' })
      }

      const connection = await CreateMongooseClient(session.user.name + userDataPrefix)

      if (!connection) {
         return res.status(500).json({ massage: 'No DB Connection' })
      }



      //const isValidData = ""

      console.log(API_NAME,parms)

      const userInfo = await GetBillingInfoFromEventId(isValideData.data.id, `${process.env.CIPHER_SECRET}`, connection)

      if(!userInfo){
         return
       }
   
       const token =  await PayPalAccessToken(userInfo)


       interface TransactionRequestFilters {
          start_date?: string;                          //The start date for the transactions
          end_date?: string;                             //  The end date for the transactions
         transaction_id?: string;                       // (optional) The ID of the transaction
         transaction_type?: string;                     // (optional) The type of the transaction
         transaction_status?: string;                   // (optional) The status of the transaction
         transaction_amount?: string;                   // (optional) The amount of the transaction
         transaction_currency?: string;                 // (optional) The currency of the transaction
         payment_instrument_type?: string;              // (optional) The type of payment instrument used
         store_id?: string;                             // (optional) The ID of the store
         terminal_id?: string;                           // (optional) The ID of the terminal
         fields?: string;                               // (optional) Comma-separated list of fields to include in the response
         balance_affecting_records_only?: 'Y' | 'N';   // (optional) 'Y' to include only balance-affecting records
         page_size?: number;                            // (optional) The number of records to return per page
         page?: number;                                 // (optional) The page number to return
     }

       console.log(token)

      async function getInfo  () {}



   })
}


export const config = {
   api: {
      externalResolver: true,
   }
}