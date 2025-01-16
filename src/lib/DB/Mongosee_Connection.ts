import mongoose from 'mongoose';
import { Session } from 'next-auth';



 export const CreateDynamicConnection = async (session?: Session) :Promise<typeof mongoose> => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName:`${session?.user?.name ||undefined}`,
      tls: true,
      ssl: true,
    });
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};



export async function disconnectFromDb(): Promise<void> {
  try {
    if (mongoose.connection.db){
  
      mongoose.connection.close()
      console.log("Disconnected from the database successfully.");
    }
  } catch (error) {
    console.error("Error while disconnecting from the database:", error);
    console.log(error);
      
  }
}



