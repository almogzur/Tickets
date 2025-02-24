import { MongoClient } from 'mongodb';
import mongoose, { Connection, } from 'mongoose';
import { Session } from 'next-auth';



// add public adccsess ip for domain



// List of predefined MongoDB ports



const Clients: Record<string, Connection> = {

}; // Store multiple connections


  export  const CreateMongooseClient = async (dbName: string | null): Promise<Connection | undefined> => {

  
  const ClientsLength = Object.keys(Clients).length

  console.log(ClientsLength)
  
  const uri = `${process.env.MONGODB_URI}`

  const databaseKey = dbName || ''; // Use global DB if no name is provided

  const CliebtOptions = {
    dbName:databaseKey,
    retryWrites:true,
    retryReads:true ,
    
    // This is a mongoose-specific option 
    // (not passed to the MongoDB driver) that disables Mongoose's
    //  buffering mechanism

    // bufferCommands:false ,
  
  }

  if (!uri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    return undefined;
  }


  // Check if an existing connection is open
  if (Clients[databaseKey]) {
    console.log(`Reusing existing connection to ${databaseKey}`);
    return Clients[databaseKey];
  }

  console.log(`Creating new connection to ${databaseKey}...`);

  try {
    const newConnection = mongoose.createConnection(uri,CliebtOptions );

    Clients[databaseKey] = newConnection;
    console.log(`Connected to ${databaseKey}`);

    return newConnection;
  } catch (error) {
    console.error(`Error connecting to ${databaseKey}:`, error);
    return undefined;
  }
};

// init connection 




export const  dcMongoose = async ( connection:mongoose.Connection|undefined,API_NAME?:string,)
: Promise<void> => {
  if( connection?.db ){
  //     await connection.close()
   console.log( API_NAME?? '', "db Disconnected")
  }
}

export const userDataPrefix  = `${process.env.USER_DATA_FOLDER_PATH}`
export const UserPrefix = `${process.env.AUTH}`
