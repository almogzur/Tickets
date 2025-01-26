import mongoose from 'mongoose';
import { Session } from 'next-auth';



// add public adccsess ip for domain

 export const ModleDbNamedConnction = async (session: Session) :Promise<boolean|null|undefined> => {
  
    if( !session || !session.user?.name ){
      return null
    }

    try {    
       const connection = await mongoose.connect(process.env.MONGODB_URI as string, 
         {
         dbName:`${session.user.name}_Data`,
         ssl : process.env.NODE_ENV === 'development'? undefined :true,
         tls : process.env.NODE_ENV === 'development'? undefined :true
         });
         if(connection.connection.db){
          return true
         }

     } 
    catch (error) {
    console.error('Error connecting to the database:', error);
    return false
    
  }
};

export const ModleAuthUsersConncectin = async () :Promise<boolean|null|undefined> => {
  try {    
    const connection = await mongoose.connect(process.env.MONGODB_URI as string, 
      {
      dbName:"Auth",
      ssl : process.env.NODE_ENV === 'development'? undefined :true,
      tls : process.env.NODE_ENV === 'development'? undefined :true
      });
      if(connection.connection.db){
       return true
      }

  } 
 catch (error) {
 console.error('Error connecting to the database:', error);
 return false
 
}
}

 export const CRUDClientConnection = async():Promise<boolean|undefined>=>{

   try{ 
     const connection = await mongoose.connect(process.env.MONGODB_URI as string, {
      ssl : process.env.NODE_ENV === 'development'? undefined :true,
      tls : process.env.NODE_ENV === 'development'? undefined :true
     });
        if(connection.connection.db){
          return true
        }
       
     
    }
   catch (err){ 
      console.log("ClientConnection:","No DB", err);
      return false
    }

 }

export async function disconnectFromDb(connectionStatus:boolean|undefined|null,API_NAME?:string): Promise<void> {
  if(!connectionStatus){
    console.log("disconnectFromDb","No Connection");
    return 
  }
  try {
    mongoose.connections.map( 
        async (connection,i)=>{
          try{
            connection.close()
            console.log("DB _ Disconected : ",  API_NAME);

            }
          catch (err){ 
            console.error("Error while disconnecting from the database:", err);        
           }
          
    })
   
  } catch (error) {
    console.error("Error while disconnecting from the database:", error);
  }
}



