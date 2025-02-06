import { TheaterType } from "@/components/admin/newEvent/theater/types/theater-types";
import { ClientEventType } from "@/components/admin/newEvent/types/new-event-types";
import { CRUDClientConnection, disconnectFromDb } from "@/lib/DB/Mongosee_Connection";
import { ListDatabasesResult, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next/types";


const wighetList = [
    "*.styled-tickets.com",
    "*.sandbox.paypal.com",
    "*.paypal.com",
    "http://localhost:*", // Allow localhost with any port
    "http://127.0.0.1:*"  // Allow 127.0.0.1 (alternative localhost)
];

// befor modifaing the value see that its not 1 and if it is retur err 


const modifieSeatValue = (theater: TheaterType): TheaterType => {
    const newTheaterSeatDetails = { ...theater };
    const combinedSeats = { ...theater.mainSeats, ...theater.sideSeats };

    Object.entries(combinedSeats).forEach(([rowName, rowSeats]) => {
        rowSeats.forEach((value, index) => {
            if (value === 2) {
                rowSeats[index] = 1 
            }
        });
    });

    // Assign modified seats back to newTheaterSeatDetails
    return newTheaterSeatDetails;
};


const isValidOrigin = (url: string) => {
    return wighetList.some(pattern => {
        const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
        return regex.test(url);
    });
};


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
    const API_NAME = "Client Update Events (Only PayProvider Invoke)";
    console.log(API_NAME);

    const coneection = await CRUDClientConnection()

    // Extract the request origin or referrer
    const origin = req.headers.origin || req.headers.referer || "";
    
    // Function to match origin against wighetList

    if (!isValidOrigin(origin)) {
         res.status(403).json({ message: "Forbidden: Origin not allowed" });
    }

    if (req.method !== "POST") {
         res.status(405).json({ message: `Method ${req.method} not allowed` });
        } 

     res.setHeader("Allow", ["POST"]);

    if( !coneection ){
        res.status(400).json({massage :` no db connectio  ${API_NAME}, `} )
    }

        const {TheaterState,eventId}  = req.body  // Theater State 

        const newTheater = modifieSeatValue(TheaterState)

        const dbList = await coneection?.db?.admin().listDatabases()

        

        const findEventAndReplce = async (id: string, List: ListDatabasesResult | undefined) : Promise<null | ClientEventType>=> {
            if (!List?.databases) return null;
        
            for (const { name, empty } of List.databases) { 
                if (empty) continue;
        
                const db = coneection?.getClient().db(name); 
                if (!db) continue;
        
                try {
                    const dbCollections = await db.collections();
        
                    for (const collection of dbCollections) {
                        if (!collection.dbName.includes("_Data")) continue;
                        // retrive the Event 
                        const event= await collection.findOne<ClientEventType>({ _id: ObjectId.createFromHexString(id) },{});

                        if (event){
                            console.log( collection.dbName, collection.collectionName)
                             const { info , ...restEvent }= event
                             const { Theater , ...restInfo } = info
                             const newEvent : ClientEventType = {  info:{ Theater: newTheater, ...restInfo }, ...restEvent   }
                          
                            // mutate with new Theater 
                            
                            const  replaceResult =    await collection.findOneAndReplace({_id:ObjectId.createFromHexString(id)},newEvent,{returnDocument:'after'})

                            if(replaceResult){

                            }
                    
                             }// Return the first found event
                    }
                } catch (error) {
                    console.error(`Error searching in ${name}:`, error);
                }
            }
        
            return null; // Return null if no event is found
        };


      const event = await findEventAndReplce(eventId,dbList)

     //   console.log(Cluster)
    
      
    res.status(200).json({ message: "Hello, this is a public API endpoint!" });

    await disconnectFromDb(coneection,API_NAME)

};

// Function to modify theater seat details (currently empty)

