import { ModleDbNamedConnction, disconnectFromDb } from "@/util/DB/connections/Mongosee_Connection";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  DraftModle } from "@/util/DB/Schmas/event";


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

  const isConnected  = await ModleDbNamedConnction(session)


 if(!isConnected){
  console.log("No Connection re trying...");
  

      console.log("no db");
      res.status(4001).json({ message: "no db" });
}
  const id = req.body.id
  console.log(id);


      // calling the Molde Only on Api call prevanting un wanted folder saves 

  
  
       const Drafts  = await DraftModle.findOneAndDelete({_id:id})

       if(!Drafts){
        res.status(401).json({message:`No Draft Removed`})

       }
       res.status(200).json({message:`Draft ${id} Removed`})


       

   await disconnectFromDb(isConnected,API_NAME) 
  res.status(200).json({message:"No Draft Removed "})
  
}