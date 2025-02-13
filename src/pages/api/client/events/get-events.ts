import { ClientEventType } from "@/types/pages-types/new-event-types";
import {  getAllDbList, getCollectionsFromDb, getDb } from "@/util/dbs/mongo-db/db_fn";
import { Mongo } from "@/util/dbs/mongo-db/mongo";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { MongoClient } from "mongodb";

import { NextApiRequest, NextApiResponse } from "next";


const apiLimiter = rateLimit(rateLimitConfig);

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<ClientEventType[] | undefined | void> => {

  return apiLimiter(req, res,
    async () => {
      const API_NAME = "Get All Client Active Events  (Hook)";

      const Client = await Mongo();

      if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        console.log(`Method ${req.method} Not Allowed`);
        res.status(401).end(`Method ${req.method} Not Allowed`);
      }

      if (!Client) {
        return res.status(500).json({ massage: " No DB Connection" })
      }
      const dblist = await getAllDbList(Client)

      if (!dblist) return
      
       const FinedCrusersArray =await  Promise.all(  // <- [{}] ,[{}] ,[{}] after flat 
             dblist.map( 
               async ( db )=>{
                if (db.empty){return}
                const UserDB = await getDb(db.name, Client, `${process.env.USER_DATA_FOLDER_PATH}`)
                 if(!UserDB){return}
                const UserCollections = await getCollectionsFromDb(UserDB, `${process.env.USER_EVENTS_FOLDER_PATH}`)
                const FinedCruser =await  Promise.all(  UserCollections.map(async (collection) =>  collection.find().toArray()) )
             
                return FinedCruser.flat() //flat remove the UserCollections wraper array [ [{}]. [{}] .[{}] ] <- this one
              
             })
          )
          
           //  findResult will only be returned if its ! null . flat remove the dblist wraper array
        const Events =FinedCrusersArray.filter((findResult)=> findResult ).flat() //  [[  [{}],[{}],[{}] ] ] <- this one . -> after [ [] ,[], [] ] 

        if(!Events.length){
          console.log(API_NAME, 'faield ' ,Events)

            return res.status(200)
        }
            

      console.log(API_NAME, 'succsess' )
       //     console.log(Events)
     return res.send(Events)
        }
    )

};

export default handler


export const config = {
  api: {
    externalResolver: true,  // resolve by the rate limeter
  },
}


