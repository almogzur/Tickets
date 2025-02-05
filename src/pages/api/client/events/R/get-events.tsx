import { ClientEventType } from "@/components/admin/newEvent/types/new-event-types";
import { CRUDConnection } from "@/lib/DB/CRUD_Calls_Mongo";
import { disconnectFromDb } from "@/lib/DB/Mongosee_Connection";

import { NextApiRequest, NextApiResponse } from "next";



const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<ClientEventType[] | undefined | void> => {
  const API_NAME = "Get All Active Drafts (Hook)";

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    console.log(`Method ${req.method} Not Allowed`);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const MongoClient = await CRUDConnection();

  if (!MongoClient) {
    res.status(400).json({ message: "No DB Connection", API_NAME });
    return;
  }

  const Cluster = await MongoClient?.db().admin().listDatabases();

  const ClusterUsersDBLIst = Cluster?.databases.filter((db, i) => db.name.includes("_Data"));

  const getUserCollections = async (dbName: string)=> {
    try {
      const UserDB = MongoClient?.db(dbName);
      const collections = await UserDB?.collections();
  
      if (!collections) {
        throw new Error(`No collections found in database ${dbName}`);
      }
  
      const data = await Promise.all(
        collections.map(async (collection) => {
          const documents = await collection.find({}).toArray();
          return documents; // Returns WithId<Document>[]
        })
      );
  
      return data.flat(); // Flatten the array of arrays into a single array of documents
    } catch (error) {
      console.error(`Error fetching collections for db ${dbName}:`, error);
      return null;
    }
  };
   
  const UsersEventsRow = await Promise.all(
      ClusterUsersDBLIst.map(
          async (Db)=>{
            const items =  await getUserCollections(Db.name)
           return items
        
      })
    )

    const Events = UsersEventsRow
      .filter((UserDraftCollection) => Array.isArray(UserDraftCollection) && UserDraftCollection.length > 0)
      .flat();

      if(!Events){
        res.status(400).json({massage:"No Events"})
        console.log(API_NAME,"Failed");

      }
      

      console.log(API_NAME,"Sucsses");
      
  res.status(200).send(Events );
    await disconnectFromDb(MongoClient,API_NAME) 
  
};

export default handler;
