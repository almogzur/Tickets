import { Schema } from 'mongoose'
import {z} from 'zod'

export const NewUserValidationShema = z.object({
  name: z.string(),
  password: z.string(),
  displayName:z.string().optional(),
})

export type NewUserType = z.infer<typeof NewUserValidationShema>

export const NewUserSchemaDefinition: Record<keyof NewUserType, any> = {
  name: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  displayName:{type:String , required: true}

};


 // const UsersModle = createSchmaAndModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)