import { CreateMongooseClient } from "@/util/db/mongosee-connect";
import { EventModel, filterAdminDataQuryOptions } from "@/util/db/mongosee-models";

import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import rateLimit from "express-rate-limit";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const apiLimiter = rateLimit(rateLimitConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  apiLimiter(req, res, async () => {

    const API_NAME = 'Get Event By ID';

    console.log(API_NAME);

    if (req.method !== 'GET') {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const connection = await CreateMongooseClient(null);
    if (!connection) {
      return res.status(500).json({ error: 'Database connection failed' });
    }

    const { event_id } = req.query;

    console.log( API_NAME ,event_id) 

    if (!ObjectId.isValid(`${event_id}`)) {
      return res.status(400).json({ error: "Invalid event ID format" });
    }

    try {
      const Cluster = (await connection.listDatabases()).databases;
      const UsersDbs = Cluster.filter((db) => db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`));

      let eventFound;

      for (const db of UsersDbs) {
        const dbConnection = connection.useDb(db.name)
        ;
        const Model = EventModel(dbConnection);

        const event = await Model.findOne(
            {_id: ObjectId.createFromHexString(`${event_id}`)}, //  id
            {},
            filterAdminDataQuryOptions
        )

        if (event) {
          eventFound = event;
          break;
        }
      }

      if (eventFound) {
        return res.status(200).json(eventFound);
      } else {
        return res.status(201).json({ message: 'Event not found' });
      }
    } catch (err) {
      console.error("Error fetching event:", err);
      return res.status(500).json({ message: `Internal Server Error: ${err}` });
    }
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};