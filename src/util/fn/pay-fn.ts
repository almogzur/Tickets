import { UserPayPalInfo } from "@/types/pages-types/admin/user-biling-info-types";
import { ClientEventType } from "@/types/pages-types/admin/new-event-types";
import { MongoClient, ObjectId } from "mongodb";
import { getCollectionsFromDb, getAllDbList, getDb } from "../dbs/mongo-db/db_fn";
import crypto from 'crypto'
import { decryptData } from "./crypto";


export const GetBillingInfoFromEventId = async (eventId: string, authKey: string, Client: MongoClient | null): Promise<{ info: UserPayPalInfo } | undefined> => {

    //console.log("GetBillingInfoFromEventId ", "_ invoked", eventId)

    const ServerKey =`${ process.env.CIPHER_SECRET }`

    
    if(!ServerKey){
        console.log("GetBillingInfoFromEventId", "NO SERVER KEY")
        return

    }


    const encoder = new TextEncoder();
    const authKeyBuffer = encoder.encode(authKey);
    const serverKeyBuffer = encoder.encode(ServerKey);

    const isKeyValide = crypto.timingSafeEqual(new Uint8Array(authKeyBuffer), new Uint8Array(serverKeyBuffer))


    if (!authKey || !isKeyValide) {
        console.log("Unauthorized request: Invalid authKey");
        return;
    }

    if (!Client) {
        console.log("!NO client GetBillingInfoFromEventId")
        return
    }
    const dbList = await getAllDbList(Client)

    if (!dbList) {
        console.log("!GetBillingInfoFromEventId ", "@dbList")
        return
    }

    for (const { name, empty } of dbList) {
        if (empty) {continue}
            const db = await getDb(name, Client, `${process.env.USER_DATA_FOLDER_PATH}`) // with filted build in 
        if (!db) { continue }
        const UserCollections = await getCollectionsFromDb(db, `${process.env.USER_EVENTS_FOLDER_PATH}`)  // with filted build in  

        for (const collection of UserCollections) { // only _Data DBs

                // filter only User_Data Collections 
                //  in User_Data collection
                // look for eventID  in user Data 
            const event = await collection.findOne<ClientEventType>({ _id: ObjectId.createFromHexString(eventId) })


             if (!event) {continue }// if the event is not in user

              // now we know the db name and collection 
             const billingInfo = await db.collection(`${process.env.BILING_FOLDER_NAME}`).findOne<UserPayPalInfo>();
           
              if (billingInfo) {
                const { clientSecret, ...restbillingInfo } = billingInfo
                const deCipherSecret = decryptData(clientSecret, ServerKey)
            
                const Info = {
                    ...restbillingInfo,
                    clientSecret: deCipherSecret
                }
              //  console.log("GetBillingInfoFromEventId Succsess")
                return { info: Info }
            }
        }
    }






    //  https://developers.cloudflare.com/workers/examples/protect-against-timing-attacks/


}
