
import mongoose, { model,SchemaDefinition,   } from 'mongoose';
import { EventMongoseeDraftType, LogType, TicketType } from './new-event-types';

const { Schema } = mongoose;


export const createDynamicModel = <T extends unknown>  ( name:string, schemaDefinition: SchemaDefinition<T> ) : mongoose.Model<T> => {
  if (!name) {
     throw new Error("Name is required to create a model");
    }
    // Dynamically create the schema and model
    const Dschema = new Schema<T>(schemaDefinition, {
     collection: name, // Specify the exact collection name
   });
    // Return an existing model or create a new one
    return mongoose.models[`${name}`] || model<T>(name, Dschema);
}

const TicketSchema = new Schema<TicketType>({
    EndSealesDate: { type:Date ,required:true},
    selectedType:{ type:String , required:true },
    priceInfo:{type:String ,required:false},
    price:{type:Number ,required:true}  
},
{id:false,versionKey:false}
)


const TempNewEventSchemaDefinition = {
  eventName:{type: String , require:true},
  cat:{type:String , require:false},
  TheaterName:{type:String , require:false},
  availableSeatsAmount:{type:Number, require:false},
  Date: { type: Date , require:false},
  OpenDorHour:{ type: Date , require:false},
  Hour:{ type: Date , require:false},
  isEventClosedForSeal: { type: Boolean , require:false},
  pre: {type:String , require:false},
  preview: { type: String, required: false }, // Store image data as binary
  Theater :{type : Object ,required:false},
  tickets: { type: [TicketSchema], required: false }
}

const ProductionNewEventSchemaDefinition ={}

const NewEventLogsModleShemaDefinition ={}
  


export const TempNewEventSchema = new Schema<EventMongoseeDraftType>(TempNewEventSchemaDefinition,{versionKey:false})


export const ProductionNewEventSchema = new Schema(ProductionNewEventSchemaDefinition)
export const NewEventLogsModleShema = new Schema<LogType>(  NewEventLogsModleShemaDefinition)



  
  
  

