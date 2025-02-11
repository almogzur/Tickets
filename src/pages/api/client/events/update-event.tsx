import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { ClientEventType } from "@/types/pages-types/new-event-types";
import { disconnectFromMongooseDb } from "@/util/dbs/mongosee-fn";
import {  getAllDbListDB, getDb } from "@/util/dbs/mongo-db/db_fn";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import { json } from "stream/consumers";
import { Mongo } from "@/util/dbs/mongo-db/mongo";
import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";



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
                console.log("ValidateNotOcupideSeats", "new:", combinedNewSeats[rowName]?.[index], "old:", seatValue);

                return false;
            }
        }
    }

    return true;
};

const modifieSeatValue = (Theater: TheaterType): TheaterType => {
    const newTheaterSeatDetails = { ...Theater };
    const combinedSeats = { ...Theater.mainSeats, ...Theater.sideSeats };

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
   return  apiLimiter(req, res,
        async () => {

            const API_NAME = "Client Update Events (Only PayProvider Invoke)";
            
            console.log(API_NAME);


       
            if (req.method !== "POST") {
                return res.status(401).json({ message: `Method ${req.method} not allowed` });
            }

            res.setHeader("Allow", ["POST"]);
            const Client = Mongo()
      


            const { TheaterState, eventId } = req.body  // Theater State 

            const dbList = await getAllDbListDB(Client)
            const session = (await Client)?.startSession()
            //https://mongoosejs.com/docs/transactions.html
            // let you execute multiple operations in isolation and potentially
            //  undo all the operations if one of them fails. 

    
            const TransactionResult = await session?.withTransaction(
                async (): Promise<boolean | undefined> => {
                    console.log("TransactionResult Start")
                    if (!dbList) {
                        return false;
                    }
                    for (const { name, empty } of dbList) {
                        if (empty) continue;
                        const db = await getDb(name,Client)
                        if (!db) continue;
                        const collections = await db.collections();
                        for (const collection of collections) {
                            if (!collection.dbName.includes("_Data")) continue;
                            // inside User_Data 
                            // looking throu all collections 
                            // retrive the the doc with _id
                            const event = await collection.findOne<ClientEventType>({ _id: ObjectId.createFromHexString(eventId) }, { session: session })

                            // if no event to next bd 
                            if (!event) continue;

                            console.log(collection.dbName, collection.collectionName);
                            const { info, ...restEvent } = event;
                            const { Theater, ...restInfo } = info;

                            if (!Theater) continue;

                            const isSeatsFree = ValidateNotOcupideSeats(Theater, TheaterState);

                            if (!isSeatsFree)
                                return false

                            const newTheater = modifieSeatValue(TheaterState)
                            const newEvent: ClientEventType = { info: { Theater: newTheater, ...restInfo }, ...restEvent };
                            const replaceResult = await collection.findOneAndReplace(
                                { _id: ObjectId.createFromHexString(eventId) },
                                newEvent,
                                { returnDocument: "after", session }
                            );

                            if (!replaceResult) {
                                return false
                            }
                            return true

                        }
                    }
                },
            );
            if (!TransactionResult) { // if no event in db 
                return res.status(404).json({massage:"bad TransactionResult"})
            }
            return res.status(200).json({ massage: `succsess ${API_NAME} ` })




        })
};





// resolve by the rate limeter 
// see :   https://github.com/vercel/next.js/discussions/40270
export const config = {
    api: {
      externalResolver: true,  
    },
  }