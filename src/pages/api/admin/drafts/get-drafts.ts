import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import  { userDataPrefix , CreateMongooseClient } from "@/util/db/mongoose-connect";
import { DraftModel } from "@/util/db/mongoose-models";

 // findOne(filter: Filter<TSchema>, options: FindOptions): Promise<WithId<TSchema> | null>;


export default async function handler(req: NextApiRequest,res: NextApiResponse) {

  const API_NAME = "Admin Get All Drafts Api (Hook)";
  console.log(API_NAME);
  
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!session?.user.name) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ massage: 'You Shell Not Pass' });
  }

  const connection  = await CreateMongooseClient( session.user.name + userDataPrefix)

  if(!connection){ 
    return res.status(500).json({err:'No DB Connection'})
   }

      // calling the Model Only on Api call preventing un wanted folder saves 

   try{ 
       const  model = DraftModel(connection)

       const Drafts  = await model.find({},{},{lean:true})
       console.log(API_NAME,"successes")

       return   res.send(Drafts)
      }
    catch (err){
        return    res.status(500).json({massage:`  failed ${err} ${API_NAME} `})
       }
     
}