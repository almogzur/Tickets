import { createDynamicModel, DraftModle } from "@/components/admin/newEvent/types/new-event-db-schema";
import { CreateConectionFronSession, disconnectFromDb } from "@/lib/DB/Mongosee_Connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'


type Message = {
    message:string
  }

export default async function handler(req: NextApiRequest,res: NextApiResponse<Message>) {

  const API_NAME = "Drafts Remove Api (Click)";
  console.log(API_NAME);
  
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!session) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ message: 'You Shell Not Pass' });
  }

 const connection = await CreateConectionFronSession(session)


 if(!connection.connection.db){
  console.log("No Connection re trying...");
  
  const reTryConnection =   await CreateConectionFronSession(session)

  if(!reTryConnection.connection.db){
      console.log("no db");
      res.status(4001).json({ message: "no db" });
  }
}
  const id = req.body.id
  console.log(id);

       const Model = DraftModle
  
       const Drafts  = await Model.findOneAndDelete({_id:id})

       if(Drafts){
         res.status(200).json({message:`Draft ${id} Removed` })
       }
       
       res.status(200).json({message:"No Draft Removed "})
  
      // const TempModel = createDynamicModel<EventMongoseeDraftType>("Drafts",TempNewEventSchema)

     // const Collections  = await TempModel.find({})
  

  //console.log(RsolveCollection);



  disconnectFromDb(connection,API_NAME)
  
}