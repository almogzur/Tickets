import { NewUserType } from "@/types/pages-types/supervisor-types";
import { createModel } from "./schema-fn";



export const NewUserSchemaDefinition = {
  name: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  displayName:{type:String , required: true}
};


export const UsersModle =  createModel<NewUserType>(`${process.env.APP_USERS_FOLDER_PATH}`,NewUserSchemaDefinition)



