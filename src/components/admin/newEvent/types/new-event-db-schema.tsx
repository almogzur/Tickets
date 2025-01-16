
import { Session } from 'next-auth';
import mongoose, { model,MongooseOptions,SchemaDefinition, SchemaDefinitionType,   } from 'mongoose';
import { infoFiledsType, LogType, TicketType } from './new-event-types';

const { Schema } = mongoose;


export function getDynamicModel<T extends unknown>( 
      name:string,
      schemaDefinition: SchemaDefinition<T>,
    )
        : mongoose.Model<T> {
          if (!name) {
          throw new Error("Session user name is required to  create a model");
         }

         // Dynamically create the schema and model
         const Dschema = new Schema<T>(schemaDefinition);
         
         // Return an existing model or create a new one
         return mongoose.models?.collectionName || model<T>(name, Dschema);
}




export const TicketSchema = new Schema<TicketType>({})

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
  ticket:[TicketSchema]
}

const ProductionNewEventSchemaDefinition ={}

    

  const NewEventLogsModleShemaDefinition ={}
  


export const TempNewEventSchema = new Schema<infoFiledsType & {tickets:TicketType[]}>(TempNewEventSchemaDefinition)
export const ProductionNewEventSchema = new Schema(ProductionNewEventSchemaDefinition)
export const NewEventLogsModleShema = new Schema<LogType>(  NewEventLogsModleShemaDefinition)



  
  
  

