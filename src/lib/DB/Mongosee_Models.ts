import mongoose from 'mongoose';
const { Schema } = mongoose;

import {TempDBNewEventSchema, ProductionENewventSchema} from '@/types/admin/new-event/new-event-types'

export const TmepDbEventModle = mongoose.model('TempDBNewEventSchema', TempDBNewEventSchema)
export const EventMongoseeModle = mongoose.model('ProductionENewventSchema', ProductionENewventSchema)

export const connectionToDb =  await  mongoose.connect(process.env.MONGODB_URI as string);

export async function disconnectFromDb(connectionPromise: Promise<typeof mongoose>): Promise<void> {
  try {
    const connection = await connectionPromise;
    if (connection.ConnectionStates.connected ===1 ) {
        connection.disconnect()

      console.log("Disconnected from the database successfully.");
    }
  } catch (error) {
    console.error("Error while disconnecting from the database:", error);
    console.log(error);
      
  }
}



