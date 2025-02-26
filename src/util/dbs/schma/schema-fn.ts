import mongoose, { model, Schema, SchemaDefinition } from "mongoose";


 const createModelOld = <T> (name: string, schemaDefinition: SchemaDefinition<T>): mongoose.Model<T> => {
  if (!name) {
    throw new Error("Name is required to create a model");
  }
  // Dynamically create the schema and model
  const Dschema = new Schema<T>(schemaDefinition, {
    collection: name, // Specify the exact collection names
    autoCreate: false,
    autoIndex: false,

  });
  // Return an existing model or create a new one
  return mongoose.models[`${name}`] || model<T>(name, Dschema);
}



export const createBindToConnectionModel = <T>(
  name: string,
  schemaDefinition: mongoose.SchemaDefinition<T>
) => {
  // Create schema once
  const schema = new mongoose.Schema<T>(schemaDefinition, {
    collection: name,
    autoCreate: false,
    autoIndex: false,
    versionKey:false,
    
  });

   // returns a functun that requerd a connection  so that 
   // modle will know the coonection and not  look at the global connections pool
   // ther is none . 
   //  this is  Clients { } with muli coonections 
   // every coonection is created at call time with CreateMongooseClient fn 
  return (connection: mongoose.Connection): mongoose.Model<T> => {
    if (!connection) {
      throw new Error("A valid database connection is required.");
    }
    return connection.models[name] || connection.model<T>(name, schema);
  };
  
};