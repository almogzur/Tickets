// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion , MongoClientOptions } from "mongodb"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options : MongoClientOptions= {
  ssl:process.env.NODE_ENV === 'production' ? true : false,
  tls:process.env.NODE_ENV === 'production' ? true : false,
  
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true, // Enforce strict compliance with API version 1
    deprecationErrors: true, // Throw errors for deprecated features
  },
}
 
let client: MongoClient
 
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client