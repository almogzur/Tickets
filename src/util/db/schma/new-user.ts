
export const NewUserSchema = {
  name: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  displayName:{type:String , required: true}
};





