import { createModel } from '@/components/admin/newEvent/types/new-event-db-schema';
import { Schema } from 'mongoose'
import {z} from 'zod'

export const NewUserValidationShema = z.object({
  name: z.string(),
  password: z.string(),
  displayName:z.string().optional(),
})

export type NewUserType = z.infer<typeof NewUserValidationShema>

export const NewUserSchemaDefinition = {
  name: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  displayName:{type:String , required: true}
};


export const UsersModle =  createModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)


 // const UsersModle = createSchmaAndModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)