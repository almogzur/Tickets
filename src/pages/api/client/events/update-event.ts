import { SeatsRow, TheaterType } from "@/types/components-types/admin/theater/admin-theater-types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { UpdateTheaterApiVS } from '@/types/pages-types/client/client-event-type';
import {  NewEventType } from "@/types/pages-types/admin/admin-event-types";
import { CreateMongooseClient } from "@/util/db/mongoose-connect";
import { EventModel } from "@/util/db/mongoose-models";
import { selectSeats, ValidateNotOccupiedSeats } from "@/util/fn/backend_api_fn";


const apiLimiter = rateLimit(rateLimitConfig);



export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    return apiLimiter(req, res, async () => {
        const API_NAME = "Client Update Events (Only PayProvider Invoke)";
        console.log(API_NAME);

        if (req.method !== "POST") {
            return res.status(401).json({ message: `Method ${req.method} not allowed` });
        }

        const body = req.body;
        const isValidData = UpdateTheaterApiVS.safeParse(body);

        if (!isValidData.success) {
            return res.status(400).json({ massage: " bad request data " });
        }

        const { reqTheater, eventId ,numberOfSeatsSelected} = isValidData.data;


        res.setHeader("Allow", ["POST"]);

        const connection = await CreateMongooseClient(null);

        if (!connection) {
            return res.status(500).json({ err: 'No DB Connection' });
        }

        const Cluster = (await connection.listDatabases()).databases;

        const UsersDbs = Cluster.filter((db) => db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`));

        let Data 

        for (const db of UsersDbs) {

            const dbConnection = connection.useDb(db.name);

            const model = EventModel(dbConnection);

            const event = await model.findOne(
                { _id: ObjectId.createFromHexString(eventId) },
                { projection: { log: false, invoices: false } },
                { lean: true }
            );

            if (event) {
                Data = { userEvent: event, userDb: db.name };
                break;
            }
        }

        if (!Data?.userEvent || !Data.userDb) {
            return res.status(400).json({ massage: "no event" });
        }

        const { info,   ...restEvent } = Data.userEvent;
        const { Theater,  availableSeatsAmount, ...restInfo } = info;

        const isSeatsFree = ValidateNotOccupiedSeats(Theater, reqTheater);

        if (!isSeatsFree) {
            return res.status(400).json({ massage: "not open seat" });
        }

        const modifiedSates = selectSeats({ main: reqTheater.mainSeats, side: reqTheater.sideSeats });

        const newAvailableSeatsAmount = availableSeatsAmount - numberOfSeatsSelected

        const newTheater: TheaterType = {
            ...Theater,
            mainSeats: modifiedSates.main,
            sideSeats: modifiedSates.side
        };
   
        const newEvent: NewEventType = {
            info: {
                  Theater: newTheater, 
                   availableSeatsAmount:newAvailableSeatsAmount,
                   ...restInfo 
                },
            ...restEvent,
        };

        const userDb = connection.useDb(Data.userDb);
        const Model = EventModel(userDb);

        const replaceResult = await Model.findOneAndReplace(
            { _id: ObjectId.createFromHexString(eventId) },
            { ...newEvent },
            { returnDocument: 'after' }
        );

        if (!replaceResult) {
            console.log(API_NAME  + " err")

            return res.status(400).json({ massage: API_NAME +   "err" });
        }
        
        console.log(API_NAME  + " success")

        return res.status(200).json({ massage: API_NAME +' success ' });
    });
}

// resolve by the rate limiter 
// see :   https://github.com/vercel/next.js/discussions/40270
export const config = {
    api: {
        externalResolver: true,
    },
};