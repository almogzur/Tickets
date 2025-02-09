import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { ClientEventType } from "@/types/pages-types/new-event-types";
import { CRUDClientConnection, disconnectFromDb } from "@/util/DB/connections/Mongosee_Connection";
import {  ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";
import { json } from "stream/consumers";




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



export default async function handler(req: NextApiRequest, res: NextApiResponse):Promise<void> {
    const API_NAME = "Client Update Events (Only PayProvider Invoke)";
    const origin = req.headers.origin || req.headers.referer || "";
    
    console.log(API_NAME , "Origin :", origin);

    const connection = await CRUDClientConnection()

    if (req.method !== "POST") {
         res.status(405).json({ message: `Method ${req.method} not allowed` });
        } 

     res.setHeader("Allow", ["POST"]);

    if( !connection ){
         res.status(400).json({massage :` no db connectio  ${API_NAME}, `} )
    }

        const {TheaterState,eventId}  = req.body  // Theater State 
  

        const dbList = await connection?.db?.admin().listDatabases()
        const session = connection?.getClient().startSession();
        
        //https://mongoosejs.com/docs/transactions.html
        // let you execute multiple operations in isolation and potentially
        //  undo all the operations if one of them fails. 


        const result  = await session?.withTransaction(
              async () : Promise<boolean|undefined> => {
                if (!dbList?.databases) {
                    return false;
                }
               for (const { name, empty } of dbList.databases) {
                   if (empty) continue;
                     const db = connection?.getClient().db(name);
                     if (!db) continue;
                   const collections = await db.collections();

                   for (const collection of collections) {
                    if (!collection.dbName.includes("_Data")) continue;

                    const event = await collection.findOne<ClientEventType>({ _id:  ObjectId.createFromHexString(eventId) },{session:session})

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
                        { _id:  ObjectId.createFromHexString(eventId) },
                        newEvent,
                        { returnDocument: "after", session }
                    );

                    if (!replaceResult){
                        return false
                     }
                    return true
          
                        }              
                 }
           },           
        );
        if(!result){
            res.status(204).end()
        }
        res.status(200).json({massage:`succsess ${API_NAME} `})




};

// Function to modify theater seat details (currently empty)

