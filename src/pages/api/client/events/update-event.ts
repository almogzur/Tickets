import { SeatsRow, TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { modifieSeatValueFunctionType, UpdateTheaterApiVS } from '@/types/pages-types/client/client-event-type';
import { ClientEventType, NewEventType } from "@/types/pages-types/admin/admin-event-types";
import { CreateMongooseClient } from "@/util/dbs/mongosee-fn";
import { AdminEventModel } from "@/util/dbs/schma/models";

const apiLimiter = rateLimit(rateLimitConfig);

const ValidateNotOcupideSeats = (oldT: TheaterType, newT: Partial<TheaterType>): boolean => {
    console.log("Validating Inoket");

    const existingTheaterSeats = { ...oldT };
    const newSeats = { ...newT };

    const combinedExistingSeats = { ...existingTheaterSeats.mainSeats, ...existingTheaterSeats.sideSeats };
    const combinedNewSeats = { ...newSeats.mainSeats, ...newSeats.sideSeats };

    for (const [rowName, rowSeats] of Object.entries(combinedExistingSeats)) {
        for (let index = 0; index < rowSeats.length; index++) {
            const seatValue = rowSeats[index];

            if (seatValue === 1 && combinedNewSeats[rowName]?.[index] === 2) {
                console.log("ValidateNotOcupideSeats", "new:", combinedNewSeats[rowName]?.[index], "old:", seatValue, "at ", rowName);
                return false;
            }
        }
    }

    return true;
};

const modifieSeatValue = (TheaterSeates: modifieSeatValueFunctionType): modifieSeatValueFunctionType => {
    const newTheaterSeatDetails = { ...TheaterSeates };
    const combinedSeats = { ...TheaterSeates.main, ...TheaterSeates.side };

    Object.entries(combinedSeats).forEach(([_, rowSeats]) => {
        rowSeats.forEach((value, index) => {
            if (value === 2) {
                rowSeats[index] = 1;
            }
        });
    });

    return newTheaterSeatDetails;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    return apiLimiter(req, res, async () => {
        const API_NAME = "Client Update Events (Only PayProvider Invoke)";
        console.log(API_NAME);

        if (req.method !== "POST") {
            return res.status(401).json({ message: `Method ${req.method} not allowed` });
        }

        const body = req.body;
        const isValideData = UpdateTheaterApiVS.safeParse(body);

        if (!isValideData.success) {
            return res.status(400).json({ massage: " bad request data " });
        }

        const { reqTheater, eventId ,numerOfSeatsSealected} = isValideData.data;


        res.setHeader("Allow", ["POST"]);

        const connection = await CreateMongooseClient(null);

        if (!connection) {
            return res.status(500).json({ err: 'No DB Connection' });
        }

        const Cluster = (await connection.listDatabases()).databases;
        const UsersDbs = Cluster.filter((db) => db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`));

        let Data 

        for (const db of UsersDbs) {
            const dbConnection = connection.useDb(db.name, { noListener: true });
            const Modle = AdminEventModel(dbConnection);

            const event = await Modle.findOne(
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

        const isSeatsFree = ValidateNotOcupideSeats(Theater, reqTheater);

        if (!isSeatsFree) {
            return res.status(400).json({ massage: "not open seat" });
        }

        const modifiedSeates = modifieSeatValue({ main: reqTheater.mainSeats, side: reqTheater.sideSeats });

        const newAvailableSeatsAmount = availableSeatsAmount - numerOfSeatsSealected

        const newTheater: TheaterType = {
            ...Theater,
            mainSeats: modifiedSeates.main,
            sideSeats: modifiedSeates.side
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
        const Model = AdminEventModel(userDb);

        const replaceResult = await Model.findOneAndReplace(
            { _id: ObjectId.createFromHexString(eventId) },
            { ...newEvent },
            { returnDocument: 'after' }
        );

        if (!replaceResult) {
            console.log(API_NAME  + " err")

            return res.status(400).json({ massage: API_NAME +   "err" });
        }
        console.log(API_NAME  + " Succsess")

        return res.status(200).json({ massage: API_NAME +' succsess ' });
    });
}

// resolve by the rate limeter 
// see :   https://github.com/vercel/next.js/discussions/40270
export const config = {
    api: {
        externalResolver: true,
    },
};