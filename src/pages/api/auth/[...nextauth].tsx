import NextAuth, { Awaitable, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import client from '@/lib/DB/CRUD_Calls_Mongo'
import { z } from 'zod'
import { MongoClient } from "mongodb"
import { AuthOptions } from "next-auth"

const SingInValidationSchema = z.object({
  name:z.string(),
  password:z.string(),
  role: z.union([z.literal("admin"),z.literal("user"),z.literal("")])
})

export type singInUserType = z.infer<typeof SingInValidationSchema>


const NODE_ENV = process.env.NODE_ENV

export const authOptions :AuthOptions = {
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
      type:"credentials",

      credentials:  { 
        name:{ label:"name" , type:"text"},
        password: { label: "password", type: "password" },
        role: {label:"role", type:"text",} 
      },
      
      async authorize(credential, req) {
        console.log(req.headers);
        
    
      console.log("Authorize -- invoked");

      const FormValidation = SingInValidationSchema.safeParse(credential)

        if(FormValidation.error?.issues.length){
           console.log(FormValidation.error.issues);
          
              return null 
        }
        console.log("validation pass");
        
        
      const conectionStatus : MongoClient = await client.connect()

          if(!conectionStatus){
            console.log("No Conection");
            
           return null
         }

       console.log("conected to db");
       
       const DbName = credential?.role === 'admin' ? "Admins" : "Users" 
       const database = client.db(DbName); 
       const collection = database.collection("Active"); // Replace 'yourCollectionName' with the collection name you want to target

        // Add logic here to look up the user from the credentials supplied

        console.log("looking fot user ");
        
          let DbUser  = await collection.findOne({ "name"  : credential?.name })
           
          if(!DbUser){ 
            console.log("auth return null from find user",DbUser);  
            return null 
          }          

          console.log(DbUser);
          

         if(credential?.password === DbUser.password){

            const user = { id:DbUser._id.toString(), name:DbUser.name  }
           // console.log("auth return user session ", user);
            
            return user
           }

           console.log("auth return bad cerdential" , );
           client.close()
          
           
          return null  
          
      },
      
      
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
     error: "/auth/signin"
},
 useSecureCookies: NODE_ENV === 'production' ? true :false,

 

// in production set seesstion 2 hours for a re loge

//session:{
//
 // maxAge: 2 * 60 * 60
//}



// adapter:{
//   createUser:(user:unknown)=>{},
//   getUser:(id:string):Awaitable<AdapterUser | null>=>{

//     return {
//       id:"",
//       email:"",
//       name:"",
//       emailVerified:null  
//     }
//   }
  

// }





  
}
export default NextAuth(authOptions)