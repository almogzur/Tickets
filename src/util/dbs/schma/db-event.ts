
import {Schema} from 'mongoose';
import { EventSettingType, NewDraftType, TicketType, ClientEventType, infoFiledsType, UpdateDraftType, NewEventType } from '../../../types/pages-types/admin/admin-event-types';


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

export const  PayedItemInvoce = new Schema({
  id:{ type:String , required: true },
  payer:{},
  payment_source:{},
  purchase_units:{}
},{versionKey:false})


export const DraftSchema =   {
  info: { type: DraftGlobalFiled },
  tickets: { type: [TicketSchema], required: false },
  settings: { type: EventSettingsShema, required: false }
}


export const EventSchema = {
  public_id:{ type:String , required: true ,unique:true },
  info: { type: EventGlobalFiled , required: true  },
  tickets: { type: [TicketSchema], required: true },
  settings: { type: EventSettingsShema, required: true },
  log:{type: [EventLogsSchema] ,required:false },
  invoices:{ type : [PayedItemInvoce] , required:false}
}

// end of week this just start working id remoived no dev recorde saveed
// all db recored del .. eror on rendreing 

//Db Modoles 





