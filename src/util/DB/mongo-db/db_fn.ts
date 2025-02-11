import { Db, ListDatabasesResult,MongoClient } from "mongodb";
import { Mongo } from '@/util/DB/mongo-db/mongo'


const Client = await Mongo()




export const getAllDbListDB = async  ( )=>{
   const list =  (await Client?.db().admin().listDatabases())?.databases
   return   list
}

export const getDb =   async (name:string) : Promise<Db | undefined>  =>{
   const db =  Client?.db(name)
  return db
}

export const getAllCollectionFromDb = async ( dbref:Db )=>{
   
   const Collections = await  dbref.collections({})

   return  Collections
}

export const getCollection = async ( collectionName:string ,db:Db, User_id ?:string )=>{}

export const Custome_Find  = ( filed?:string|number|object , filterObject?:object,   ) =>{
// if no filed || no filte run find all 
}

export const disconnectFromMongoDb = ( connection:MongoClient, API_NAME:string )=>{
   console.log("DC from  " + connection.db().databaseName , API_NAME)
   connection.close()
}


