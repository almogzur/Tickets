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


    // minPoolSize - The minimum number of sockets the MongoDB driver will keep open for this connection. The MongoDB driver may close sockets that have been inactive for some time. You may want to increase minPoolSize if
    //  you expect your app to go through long idle times and want to make sure your sockets stay open to avoid slow trains when activity picks up.
    minPoolSize:2,
    
    
    // bufferCommands - This is a mongoose-specific option (not passed to the MongoDB driver) that disables Mongoose's buffering mechanism

    bufferTimeoutMS: 3000 ,



    // To get faster feedback on failed connections, 
    // you can reduce serverSelectionTimeoutMS to 5000 as follows.
    //  We don't recommend reducing serverSelectionTimeoutMS unless you are running a standalone MongoDB
    //  server rather than a replica set, or unless you are using a serverless runtime like AWS Lambda.
    serverSelectionTimeoutMS:5000,

   
    

  
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
