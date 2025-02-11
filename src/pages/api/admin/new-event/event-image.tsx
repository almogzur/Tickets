import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { v2 as cloudinary } from 'cloudinary';



type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const API_NAME = "DELETE Event Image";
  console.log(`${API_NAME} - Request Received`);

  // Cloudinary Configuration
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary configuration is missing");
    return res.status(500).json({ message: "Server configuration error" });
  }

  cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  // Validate HTTP Method
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    console.warn(`Method ${req.method} Not Allowed`);
    return res.status(401).json({ message: `Method ${req.method} Not Allowed` });
  }


  // Validate User Session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    console.warn(`${API_NAME} - Unauthorized Access`);
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Validate and Sanitize Input
  const Public_id = req.body.Public_id;
  if (
    !Public_id 
    ||
    typeof Public_id !== 'string' 
    ||
      /[<>`"'&\\]/.test(Public_id)  // Prevent dangerous characters
    ) {
    console.warn(`[SECURITY] Invalid Public_id: ${Public_id} from IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
    return res.status(401).json({ message: "Invalid or missing Public_id" });
  }

  try {
    // Cloudinary API Call
    const destroyResult = await cloudinary.uploader.destroy(Public_id);
    if (destroyResult.result !== 'ok') {
      console.error(`${API_NAME} - Failed to Remove Image: ${destroyResult.result}`);
      return res.status(500).json({ message: `Failed to remove image: ${destroyResult.result}` });
    }

    console.log(`${API_NAME} - File Removed Successfully`);
    res.status(200).json({ message: "File removed successfully" });
  } catch (error) {
    console.error(`${API_NAME} - Error Occurred:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
