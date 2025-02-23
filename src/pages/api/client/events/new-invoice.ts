import { SavePayPalInvoceVS } from "@/types/pages-types/client/client-event-type";
import { PayPalOrderVS } from "@/types/pages-types/client/payment-object";
import {CreateMongooseClient} from "@/util/dbs/mongosee-fn";
import { AdminEventModle } from "@/util/dbs/schma/modles";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<void>{
  return apiLimiter(req, res,async () => {

    const API_NAME =  'Add Invoce to event Api' 
    console.log(API_NAME)

  if (req.method !== 'POST') {
         return  res.status(405).json({ err: "not Allowed " });
    }

 const connection  = await CreateMongooseClient(null)

 if(!connection){ 
    return res.status(500).json({err:'No DB Connection'})
   }

 const body = req.body

 const isValiedData = SavePayPalInvoceVS.safeParse(body)

 const issue = isValiedData.error?.issues

 if(!isValiedData.success){
    console.log(issue)
    return res.status(400).json({err:"bad input " + API_NAME })
 }

  const { eventId  } = isValiedData.data

  try{ 
    const Cluster = (await connection.listDatabases()).databases

    const UsersDbs = Cluster.filter((db)=> db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`))

    const getEvent = await Promise.all(
      UsersDbs.map(async (db) => {
        const dbConnection = connection.useDb(db.name, { noListener: true }); // Dynamically use the DB

        const Modle = AdminEventModle(dbConnection)
         // Bind the model to the DB
        return Modle
          .findOne({_id:ObjectId.createFromHexString(eventId)}) // Query the events
        })
    );

    connection.useDb('') // returning to root 
  
  console.log(getEvent,API_NAME)


  if( event) {
    return res.status(200).json({ message: 'Invoice added successfully.' });
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


