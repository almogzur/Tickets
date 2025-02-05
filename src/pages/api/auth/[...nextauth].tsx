import NextAuth, { Account, Awaitable, DefaultSession, Profile, Session, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from 'zod'
import { AuthOptions } from "next-auth"
import { CRUDConnection } from "@/lib/DB/CRUD_Calls_Mongo"
import bcrypt from 'bcryptjs'

import jwt from 'jsonwebtoken'
import { NewUserSchemaDefinition, NewUserType, NewUserValidationShema, } from "@/lib/supervisor_types"
import { disconnectFromDb, ModleAuthUsersConncectin } from "@/lib/DB/Mongosee_Connection"
import { createModel } from "@/components/admin/newEvent/types/new-event-db-schema"


// Exdenting the type using -  module Augmentation
// to enclude extra filde in the session || && the User we need to add the fild to the type struc 
declare module "next-auth" {
  interface Session {
    key:string
    user: {
      displayName?: string | null | undefined;
      id:string

    } & DefaultSession["user"];
  }
  interface User {
    displayName?: string | null | undefined;
    id:string

  }
}
// validate input  values  at run time 

export type  inferedType  = z.infer<typeof NewUserValidationShema>

// check evn
const NODE_ENV = process.env.NODE_ENV
const secret = process.env.JWT_SECRET;


export const authOptions: AuthOptions = {


  providers: [
    CredentialsProvider({

      name: "Credentials",
      id: "credentials",
      type: "credentials",

    

      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },


      async authorize(credential, req) {


        if (!secret || !credential?.password) {

          throw new Error("JWT_SECRET is not defined in environment variables");
        }

         const FormValidation = NewUserValidationShema.safeParse(credential)
        
        if(!FormValidation){
          console.log(" Not Pass  FormValidation")

          return null
        }

        const Client = await ModleAuthUsersConncectin()


        if (!Client) {
          console.log("No connection")
          return null
        }


        const UsersModle =  createModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)

        const user = await UsersModle.findOne({ name: credential.name},{},{lean:true})

        

        if (!user) {
          console.log("User not found")
          await disconnectFromDb(Client,"AuthF")
          return null
        }

        console.log("auth got user ",user);
        
        const tokenPayload = { id: user.name  };
        const accessToken = jwt.sign(tokenPayload, secret, { expiresIn: "1h" });

        const isPasswordValid  = await bcrypt.compare(credential.password, user.password);
          

         if ( isPasswordValid) {

           console.log("Pass Password hasing ");
           
            const ReturnUser: User = {
               ...user,
               displayName: user.displayName,
               id: user._id.toString()
          }
          await disconnectFromDb(Client,"AuthF")

          return {
            ...ReturnUser,
             accessToken
          }
        }

        console.log("Invalid credentials")
        await disconnectFromDb(Client,"AuthF")
        return null
      }


    })
  ],
  callbacks: {
  
    
   // When using the Credentials Provider the user object is 
   // the response returned from the authorize callback and the profile object is 
   // the raw body of the HTTP POST submission.
  
   async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn_CallBack ");

      if (user) {
        //User is saved in the JWT token 
        return true
      }
      return false
    },

    //The redirect callback is called anytime 
    // the user is redirected to a callback URL (e.g. on signin or signout).
    //By default only URLs on the same URL as the site are allowed
    // , you can use the redirect callback to customise that behaviour.
    //The default redirect callback looks like this:

    async redirect({ url, baseUrl }) {
      return baseUrl
    },

    // sing In Pass data to JWT Token 
    //This callback is called whenever a JSON Web 
    // Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
    //  The returned value will be encrypted, and it is stored in a cookie.

    async jwt({ token, user, account, profile, }) {
          //  token, user, account, ans  profile passed from singIn callback

      if (user) {
        token.displayName = user.displayName // Add displayName to the token, or null if not available
      }
      return token
    },
    //  the Session Validate On JWT Token 
    async session({ session, token , user }) {

          //  If you want to make something available you added to 
          // the token (like access_token and user.id from above) via the jwt() callback,
          //  you have to explicitly forward it here to make it available to the client.


          //When using JSON Web Tokens and not Db for sessions,
          //  the JWT payload (token) is provided instead of user .
    
         // Danger !!!
         //If using JSON Web Tokens instead of database sessions,
         //  you should use the User ID or a unique key stored in the
         // token (you will need to generate a key for this yourself on sign in,
         // as access tokens for sessions are not generated when using JSON Web Tokens).

  


      // Adds the displayName from the token to the session

      if (token?.displayName) {
        
        session.user.displayName = token.displayName as string;
      }  
      return session; // Return the updated session
    }

  },

  pages: {
    signIn: '/auth/signin',
    error: "/auth/signin"
  },
  useSecureCookies: NODE_ENV === 'production' ? true : false,
}

export default NextAuth(authOptions)
