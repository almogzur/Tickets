import { ClientEventType } from "@/types/pages-types/new-event-types";
import { Mongo } from "@/util/db/connections/mongo-db/Mongo-db";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";

import { NextApiRequest, NextApiResponse } from "next";


const apiLimiter = rateLimit(rateLimitConfig);


 const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<ClientEventType[] | undefined | void> => {
  
  return apiLimiter( req,res ,  async ()=>{
    const API_NAME = "Get All Client Active Events  (Hook)";

    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      console.log(`Method ${req.method} Not Allowed`);
      res.status(401).end(`Method ${req.method} Not Allowed`);
    }
  
    const MongoClient = await Mongo();
  
    if (!MongoClient) {
      return res.status(500).json({ massage: " No DB Connection" })
    }
  
    const Cluster = await MongoClient?.db().admin().listDatabases();
  
    const ClusterUsersDBLIst = Cluster?.databases.filter((db, i) => db.name.includes("_Data"));
  
    const getUserCollections = async (dbName: string) => {
      try {
        const UserDB = MongoClient?.db(dbName);
        const EventsCollections = (await UserDB?.collections({}))
          .filter((collection) => collection.collectionName === 'Events');
  
  
  
  
        if (!EventsCollections.length) {
          console.warn(`No Events collections found in database ${dbName}`);
        }
  
        const data = await Promise.all(
          EventsCollections.map(async (collection) => {
            const documents = await collection.find({}, {}).toArray();
  
            return documents; // Returns WithId<Document>[]
          })
        );
  
        return data.flat(); // Flatten the array of arrays into a single array of documents
      } catch (error) {
        console.log(`No Events collections found in database ${dbName}`);
  
        return null;
      }
    };
  
  
    const UsersEventsRow = await Promise.all(
      ClusterUsersDBLIst.map(
        async (Db) => {
          const items = await getUserCollections(Db.name)
          return items
  
        })
    )
  
    const Events = UsersEventsRow
      .filter((UserDraftCollection) => Array.isArray(UserDraftCollection) && UserDraftCollection.length > 0)
      .flat();
  
    if (!Events.length) {
      console.log(API_NAME, "Failed");
      return res.status(204).json({ massage: "No Events" })
  
    }
  
  
    console.log(API_NAME, "Sucsses");
  
  
    return res.status(200).send(Events);
  } )

};

export default handler


export const config = {
  api: {
    externalResolver: true,  // resolve by the rate limeter
  },
}


