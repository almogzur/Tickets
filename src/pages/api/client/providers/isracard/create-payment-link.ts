import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { UserIsracardInfoType } from "@/types/pages-types/admin/user-biling-info-types";
import { IsracardCreateOrderZVS, IsracardGanerateSaleRequestType } from "@/types/pages-types/client/client-event-type";
import { CreateMongooseClient } from "@/util/db/mongosee-connect";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { GetIsracardBillingInfoFromEventId } from "@/util/fn/pay-fn";
import axios from "axios";
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

    const API_NAME = 'Creat Iracard Payment Link Api '


    console.log(API_NAME)

    if (req.method !== 'POST') {
      return res.status(405).json({ message: API_NAME + " not allowed" })
    }

    const connection = await CreateMongooseClient(null)

    if (!connection) {
      return res.status(500).json({ massage: 'No DB Connection' })
    }

    // add validate soucre 


    const body = req.body

    const isValidData = IsracardCreateOrderZVS.safeParse(body)

    if (!isValidData.success) {
      return res.status(400).json({ massage: "bad input" })
    }

    const { eventId, cart, total } = isValidData.data

    const userInfo = await GetIsracardBillingInfoFromEventId(eventId, `${process.env.CIPHER_SECRET}`, connection)

    if (!userInfo) {
      return res.status(401).json({ massage: "no auth" })
    }

    const CreateSaleLink = async (UserInfo: UserIsracardInfoType, total: string,) => {

      const saleParameters: IsracardGanerateSaleRequestType = {
        buyer_perform_validation:false,
        seller_payme_id: "MPL15282-97137EVV-KOAOAOIT-VWCZPB8V",
        sale_price: parseInt(total),
        product_name: eventId,
        currency: "ILS",
        sale_callback_url: "https://www.payme.io",
        sale_return_url: "https://www.payme.io",
        language: "he",
        sale_email: UserInfo.email,
        sale_name: "API TEST",
        sale_type: "sale", // or "template" if needed
        sale_payment_method: "credit-card",
        capture_buyer: false,
        transaction_id: Date.now().toString(), // Generate a unique ID
        installments: "1",
        market_fee: 0.5, // Convert to string
        sale_send_notification: true,
        sale_mobile: "+9725254448888"
      };

      const options = {
        method: 'POST',
        url: 'https://sandbox.payme.io/api/generate-sale',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        data: saleParameters
      };



        console.log(saleParameters)
        
      try {
        const responce  = await axios.post(options.url,saleParameters);
        return responce
        //console.log(responce);
       
      } catch (error : any) {
        console.log( API_NAME, error.toJSON());
        return
      }
    }


    const link = await CreateSaleLink(userInfo, total)

    console.log(link, "back")





    // this return Ifram 


  })
}


export const config = {
  api: {
    externalResolver: true,
  }
}