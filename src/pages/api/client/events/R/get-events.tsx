import { CRUDConnection } from "@/lib/DB/CRUD_Calls_Mongo";
import { NextApiRequest, NextApiResponse } from "next";


type GetApiReturnType = {
  massage?:""
}


const handler = async (req: NextApiRequest,res: NextApiResponse):Promise<GetApiReturnType|void|undefined>=> {

  const API_NAME = "Get All Active Drafts (Hook) " // To be Events 
  //console.log(API_NAME );

    
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  const MongoClient  = await CRUDConnection()

  if(!MongoClient){
      res.status(400).json({masssage:"No DB Conecction", API_NAME})
  }

  const Cluster = await MongoClient?.db().admin().listDatabases();

  const UsersDBLIst = Cluster?.databases.filter((db,i)=>  db.name.includes("_Data")    )

  const GetAllUsersEventsCollections = async () => {
        if (!UsersDBLIst) return;
            // Use Promise.all to wait for all database operations
          const data = await Promise.all(
                UsersDBLIst.map( // array  of Promise
                    async (listItem) => { // for every  promise
                    const dbName = listItem.name;
                    try {
                        const UserDB = MongoClient?.db(dbName);
                        const UserCollections = await UserDB?.listCollections().toArray();
                          if (UserCollections) { 
                              // Use Promise.all for nested collection operations
                              const collectionResults = await Promise.all(
                                 UserCollections.map(
                                    async (UserCollection) => {
                                          const collectionName = UserCollection.name;
                                          const collectionData = UserDB?.collection(collectionName);
                                          const documents = await collectionData?.find({}).toArray();
                                            return {
                                              dbName,
                                              collectionName,
                                              documents
                                          };
                                     })
                               );
                              return collectionResults;
                              }
                          } 
                    catch (error) {
            console.error("Error accessing database:", error);
            return null;
                           }
      })
      );

      
    // Filter out null results and flatten the array
    return data.filter(Boolean).flat();
  };

 const EventsColections = await  GetAllUsersEventsCollections()

 const filteredData =   EventsColections?.filter((collection) => {
  return (
    collection?.collectionName === 'Drafts' &&
    Array.isArray(collection?.documents) &&
    collection.documents.length > 0
  );
})

  const mutetateData = filteredData?.map((collection) => ({
    docs: collection?.documents,
  }));


    if(!mutetateData){
        res.status(401).json({massage:"No Data "})
        console.log("Faile", API_NAME);


    }
    console.log("Sucsess", API_NAME);

    res.status(200).send(mutetateData)

 // console.log(mutetateData);


   
 //console.log( await GetAllUsersEventsCollections());

  }



export default handler