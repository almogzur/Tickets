import { UserPayPalInfo } from "@/types/pages-types/admin/user-biling-info-types";
import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";
import { MongoClient, ObjectId } from "mongodb";
import crypto from 'crypto'
import { decryptData } from "./crypto";
import mongoose from "mongoose";
import { AdminEventModle, PayPalModle } from "../dbs/schma/modles";


export const GetBillingInfoFromEventId = async (eventId: string, authKey: string, Client: mongoose.Connection | undefined): Promise<  UserPayPalInfo  | undefined> => {

    console.log("GetBillingInfoFromEventId ", "_ invoked", eventId)

    const ServerKey = `${process.env.CIPHER_SECRET}`

    if (!ServerKey) {
        console.log("GetBillingInfoFromEventId", "NO SERVER KEY")
        return
    }

    const encoder = new TextEncoder();
    const authKeyBuffer = encoder.encode(authKey);
    const serverKeyBuffer = encoder.encode(ServerKey);


    const isKeyValide = crypto.timingSafeEqual(new Uint8Array(authKeyBuffer), new Uint8Array(serverKeyBuffer))
8

    if (!authKey || !isKeyValide) {
        console.log("Unauthorized request: Invalid authKey");
        return;
    }

    if (!Client) {
        console.log("!NO client GetBillingInfoFromEventId")
        return
    }
    const Cluster = (await Client.listDatabases()).databases

    const UsersDbs = Cluster.filter((db) => db.name.includes(`${process.env.USER_DATA_FOLDER_PATH}`))

    const UserDbsResults =
        await Promise.all(
            UsersDbs.map(
                async (db) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const userDb = Client.useDb(db.name)

                    const EModle = AdminEventModle(userDb)

                    const event = await  EModle.findOne<ClientEventType>({ _id: new ObjectId(eventId) });
                       
                    if (!event) { return }// if the event is not in user

                    //console.log("GetBillingInfoFromEventId end " , event )
                    const PModle = PayPalModle(userDb)

                    // now we know the db name and collection 
                    const billingInfoData = await  PModle.findOne()

                    if (billingInfoData) {

                 //       console.log("GetBillingInfoFromEventId end " ,billingInfoData)
                        const { clientSecret, ...restbillingInfoData } = billingInfoData
                        const deCipherSecret = decryptData(clientSecret, ServerKey)

                        const Data = {
                            ...restbillingInfoData,
                            clientSecret: deCipherSecret
                        }

                        //console.log(Data)
                        return Data
                   }}))

     const Info = UserDbsResults.find(( event )=> event )

     console.log("GetBillingInfoFromEventId end " , !!Info )
     
     // eslint-disable-next-line react-hooks/rules-of-hooks
     Client.useDb('') // return to global path 

        return  Info
}




//  https://developers.cloudflare.com/workers/examples/protect-against-timing-attacks/



