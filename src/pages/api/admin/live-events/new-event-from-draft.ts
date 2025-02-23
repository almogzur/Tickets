import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { X } from "@mui/icons-material";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { EventFromDraftZVS } from "@/types/pages-types/admin/admin-event-types";
import { AdminEventModle, DraftModle } from "@/util/dbs/schma/modles";
import  {CreateMongooseClient, userDataPrefix } from "@/util/dbs/mongosee-fn";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
   return apiLimiter(req, res, async () => {

      const API_NAME = 'Admin -  New Event From Draft  Api  '



      if (req.method !== 'POST') {
         return res.status(405).json({ message: 'API_NAME' + "Not Allowed" });
      }

      const session = await getServerSession(req, res, authOptions);

      
      if (!session?.user.name) {
         return res.status(401).json({ massage: 'you SHELL NOT PASS @!!' })
      }

  const connection  = await CreateMongooseClient( session.user.name + userDataPrefix )

      if (!connection) {
         return res.status(500).json({ massage: 'No DB Connection' })
      }


      const body = req.body
      const isValidData = EventFromDraftZVS.safeParse(body)

      if (!isValidData.success) {
         return res.status(400).json({ massage: 'invalide data ' + API_NAME })
      }
      const delOriginDraft = async (): Promise<boolean> => {
         try {

            const Modle = DraftModle(connection)
            const Drafts = await Modle.findOneAndDelete({ _id: isValidData.data._id })

            if (Drafts) {
               return true
            }
            return false

         }
         catch (err) {
            console.log(API_NAME, "delOriginDraft - Err", err)
            return false

         }
      }

      // un sucssesful operation dosent need to cancell save , just to prevent duplicates 

      const Modle = AdminEventModle(connection)

      const doc = new Modle(isValidData.data)

      const saveResult = await doc.save()

      if (saveResult.errors) {
         return res.status(500).json({ massage: "faled Saving " + API_NAME, saveResult })
      }

     // const delOld = await delOriginDraft() // return bool , for now not use 
      return res.status(200).json({ massage: "succsess save " + API_NAME })

   })
}


export const config = {
   api: {
      externalResolver: true,
   }
}