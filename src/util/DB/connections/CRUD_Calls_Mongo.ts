// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion , MongoClientOptions } from "mongodb"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI

const options : MongoClientOptions= {
  ssl : process.env.NODE_ENV === 'development'? undefined :true,
  tls : process.env.NODE_ENV === 'development'? undefined :true,
  
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, // Enforce strict compliance with API version 1
    deprecationErrors: true, // Throw errors for deprecated features
  },
}
 

 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.



export async function CRUDConnection(): Promise<MongoClient | null> {
  let MongoCRUDClient: MongoClient;

  try {
    if (process.env.NODE_ENV === "development") {
      // Use a global variable to preserve the connection in development mode
      const globalWithMongo = global as typeof globalThis & { _mongoClient?: MongoClient };

      if (!globalWithMongo._mongoClient) {
        globalWithMongo._mongoClient = new MongoClient(uri, options);
      }
      MongoCRUDClient = globalWithMongo._mongoClient;
    } else {
      // Create a new client in production mode
      MongoCRUDClient = new MongoClient(uri, options);
    }

    // Attempt to connect to MongoDB
    await MongoCRUDClient.connect();

    // Return the connected client
    return MongoCRUDClient;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);

    // Return null to indicate the connection failed
    return null;
  }
}