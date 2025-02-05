import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { Session } from 'next-auth';



// add public adccsess ip for domain

 export const ModleDbNamedConnction = async (session: Session) :Promise<mongoose.Connection|undefined> => {
  
    if( !session || !session.user?.name ){
      return undefined
    }

    try {    
       const connection = await mongoose.connect(process.env.MONGODB_URI as string, 
         {
         dbName:`${session.user.name}_Data`,
         ssl : process.env.NODE_ENV === 'development'? undefined :true,
         tls : process.env.NODE_ENV === 'development'? undefined :true
         });
         if(connection.connection.db){
          return connection.connection
         }
         return undefined

     } 
    catch (error) {
    console.error('Error connecting to the database:', error);
    return undefined
    
  }
};

export const ModleAuthUsersConncectin = async () :Promise<mongoose.Connection|undefined> => {
  try {    
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, 
      {
      dbName:"Auth",
      ssl : process.env.NODE_ENV === 'development'? undefined :true,
      tls : process.env.NODE_ENV === 'development'? undefined :true
      });
      if(connection.connection.db){
       return connection.connection
      }

  } 
 catch (error) {
 console.error('Error connecting to the database:', error);
 return undefined
 
}
}

 export const CRUDClientConnection = async():Promise<mongoose.Connection|undefined>=>{

   try{ 
     const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
      ssl : process.env.NODE_ENV === 'development'? undefined :true,
      tls : process.env.NODE_ENV === 'development'? undefined :true
     });
        if(connection.connection.db){
          return connection.connection
        }
        return undefined

      
    }
   catch (err){ 
      console.log("ClientConnection:","No DB", err);
      return undefined

    }

 }

export async function disconnectFromDb(
    connection:mongoose.Connection|MongoClient|undefined,
    API_NAME?:string,
  )
    : Promise<void> {

  if( connection?.db ){
      connection.close()
   console.log(API_NAME, "db Disconnected")
  }


}



