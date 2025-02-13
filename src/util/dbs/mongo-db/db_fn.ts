import { Collection, Db, ListCollectionsOptions, ListDatabasesResult,MongoClient } from "mongodb";




export const getAllDbList = async  (c:MongoClient | null )=>{
      const   alldbjson =   await c?.db().admin().listDatabases()
      const list = alldbjson?.databases
       return   list
   
}

export const getDb =   async (name:string ,c:MongoClient | null , filterDbName?:string  ) : Promise<Db | undefined>  =>{
   let db ;
     if(! filterDbName) {// no filter applied just return db with the name arg 
         db = c?.db(name)
     }
      
     if(filterDbName &&  name.includes(filterDbName) ){ 
            // only return the in string name filter string name in the Name string 
            db=c?.db(name)
      }
  return db
}

export const getCollectionsFromDb = async (db:Db, filterCollectionName?:string   ) :Promise<Collection[]>  => {
     
     let Collections:Collection[]  =  await db?.collections()
     if(!filterCollectionName) 
      return Collections    
      return Collections.filter((collection) => collection.collectionName.includes(filterCollectionName));
}

export const Custome_Find  = ( filed?:string|number|object , filterObject?:object,   ) =>{
// if no filed || no filte run find all 
}

export const disconnectFromMongoDb = ( connection:MongoClient, API_NAME:string )=>{
   console.log("DC from  " + connection.db().databaseName , API_NAME)
   connection.close()
}


