import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import { CreateMongooseClient } from "@/util/db/mongoose-connect";
import { EventModel } from "@/util/db/mongoose-models";
import { RollbackTheaterApiVS } from "@/types/pages-types/client/client-event-type";
import { unSelectSeats } from "@/util/fn/backend_api_fn";
import { HttpStatusCode } from "axios";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(HttpStatusCode.MethodNotAllowed)
    }

    const connection = await CreateMongooseClient(null);

    if (!connection) {
        return res.status(HttpStatusCode.InternalServerError).json({ message: 'Failed to connect to the database' });
    }

    const body = req.body
    const isValidData = RollbackTheaterApiVS.safeParse(body)

    if (!isValidData.success) {
        return res.status(HttpStatusCode.BadRequest).json({ massage: 'invalid data ' })
    }

    const { Theater, selectedSeats, cart, eventId } = isValidData.data

    const Cluster = (await connection.listDatabases()).databases;

    const UsersDbs = Cluster.filter((db) => db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`));

    let EventData

    const Model = EventModel(connection);

    for (const db of UsersDbs) {

        const dbConnection = connection.useDb(db.name);

        const model = EventModel(dbConnection);

        const event = await model.findOne(
            { _id: ObjectId.createFromHexString(eventId) },
            { projection: { log: false, invoices: false } },
            { lean: true }
        );

        if (event) {
            EventData = { userEvent: event, userDb: db.name };
            break;
        }
    }

    if (!EventData) {
        return res.status(HttpStatusCode.PreconditionFailed).json({ message: 'event not found' })
    }
    // const updatedTheater = unSelectSeats();

    connection.useDb(EventData.userDb)

    const newTheater = unSelectSeats(Theater, selectedSeats)

    const updatedEvent = {
        ...EventData.userEvent,
        info: {
            ...EventData.userEvent.info,
            Theater: newTheater
        }
    }


    const result = await Model.findOneAndReplace(
        { _id: ObjectId.createFromHexString(eventId) },
        updatedEvent
    ).lean();

    if (!result) {
        return res.status(HttpStatusCode.PreconditionFailed).json({ message: 'rollback failed' });
    }

    return res.status(HttpStatusCode.Ok).json({ message: 'Theater seats rollback successfully', data: result });
}
