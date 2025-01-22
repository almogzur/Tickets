
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
    EndSealesDate: { type:String ,required:false},
    selectedType:{ type:String , required:true },
    priceInfo:{type:String ,required:false},
    price:{type:String ,required:true}  
},
{_id:false,versionKey:false}
)
const TempNewEventSchemaDefinition = {
  eventName: { type: String, required: true, unique: true },
  cat:{type:String , require:false},
  TheaterName:{type:String , require:false},
  availableSeatsAmount:{type:Number, require:false},
  Date: { type: String , require:false},
  OpenDorHour:{ type: Date , require:false},
  Hour:{ type: Date , require:false},
  isEventClosedForSeal: { type: Boolean , require:false},
  pre: {type:String , require:false},
  preview: { type: String, required: false }, 
  Theater :{type : Object ,required:false},
  tickets: { type: [TicketSchema], required: false }
}

const ProductionNewEventSchemaDefinition ={}

const NewEventLogsModleShemaDefinition ={}
  


export const TempNewEventSchema = new Schema<EventMongoseeDraftType>(TempNewEventSchemaDefinition,{versionKey:false})
export const ProductionNewEventSchema = new Schema(ProductionNewEventSchemaDefinition)
export const NewEventLogsModleShema = new Schema<LogType>(  NewEventLogsModleShemaDefinition)

//Db Modoles 

export const DraftModle = createDynamicModel<EventMongoseeDraftType>("Drafts",TempNewEventSchema)



  
  
  

