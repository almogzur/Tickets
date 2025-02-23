import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import {  DraftModle } from "@/util/dbs/schma/modles"
import { ObjectId } from "mongodb";
import { z } from "zod";
import  {CreateMongooseClient, userDataPrefix } from "@/util/dbs/mongosee-fn";



export default async function handler(req: NextApiRequest,res: NextApiResponse) {

  const API_NAME = "Drafts Remove Api (Click)";
  console.log(API_NAME);
  
  const session = await getServerSession(req, res, authOptions);


  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.log(`Method ${req.method} Not Allowed`);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (!session?.user.name) {
    console.log(API_NAME, 'You Shell Not Pass');
    return res.status(401).json({ massage: 'You Shell Not Pass' });
  }

  const connection  = await CreateMongooseClient(session.user.name+ userDataPrefix)


 if(!connection){
      console.log("no db");
      return res.status(500).json({massage:" No DB Connection"})
    }

    const body = req.body

    const isValidData = z.object({
      id:z.string().min(10),
    }).safeParse(body)

  if ( ! isValidData.success ||   !ObjectId.isValid(isValidData.data?.id)) {
    return res.status(400).json({ error: "Invalid Data format" });
}


const Modle = DraftModle(connection)

      const Drafts  = await Modle.findOneAndDelete({_id:isValidData.data.id})

       if(!Drafts){

        return  res.status(204).json({massage:`No Draft Removed`})

       }

      
    return    res.status(200).json({massage:`Draft ${Drafts._id} Removed`})


    
  
}