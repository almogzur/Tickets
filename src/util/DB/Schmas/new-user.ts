import { NewUserType, NewUserValidationShema } from "@/types/pages-types/supervisor-types";
import { createModel } from "./event";


export const NewUserSchemaDefinition = {
  name: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  displayName:{type:String , required: true}
};


export const UsersModle =  createModel<NewUserType>("ActiveUsers",NewUserSchemaDefinition)



