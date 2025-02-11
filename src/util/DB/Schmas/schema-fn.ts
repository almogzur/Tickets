import mongoose, { model, Schema, SchemaDefinition } from "mongoose";


export const createModel = <T extends unknown>(name: string, schemaDefinition: SchemaDefinition<T>): mongoose.Model<T> => {
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