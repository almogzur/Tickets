import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";
import { MongoClient, ObjectId } from "mongodb";
import crypto from 'crypto'
import { decryptData } from "./crypto";
import mongoose from "mongoose";
import qs from "qs";
import axios from "axios";
import { UserPayPalInfoType } from "@/types/pages-types/admin/user-biling-info-types";
import { EventModel, IsracardModel, PayPalModel } from "../db/mongosee-models";


export const GetPayPalBillingInfoFromEventId = async (
    eventId: string,
    authKey: string,
    Client: mongoose.Connection | undefined
  ): Promise<UserPayPalInfoType | undefined> => {
    console.log("GetBillingInfoFromEventId invoked", eventId);
    const serverKey = process.env.CIPHER_SECRET;
    if (!serverKey) {
      console.log("GetBillingInfoFromEventId - NO SERVER KEY");
      return;
    }
    const encoder = new TextEncoder();
    const authKeyBuffer = encoder.encode(authKey);
    const serverKeyBuffer = encoder.encode(serverKey);
    const isKeyValid = crypto.timingSafeEqual(authKeyBuffer, serverKeyBuffer);
    if (!eventId) {
      console.log("GetBillingInfoFromEventId - NO EVENT ID");
      return;
    }
    if (!authKey || !isKeyValid) {
      console.log("Unauthorized request: Invalid authKey");
      return;
    }
    if (!Client) {
      console.log("GetBillingInfoFromEventId - NO Client");
      return;
    }
    // Retrieve the list of databases and filter to find user-specific databases
    const cluster = (await Client.listDatabases()).databases;
    const userDataFolderPath = process.env.USER_DATA_FOLDER_PATH;
    const usersDbs = cluster.filter((db) =>
      db.name.includes(`${userDataFolderPath}`)
    );
    // Iterate through each database sequentially. Stop early once billing info is found.
    for (const db of usersDbs) {

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const userDb = Client.useDb(db.name);

      const eventModel = EventModel(userDb);

      const event = await eventModel.findOne<ClientEventType>({
        _id:  ObjectId.createFromHexString(eventId)
      });


      if (!event) continue; // Skip if event is not found in this database


      const payPalModel = PayPalModel(userDb);

      const billingInfoData = await payPalModel.findOne().lean();

      if (billingInfoData) {
        const { clientSecret, ...restBillingInfoData } = billingInfoData;
        const decryptedSecret = decryptData(clientSecret, serverKey);
        
        // Return the billing info immediately if the corresponding event is found

        // eslint-disable-next-line react-hooks/rules-of-hooks
        Client.useDb(''); // Reset to global context if needed

       console.log("GetBillingInfoFromEventId - " ,true);

        return { ...restBillingInfoData, clientSecret: decryptedSecret };
      }
    }
    // Reset the database context to global if needed
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Client.useDb(''); // Reset to global context if needed

    console.log("GetBillingInfoFromEventId - No billing info found.");
    return undefined;
};

export const  GetIsracardBillingInfoFromEventId = async (
  eventId: string,
  authKey: string,
  Client: mongoose.Connection | undefined
)=>{

  const serverKey = `${process.env.CIPHER_SECRET}`

  const encoder = new TextEncoder();
  const authKeyBuffer = encoder.encode(authKey);
  const serverKeyBuffer = encoder.encode(serverKey);
  const isKeyValid = crypto.timingSafeEqual(authKeyBuffer, serverKeyBuffer);

  if (!eventId) {
    console.log("GetIsracardBillingInfoFromEventId - NO EVENT ID");
    return;
  }

  if (!authKey || !isKeyValid) {
    console.log("GetIsracardBillingInfoFromEventId","Unauthorized request: Invalid authKey");
    return;
  }

  if (!Client) {
    console.log("GetIsracardBillingInfoFromEventId - NO Client");
    return;
  }

  const cluster = (await Client.listDatabases()).databases;
  const userDataFolderPath = process.env.USER_DATA_FOLDER_PATH;
  const usersDbs = cluster.filter((db) =>
    db.name.includes(`${userDataFolderPath}`)
  );


  for (const db of usersDbs) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userDb = Client.useDb(db.name);

    const eventModel = EventModel(userDb);

    const event = await eventModel.findOne<ClientEventType>({
      _id:  ObjectId.createFromHexString(eventId)
    });


    if (!event) continue; // Skip if event is not found in this database


    const Model = IsracardModel(userDb);

    const billingInfoData = await Model.findOne().lean();

    if (billingInfoData) {
      
      const { apiKey, ...restBillingInfoData } = billingInfoData;

      const decryptedSecret = decryptData(apiKey, serverKey);
      
      // Return the billing info immediately if the corresponding event is found

      // eslint-disable-next-line react-hooks/rules-of-hooks
      Client.useDb(''); // Reset to global context if needed

     console.log("GetIsracardBillingInfoFromEventId - " ,true);

      return { ...restBillingInfoData, apiKey: decryptedSecret };
    }

    console.log("GetIsracardBillingInfoFromEventId - " ,false);

  }

}


export const PayPalAccessToken = async (userInfo: UserPayPalInfoType): Promise<string | undefined> => {
    const apiLink = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
    const auth = Buffer.from(`${userInfo.clientId}:${userInfo.clientSecret}`).toString("base64");
    try {
        const response = await axios.post(apiLink,
            qs.stringify({ grant_type: "client_credentials" }), // Convert body to form-url-encoded
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        const token: string = response.data.access_token;
        return token;
    } catch (error :any) {
        if (error.response) {
            // Log the detailed error response from PayPal
            console.error("Error getting access token:", error.response.data);
        } 
        return undefined; // Explicitly return undefined on error
    }
};

//  https://developers.cloudflare.com/workers/examples/protect-against-timing-attacks/



