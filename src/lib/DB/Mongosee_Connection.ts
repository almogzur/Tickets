import mongoose from 'mongoose';


export const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
  dbName: 'Ticket',
  tls: true,
  ssl: true,
});

export async function disconnectFromDb(): Promise<void> {
  try {
    if (connection.connection.db){
    
      mongoose.connection.close()
      console.log("Disconnected from the database successfully.");
    }
  } catch (error) {
    console.error("Error while disconnecting from the database:", error);
    console.log(error);
      
  }
}



