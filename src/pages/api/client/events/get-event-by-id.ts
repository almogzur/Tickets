
import {CreateMongooseClient,} from "@/util/dbs/mongosee-fn";
import { AdminEventModle } from "@/util/dbs/schma/modles";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  'Get Event By ID' 
    console.log(API_NAME)

  if (req.method !== 'GET') {
         return  res.status(405).json({ err: "not Allowed " });
    }
        const connection  = await CreateMongooseClient(null)

 if(!connection){ 
    return res.status(500).json({err:'No DB Connection'})
   }

 const body = req.query

  const { event_id } = body
 // console.log(body,API_NAME)


 if (!ObjectId.isValid( `${event_id}`)) {
  return res.status(400).json({ error: "Invalid eventId format" });
}

  try{ 
    const Cluster =  (await connection.listDatabases()).databases

    const UsersDbs = Cluster.filter((db)=> db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`))

    const EventFindResults = await Promise.all(
      UsersDbs.map(async (db) => {
        const dbConnection = connection.useDb(db.name, { noListener: true }); // Dynamically use the DB
              
        const Modle = AdminEventModle(dbConnection)


         // Bind the model to the DB
        return  Modle 
          .findOne({_id:ObjectId.createFromHexString(`${event_id}`)},{projection:{log:false,invoices:false}}) // Query the events
      })
    );

    const event =  EventFindResults.find(( event )=> event ) // retrun if not null

  //  connection.useDb('') // return to global path 

 // console.log(event)

  if( event) {
    return res.send(event)
  }
  return res.status(200).json({ message: 'Event not found.' });
  
}
  catch (err){  
    return res.status(500).json({ message: `Error: ${err}` });
  }
  
})
}

export const config = {
api: {
 externalResolver: true, 
}
}


