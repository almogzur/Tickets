
import mongoose, { model,SchemaDefinition,   } from 'mongoose';
import {  EventSettingType, DraftType, LogType, TicketType, ClientEventType, AdminEventType } from './new-event-types';

const { Schema } = mongoose;


 export const createModel = <T extends unknown>  ( name:string, schemaDefinition: SchemaDefinition<T> ) : mongoose.Model<T> => {
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

const EventSettingsShema = new Schema<EventSettingType>({
  limitClientTicket: { type : Boolean , required : false},
  ticketLimit:{type:String , required : false},
  canSelectNotRelatedSites: { type :Boolean ,required :false}
},{
  _id:false,
  versionKey:false,
})
const TicketSchema = new Schema<TicketType>({
  EndSealesHour: { type: String, required: false },
  EndSealesDate: { type: String, required: false },
  selectedType: { type: String, required: true },
  priceInfo: { type: String, required: false },
  price: { type: String, required: true }
  },{
    _id:false,
    versionKey:false,
  })
const DraftGlobalFiled =  {
  eventName: { type: String, required: true, unique: true },
  cat:{type:String , require:false},
  TheaterName:{type:String , require:false},
  availableSeatsAmount:{type:Number, require:false},
  Date: { type: String , require:false},
  OpenDoors:{ type: String , require:false},
  Hour:{ type: String , require:false},
  isEventClosedForSeal: { type: Boolean , require:false},
  pre: {type:String , require:false},
  preview: { type: String, required: false }, 
  Theater :{type : Object ,required:false},
}
const EventGlobalFiled =  {
  eventName: { type: String, required: true, unique: true },
  cat:{type:String , require:true},
  TheaterName:{type:String , require:true},
  availableSeatsAmount:{type:Number, require:true},
  Date: { type: String , require:true},
  OpenDoors:{ type: String , require:true},
  Hour:{ type: String , require:true},
  isEventClosedForSeal: { type: Boolean , require:false},
  pre: {type:String , require:true},
  preview: { type: String, required: true }, 
  Theater :{type : Object ,required:true},
}
const DraftSchema =  {
  info : { type:DraftGlobalFiled },
  tickets: { type: [TicketSchema], required: false },
  eventSetting: {type : EventSettingsShema ,required : false }
}
const EventSchema ={
  info :{ type:EventGlobalFiled },
  tickets: { type: [TicketSchema], required: true },
  eventSetting: {type : EventSettingsShema ,required : true }

}
const EventLogsShema ={}
const clientEventSchema ={}


// end of week this just start working id remoived no dev recorde saveed
// all db recored del .. eror on rendreing 


//Db Modoles 
  export const DraftModle = createModel<DraftType>("Drafts",DraftSchema)
  export const AdminEventModle = createModel<AdminEventType>("Events",EventSchema)





  
  
  

