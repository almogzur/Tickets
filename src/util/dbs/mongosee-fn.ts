import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { Session } from 'next-auth';



// add public adccsess ip for domain

 export const MongoseeWithSessionModleDb = async (session: Session|null) :Promise<mongoose.Connection|undefined> => {
  
    if( !session || !session.user?.name ){
      throw new Error("im not gona to connect with no session")
      
    }

    try {    
      const connection = await mongoose.connect(process.env.MONGODB_URI as string, 
         {
         dbName:`${session.user.name}${process.env.USER_DATA_FOLDER_PATH}`,
         maxPoolSize:10,
        //  ssl : process.env.NODE_ENV === 'development'? undefined :true,
        //  tls : process.env.NODE_ENV === 'development'? undefined :true
         })
         if(connection.connection.db ){
          return connection.connection
         }
         return undefined

     } 
    catch (error) {
    console.error('Error connecting to the database:', error);
    return undefined
    
  }
};

export const MongoseeAuthUsersDb = async () :Promise<mongoose.Connection|undefined> => {
  try {    
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, 
      {
      dbName:`${process.env.APP_AUTH_LOC}`,
      ssl : process.env.NODE_ENV === 'development'? undefined :true,
      tls : process.env.NODE_ENV === 'development'? undefined :true,
      maxPoolSize:10,

      })
      if(connection.connection.db ){
       return connection.connection
      }

  } 
 catch (error) {
 console.error('Error connecting to the database:', error);
 return undefined
 
}
}

export const  disconnectFromMongooseDb = async ( connection:mongoose.Connection|MongoClient|undefined,API_NAME?:string,)
: Promise<void> => {
  if( connection?.db ){
       await connection.close()
   console.log( API_NAME?? '', "db Disconnected")
  }
}



