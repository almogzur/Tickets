
import mongoose, { model,SchemaDefinition,   } from 'mongoose';
import {  EventSettingType, LogType, TicketType } from './new-event-types';

const { Schema } = mongoose;


export const createSchmaAndModel = <T extends unknown>  ( name:string, schemaDefinition: SchemaDefinition<T> ) : mongoose.Model<T> => {
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

const EventSettingsShema = new Schema<EventSettingType>({
  limitClientTicket: { type : Boolean , required : false},
  ticketLimit:{type:String , required : false},
  canSelectNotRelatedSites: { type :Boolean ,required :false}
},{
  _id:false,
  versionKey:false
})

// end of week this just start working id remoived no dev recorde saveed
// all db recored del .. eror on rendreing 



const TicketSchema = new Schema<TicketType>({
    EndSealesHour:{type :String , required:false },
    EndSealesDate: { type:String ,required:false},
    selectedType:{ type:String , required:true },
    priceInfo:{type:String ,required:false},
    price:{type:String ,required:true}  
},
{_id:false,versionKey:false}
)
export const DraftSchemaDefinition = {
  eventName: { type: String, required: true, unique: true },
  cat:{type:String , require:false},
  TheaterName:{type:String , require:false},
  availableSeatsAmount:{type:Number, require:false},
  Date: { type: String , require:false},
  OpenDorHour:{ type: String , require:false},
  Hour:{ type: String , require:false},
  isEventClosedForSeal: { type: Boolean , require:false},
  pre: {type:String , require:false},
  preview: { type: String, required: false }, 
  Theater :{type : Object ,required:false},
  tickets: { type: [TicketSchema], required: false },
  eventSetting: {type : EventSettingsShema ,required : false }
}

const EventSchema ={}

const EventLogsModleShema ={}
  




//Db Modoles 




  
  
  

