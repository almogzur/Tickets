// File: pages/api/public.ts

import { TheaterType } from "@/components/admin/newEvent/theater/types/theater-types";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler  ( req: NextApiRequest , res: NextApiResponse ):Promise<any>{

 const API_NAME =  "Client Update Events"
    if (req.method === 'POST') {
    res.status(200).json({ message: 'Hello, this is a public API endpoint!' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${'$'}{req.method} not allowed` });

  }


console.log(API_NAME)


}


const modifiedSeatValue = (theater:TheaterType) => {
    
  let newTheaterSeatDetails = {...theater};
  

  for(let key in newTheaterSeatDetails) {

  }


}