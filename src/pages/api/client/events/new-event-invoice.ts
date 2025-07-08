import { SavePayPalInvoceVS } from "@/types/pages-types/client/client-event-type";
import { CreateMongooseClient } from "@/util/db/mongoose-connect";
import { EventModel } from "@/util/db/mongoose-models";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
const apiLimiter = rateLimit(rateLimitConfig);


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  return apiLimiter(req, res, async () => {
    const API_NAME = 'Add Invoce to event Api';
    console.log(API_NAME);
    if (req.method !== 'POST') {
      return res.status(405).json({ err: "not Allowed " });
    }
    const connection = await CreateMongooseClient(null);
    if (!connection) {
      return res.status(500).json({ err: 'No DB Connection' });
    }
    const body = req.body;
    const isValidData = SavePayPalInvoceVS.safeParse(body);
    const issue = isValidData.error?.issues;
    if (!isValidData.success) {
      console.log(issue);
      return res.status(400).json({ err: "bad input " + API_NAME });
    }
    const { eventId, total, purchase_date } = isValidData.data;
   
    try {

      const Cluster = (await connection.listDatabases()).databases;

      const UsersDbs = Cluster.filter((db) =>
        db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`)
      );

      let updateResults 

      for (const db of UsersDbs) {
        const dbConnection = connection.useDb(db.name, { noListener: true });
        const Model = EventModel(dbConnection);

        const eventUpdate = await Model.findOneAndUpdate(
          { _id: ObjectId.createFromHexString(eventId) },
          { $push: { invoices: isValidData.data } },
          { new: true }
        ).lean();

        if(eventUpdate){
          updateResults = eventUpdate 
          break
        }
       }
      console.log ( API_NAME,  "update result" ,  !! updateResults );

      const event = updateResults
      if (event) {
        return res.status(200).json({ message: 'Invoice added successfully.' });
      }
      return res.status(200).json({ message: 'Event not found.' });
    } catch (err) {
      return res.status(500).json({ message: `Error: ${err}` });
    }
  });
}
export const config = {
  api: {
    externalResolver: true,
  },
};