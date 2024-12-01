import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import client from '@/lib/CRUD_db'
import { MongoDBAdapter } from "@auth/mongodb-adapter"



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      id: "credentials",

      credentials: { 
        id:{ label:"id", type:"text"},
        name:{ label:"name" , type:"text"},
        password: { label: "password", type: "password" },
      },
      async authorize(credential, req) {
        console.log("inv");
        
       await client.connect()
       const database = client.db('Ticket'); // Replace 'yourDatabaseName' with your actual database name
       const collection = database.collection('Admins'); // Replace 'yourCollectionName' with the collection name you want to target

        // Add logic here to look up the user from the credentials supplied

          let DbUser  = await collection.findOne({ "name"  : credential.name })
           
          if(!DbUser){ 
            return null 
          }

           if(credential.password === DbUser.password){
            const user = { id:DbUser._id.toString(), name:DbUser.name  }
            return user
           }

          return null  
      }
    })
  ],

  callbacks: { 
    // invoke after provider return  
    
    async signIn({ user, account, profile,credentials }) {
      
      // returning the user presist it as session 
      if(user){
        return user
      }
      return false
      

    } ,



  },
  pages: {
     signIn: '/auth/signin',
},

  
}
export default NextAuth(authOptions)