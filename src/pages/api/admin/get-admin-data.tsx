import { CreateConectionFronSesttion } from "@/lib/DB/Mongosee_Connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { FindOptions } from "mongodb";


 // findOne(filter: Filter<TSchema>, options: FindOptions): Promise<WithId<TSchema> | null>;



 
export default async function handler(req: NextApiRequest,res: NextApiResponse<unknown>) {

  const API_NAME = "GET ADMIN DATA";
  console.log(API_NAME);
  
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

 const connection = await CreateConectionFronSesttion(session)

  if(!connection.connection.db){
    console.log("no db");
    res.status(4001).json({ message: "no db" });

  }

  const quary = req.query
  console.log(quary)

  const DBCollectionsArray = await connection.connection.db?.collections()

  const UserCollectionsPromises =  DBCollectionsArray?.filter( (collection) => collection.dbName !== quary.name ) || []
  

  const RsolveCollection  = await Promise.all(
    UserCollectionsPromises?.map(async (data,i) => {
        const res = await data.find().toArray();
        const name =  data.collectionName
      return {name:name, res };
    }) 
  );
  
  console.log(RsolveCollection);

  if(RsolveCollection.length){
     res.status(200).send(RsolveCollection)
  }
  
        
      

  
      

  

}