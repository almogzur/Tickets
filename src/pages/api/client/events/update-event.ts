import { SeatsRow, TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";
import { modifieSeatValueFunctionType, UpdateTheaterApiVS } from '@/types/pages-types/client/client-event-type'
import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";
import {CreateMongooseClient} from "@/util/dbs/mongosee-fn";



const apiLimiter = rateLimit(rateLimitConfig);


const ValidateNotOcupideSeats = (oldT: TheaterType, newT: TheaterType): boolean => {
    console.log("Validating Inoket");

    const existingTheaterSeats = { ...oldT };
    const newSeats = { ...newT };

    const combinedExistingSeats = { ...existingTheaterSeats.mainSeats, ...existingTheaterSeats.sideSeats };
    const combinedNewSeats = { ...newSeats.mainSeats, ...newSeats.sideSeats };

    // Using for...of instead of forEach to allow breaking the loop
    for (const [rowName, rowSeats] of Object.entries(combinedExistingSeats)) {
        for (let index = 0; index < rowSeats.length; index++) {
            const seatValue = rowSeats[index];

            if (seatValue === 1 && combinedNewSeats[rowName]?.[index] === 2) {
                // Invalid case found - seat was occupied (1) and new seat value is 2
                console.log("ValidateNotOcupideSeats", "new:", combinedNewSeats[rowName]?.[index], "old:", seatValue, "at ", rowName);

                return false;
            }
        }
    }

    return true;
};

const modifieSeatValue = (TheaterSeates: modifieSeatValueFunctionType): modifieSeatValueFunctionType => {

    const newTheaterSeatDetails = { ...TheaterSeates }

    const combinedSeats = { ...TheaterSeates.main, ...TheaterSeates.side };

    Object.entries(combinedSeats).forEach(([_, rowSeats]) => {
        rowSeats.forEach((value, index) => {
            if (value === 2) {
                rowSeats[index] = 1
            }
        });
    }
    );

    // Assign modified seats back to newTheaterSeatDetails
    return newTheaterSeatDetails;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    return apiLimiter(req, res,
        async () => {

            const API_NAME = "Client Update Events (Only PayProvider Invoke)";
            console.log(API_NAME)

            if (req.method !== "POST") {
                return res.status(401).json({ message: `Method ${req.method} not allowed` });
            }

            const body = req.body
            const isValideData = UpdateTheaterApiVS.safeParse(body)

            if (!isValideData.success) {
                return res.status(400).json({ massage: " bad request data " })
            }

            const { reqTheater, eventId } = req.body
            res.setHeader("Allow", ["POST"]);

            const connection = await CreateMongooseClient(null)

            if (!connection) {
                return res.status(500).json({ err: 'No DB Connection' })
            }

            const Cluster = (await connection.listDatabases()).databases

            const UsersDbs = Cluster.filter((db) => db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`))


            const session = connection?.startSession()
            //https://mongoosejs.com/docs/transactions.html
            // let you execute multiple operations in isolation and potentially
            //  undo all the operations if one of them fails. 
            try {
                const TransactionResult = await (await session)?.withTransaction(
                    async (): Promise<boolean | undefined> => {
                        //     console.log("TransactionResult Start")

                        for (const { name, empty } of UsersDbs) {

                            if (empty) continue; // remove

                            const userDb = connection.useDb(name)

                            const collection = userDb.collection(`${process.env.USER_EVENTS_FOLDER_PATH}`)

                            //  User db
                            // looking throu all collections  and retriving the first one ( _id is uniq ) so can only be 1 result 
                            //  with   _id
                            const event = await collection.findOne<ClientEventType>({ _id: ObjectId.createFromHexString(eventId) })

                            // if no event to next bd 
                            if (!event) {
                                console.log("TransactionResult", "!event")
                                continue
                            }

                            // console.log(collection.dbName, collection.collectionName);

                            const { info, ...restEvent } = event;
                            const { Theater, ...restInfo } = info;

                            if (!Theater) continue;

                            const isSeatsFree = ValidateNotOcupideSeats(Theater, reqTheater);


                            if (!isSeatsFree) return false

                            const modifiedSeates = modifieSeatValue({ main: reqTheater.mainSeats, side: reqTheater.sideSeats })

                            const newTheater: TheaterType = {
                                ...Theater,
                                mainSeats: modifiedSeates.main,
                                sideSeats: modifiedSeates.side
                            }

                            const newEvent: ClientEventType = {
                                info: { Theater: newTheater, ...restInfo },
                                ...restEvent,
                            };

                            const replaceResult = await collection.findOneAndReplace(
                                { _id: ObjectId.createFromHexString(eventId) },
                                newEvent,
                                { returnDocument: "after" }
                            );

                            if (!replaceResult) {
                                return false
                            }
                            return true

                        }
                    }

                );
                if (!TransactionResult) {
                    console.log("TransactionResult", "err")
                    return res.status(206).json({ massage: "bad TransactionResult " + API_NAME })

                }
                console.log(`succsess ${API_NAME} `)
                return res.status(200).json({ massage: `succsess ${API_NAME} ` })
            }
            catch (err) {
                console.log(" Cathch block err withTransaction ", err)
                return res.status(404).json({ massage: "bad TransactionResult " + API_NAME })
            }


        })
};




// resolve by the rate limeter 
// see :   https://github.com/vercel/next.js/discussions/40270
export const config = {
    api: {
        externalResolver: true,
    },
}