import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { ClientEventType } from "@/types/pages-types/new-event-types";
import { disconnectFromMongooseDb } from "@/util/dbs/mongosee-fn";
import {  getAllDbList, getDb, getCollectionsFromDb } from "@/util/dbs/mongo-db/db_fn";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import { json } from "stream/consumers";
import { Mongo } from "@/util/dbs/mongo-db/mongo";
import rateLimit from "express-rate-limit";
import { rateLimitConfig } from "@/util/fn/api-rate-limit.config";



const apiLimiter = rateLimit(rateLimitConfig);


const ValidateNotOcupideSeats = (oldT: Partial<TheaterType>, newT: Partial<TheaterType>): boolean => {
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

const modifieSeatValue = (Theater: Partial<TheaterType>): TheaterType => {


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
            
            if (req.method !== "POST") {
                return res.status(401).json({ message: `Method ${req.method} not allowed` });
            }

            res.setHeader("Allow", ["POST"]);
            const Client = await Mongo()

            // validate incoming data !!!
             
      
            const { reqTheater, eventId } = req.body 
            const {mainSeats ,sideSeats} = reqTheater
            
            const dbList = await getAllDbList(Client)
            const session =  Client?.startSession()
            //https://mongoosejs.com/docs/transactions.html
            // let you execute multiple operations in isolation and potentially
            //  undo all the operations if one of them fails. 
            try{ 
                const TransactionResult = await session?.withTransaction(
                   async (): Promise<boolean | undefined> => {
                   //     console.log("TransactionResult Start")
                        if (!dbList) {
                            console.log("TransactionResult" , "noDBlist")
                            return false;
                        }
                        for (const { name, empty } of dbList) {
                            if (empty) continue;
                            const db = await getDb(name,Client,`${process.env.USER_DATA_FOLDER_PATH}`)
                            if (!db) continue;
                         
                            const UserCollections = await getCollectionsFromDb(db, `${process.env.USER_EVENTS_FOLDER_PATH}`)
                            if(!UserCollections) continue
                            for (const collection of UserCollections) {
                                // console.log(collection)
                                //  User db
                                // looking throu all collections  and retriving the first one ( _id is uniq ) so can only be 1 result 
                                //  with   _id
                                const event = await collection.findOne<ClientEventType>({ _id: ObjectId.createFromHexString(eventId) }, { session: session })
    
                                // if no event to next bd 
                                if (!event){
                                    console.log("TransactionResult" , "!event")
                                     continue
                                }
    
                                console.log(collection.dbName, collection.collectionName);
                                    const {   info, ...restEvent } = event;
                                     const { Theater, ...restInfo } = info;
    
                                if (!Theater) continue;
    
                                const isSeatsFree = ValidateNotOcupideSeats(Theater, reqTheater);

    
                                 if (!isSeatsFree)   return false
                                 const modifiedSeates = modifieSeatValue(reqTheater)

                                 const newTheater : TheaterType  = {
                                     ...Theater,
                                      mainSeats:modifiedSeates.mainSeats,
                                      sideSeats:modifiedSeates.sideSeats
                                 }
                                
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
                if (!TransactionResult){
                    console.log("TransactionResult" , "err")
                    return res.status(206).json({massage:"bad TransactionResult " + API_NAME})
    
                } 
                console.log(`succsess ${API_NAME} ` )
              return res.status(200).json({ massage: `succsess ${API_NAME} ` })
             }
            catch (err){
                console.log( " Cathch block err withTransaction " ,err)
                return res.status(404).json({massage:"bad TransactionResult " + API_NAME})
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