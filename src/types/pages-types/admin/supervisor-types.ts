
import {z} from 'zod'


export const NewUserValidationSchema = z.object({
  name: z.string(),
  password: z.string(),
  displayName:z.string().optional(),
})

export type NewUserType = z.infer<typeof NewUserValidationSchema>



 // const UsersModel = createSchemaAndModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)