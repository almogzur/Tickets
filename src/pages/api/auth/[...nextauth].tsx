import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import client from '@/lib/DB/CRUD_Calls_Mongo'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { z } from 'zod'
import { MongoClient } from "mongodb"

const SingInValidationSchema = z.object({
  name:z.string(),
  password:z.string(),
  role: z.union([z.literal("admin"),z.literal("user"),z.literal("")])
})

export type singInUserType = z.infer<typeof SingInValidationSchema>



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

      credentials:  { 
        name:{ label:"name" , type:"text"},
        password: { label: "password", type: "password" },
        role: {label:"role", type:"text",} 
      },


      async authorize(credential, req) {
        console.log("Authorize -- invoked");

        const FormValidation = SingInValidationSchema.safeParse(credential)

        if(FormValidation.error?.issues.length){
           console.log(FormValidation.error.issues);
          
              return null 
        }
        
       const conectionStatus : MongoClient = await client.connect()

          if(!conectionStatus){
            console.log("No Conection");
            
           return null
     }


      const DbName = credential?.role === 'admin' ? "Admins" : "Users" 
      
       const database = client.db(DbName); 
       const collection = database.collection("Active"); // Replace 'yourCollectionName' with the collection name you want to target

        // Add logic here to look up the user from the credentials supplied

          let DbUser  = await collection.findOne({ "name"  : credential?.name })
           
          if(!DbUser){ 
            console.log("auth return null from find user",DbUser);  
            return null 
          }          

         if(credential?.password === DbUser.password){

            const user = { id:DbUser._id.toString(), name:DbUser.name  }
           // console.log("auth return user session ", user);
            
            return user
           }

           console.log("auth return bad cerdential" , );
           client.close()
          
           
          return null  
          
      }
    })
  ],
  
  callbacks: { 
    // invoke after provider return  
    
    async signIn( user: any, ) {
      console.log( user);
      
      
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
// in production set seesstion 2 hours for a re loge
//session:{
//
 // maxAge: 2 * 60 * 60
//}

  
}
export default NextAuth(authOptions)