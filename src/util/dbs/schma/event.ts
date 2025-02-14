
import {Schema} from 'mongoose';
import { EventSettingType, DraftType, LogType, TicketType, ClientEventType, AdminEventType, infoFiledsType, InvoiceType } from '../../../types/pages-types/admin/new-event-types';
import { createModel } from './schema-fn';



const EventSettingsShema = new Schema<EventSettingType>({
  limitClientTicket: { type: Boolean, required: false },
  ticketLimit: { type: String, required: false },
  canSelectNotRelatedSites: { type: Boolean, required: false }
}, {_id: false,versionKey: false,})

const TicketSchema = new Schema<TicketType>({
  EndSealesHour: { type: String, required: false },
  EndSealesDate: { type: String, required: false },
  selectedType: { type: String, required: true },
  priceInfo: { type: String, required: false },
  price: { type: String, required: true }
}, {_id: false,  versionKey: false,})

const DraftGlobalFiled = new Schema<infoFiledsType>({
  eventName: { type: String, required: true, unique: true },
  cat: { type: String, require: false },
  TheaterName: { type: String, require: false },
  availableSeatsAmount: { type: Number, require: false },
  Date: { type: String, require: false },
  OpenDoors: { type: String, require: false },
  Hour: { type: String, require: false },
  isEventClosedForSeal: { type: Boolean, require: false },
  pre: { type: String, require: false },
  preview: { type: String, required: false },
  Theater: { type: Object, required: false },
}, { _id: false })

const EventGlobalFiled = new Schema<infoFiledsType>({
  eventName: { type: String, required: true, unique: true },
  cat: { type: String, require: true },
  TheaterName: { type: String, require: true },
  availableSeatsAmount: { type: Number, require: true },
  Date: { type: String, require: true },
  OpenDoors: { type: String, require: true },
  Hour: { type: String, require: true },
  isEventClosedForSeal: { type: Boolean, require: false },
  pre: { type: String, require: true },
  preview: { type: String, required: true },
  Theater: { type: Object, required: true },
}, { _id: false })

const EventLogsSchema   = {
  time_stemp :{type:String, required:false},
  user:{type:String, required:false},
  ip:{type:String, required:false},
}
const EventInvoceSchema   ={
  payerName: {type:String, required:false},
  for: {type:String, required:false},
  price: {type:String, required:false},
  amout: {type:Number, required:false},
  timeStamp: {type:String, required:false},
}
const DraftSchema =   {
  info: { type: DraftGlobalFiled },
  tickets: { type: [TicketSchema], required: false },
  eventSetting: { type: EventSettingsShema, required: false }
}
const EventSchema = {
  publicId:{ type:String , required: true ,unique:true },
  info: { type: EventGlobalFiled , required: true  },
  tickets: { type: [TicketSchema], required: true },
  eventSetting: { type: EventSettingsShema, required: true },
  log:{type: [EventLogsSchema] ,required:false },
  invoices:{ type : [EventInvoceSchema] , required:false}

}


// end of week this just start working id remoived no dev recorde saveed
// all db recored del .. eror on rendreing 


//Db Modoles 
export const DraftModle = createModel<DraftType>("Drafts", DraftSchema)
export const AdminEventModle = createModel<AdminEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`, EventSchema)









