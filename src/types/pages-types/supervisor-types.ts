
import {z} from 'zod'


export const NewUserValidationShema = z.object({
  name: z.string(),
  password: z.string(),
  displayName:z.string().optional(),
})

export type NewUserType = z.infer<typeof NewUserValidationShema>



 // const UsersModle = createSchmaAndModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)