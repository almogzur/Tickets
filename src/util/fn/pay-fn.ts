import { UserPayPalInfo } from "@/types/pages-types/biling-types";
import { ClientEventType } from "@/types/pages-types/new-event-types";
import { MongoClient, ObjectId } from "mongodb";
import { unCipherString } from "./crypto";
import { getAllCollectionFromDb, getAllDbListDB, getDb } from "../db/mongo-db/db_fn";
import crypto from 'crypto'


export const GetBillingInfoFromEventId = async (eventId: string, authKey: string): Promise<{ info: UserPayPalInfo } | undefined> => {

    console.log("GetBillingInfoFromEventId ", "_ invoked")
    const ServerKey = `${process.env.CIPHER_SECRET}`

   //  https://developers.cloudflare.com/workers/examples/protect-against-timing-attacks/
const encoder = new TextEncoder();
const authKeyBuffer = encoder.encode(authKey);
const serverKeyBuffer = encoder.encode(ServerKey);

if (!authKey || !crypto.timingSafeEqual(new Uint8Array(authKeyBuffer), new Uint8Array(serverKeyBuffer))) {
    console.log("Unauthorized request: Invalid authKey");
        return;
    }

    const dblist = await getAllDbListDB()

    const Users_Data_DBS = dblist?.filter((db) => db.name.includes("_Data"))

    if (!Users_Data_DBS) return

    for (const { name, empty } of Users_Data_DBS) {
        if (empty) return
        const db = await getDb(name)
        if (!db) return

        const dbCollections = await getAllCollectionFromDb(db)

        for (const collection of dbCollections) { // only _Data DBs

            // filter only User_Data Collections 

            //  in User_Data collection
            // look for eventID  in user Data 

            const event = await collection.findOne<ClientEventType>({ _id: ObjectId.createFromHexString(eventId) })

            if (!event) return // if the event is not in user

            // now we know the db  name and collection 
            const billingInfo = await db.collection("Billing_PayPal").findOne<UserPayPalInfo>();
            //    console.log(billingInfo)

            if (billingInfo) {
                const { clientSecret, ...restbillingInfo } = billingInfo
                const deCipherSecret = unCipherString(clientSecret, ServerKey)
                const Info = {
                    ...restbillingInfo,
                      clientSecret: deCipherSecret
                 }
                return { info: Info }
            }
        }
    }


}