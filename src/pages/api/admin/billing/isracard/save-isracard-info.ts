import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IsracardZVS, UserIsracardInfoType } from "@/types/pages-types/admin/user-billing-info-types";
import { CreateMongooseClient, userDataPrefix } from "@/util/db/mongoose-connect";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { encryptData } from "@/util/fn/crypto";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { secretKey } from "../paypal/save-paypal-info";
import { IsracardModel } from "@/util/db/mongoose-models";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

     return apiLimiter(req, res, async () => {

          const API_NAME = 'Save Isracard Billing Info'

          console.log(API_NAME)

          if (req.method !== 'POST') {
               return res.status(405).json({ message: 'API_NAME' })
          }

          const session = await getServerSession(req, res, authOptions);

          if (!session) {
               return res.status(401).json({ massage: 'you SHELL NOT PASS @!!' })
          }

          const connection = await CreateMongooseClient(session.user.name + userDataPrefix)

          if (!connection) {
               return res.status(500).json({ massage: 'No DB Connection' })
          }

          const body = req.body

          const isValidData = IsracardZVS.safeParse(body)

          if (!isValidData.success) {
               return res.status(405).json({ massage: "Bad Input" })
          }

          const { apiKey , ...rest} = isValidData.data

          const chipperKey= encryptData(apiKey,secretKey)

          const Data : UserIsracardInfoType  = {
                apiKey:chipperKey,
               ...rest
          }
          
          const Model = IsracardModel(connection)

          const doc = new Model(Data)

          const saveResult = await doc.save()

          if (saveResult.errors) {
               return res.status(500).json({ massage: 'save errors ' + API_NAME })
          }

          return res.status(200).json({ massage: "save success's" + API_NAME })

     })
}


export const config = {
     api: {
          externalResolver: true,
     }
}