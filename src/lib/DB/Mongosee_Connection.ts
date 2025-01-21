import assert from 'assert';
import mongoose from 'mongoose';
import { Session } from 'next-auth';



// add public adccsess ip for domain

 export const CreateConectionFronSession = async (session?: Session) :Promise<typeof mongoose> => {
  
  assert(session , "sesstion assertion ")

  try {
    console.log(process.env.NODE_ENV);
    
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName:`${session?.user?.name}_Data`,
      ssl : process.env.NODE_ENV === 'development'? undefined :true,
      tls : process.env.NODE_ENV === 'development'? undefined :true
    });
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};



export async function disconnectFromDb(con:typeof mongoose): Promise<void> {
  try {
     con.connection.close()
     console.log("disconected from db");
     
  } catch (error) {
    console.error("Error while disconnecting from the database:", error);
  }
}



