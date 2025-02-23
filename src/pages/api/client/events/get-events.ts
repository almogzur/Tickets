import { ClientEventType, NewEventType } from "@/types/pages-types/admin/admin-event-types";
import {CreateMongooseClient} from "@/util/dbs/mongosee-fn";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";

import { NextApiRequest, NextApiResponse } from "next";


const apiLimiter = rateLimit(rateLimitConfig);

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<ClientEventType[] | undefined | void> => {

  return apiLimiter(req, res,
    async () => {
      const API_NAME = "Get All Client Active Events  (Hook)";
      console.log(API_NAME)

        const connection  = await CreateMongooseClient(null)

      if (req.method !== 'GET') {
        return  res.status(405).end(`Method ${req.method} Not Allowed`);
      }

      if (!connection) {
        return res.status(500).json({ massage: " No DB Connection" })
      
      }
      const Cluster = (await connection.listDatabases()).databases

      const UsersDbs = Cluster.filter((db)=> db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`))

      if (!UsersDbs) return

     // console.log(UsersDbs)


      const Events = await Promise.all(
        UsersDbs.map(async (db) => {

          const dbConnection = connection.useDb(db.name) // Bind DB

        //  console.log(dbConnection.db?.databaseName)

          const UserCollection =dbConnection.collection<NewEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`)
    
          const userEvents =  await UserCollection.find({},{projection:{log:false,invoices:false}}).toArray()

          return   userEvents

        })
      )
          
           //  findResult will only be returned if its ! null . 
           // flat remove the dblist wraper array
          
            console.log( "Number Of events  ", Events.flat().length)
      
        return  res.send(Events.flat()) 
        }
    )

};

export default handler


export const config = {
  api: {
    externalResolver: true,  // resolve by the rate limeter
  },
}


