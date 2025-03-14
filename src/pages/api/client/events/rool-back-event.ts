import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import { CreateMongooseClient } from "@/util/db/mongosee-connect";
import { EventModel } from "@/util/db/mongosee-models";
import { unSelectSeates } from "@/util/fn/event-api-fn";
import { RollbackTheaterApiVS } from "@/types/pages-types/client/client-event-type";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const connection = await CreateMongooseClient(null);

    if (!connection) {
        return res.status(500).json({ message: 'Failed to connect to the database' });
    }

    const  body = req.body

    const isValideData = RollbackTheaterApiVS.safeParse(body)

    if(!isValideData.success){
        return res.status(400).json({massage:'invalide data '})
    }

    const {  Theater , selectedSeats , cart, eventId  } = isValideData.data


    const Model = EventModel(connection);

    const existingEvent = await Model.findOne({ _id: ObjectId.createFromHexString(eventId) });
    
    if (!existingEvent) {
        return res.status(404).json({ message: 'Event not found' });
    }


    // const updatedTheater = unSelectSeats();

    const newTheater = unSelectSeates(Theater, selectedSeats)


    const updatedEvent = {
        ...existingEvent,
        info: {
            ...existingEvent.info,
            Theater: newTheater
        }
    }

    const result = await Model.findOneAndReplace(
        { _id: ObjectId.createFromHexString(eventId) },
        updatedEvent,
        { new: true }
    );

    if (!result) {
        return res.status(400).json({ message: 'Update failed' });
    }

    return res.status(200).json({ message: 'Theater seats updated successfully', data: result });
}
