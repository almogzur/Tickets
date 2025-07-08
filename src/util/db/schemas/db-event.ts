
import {Schema} from 'mongoose';
import { EventSettingType, TicketType, infoFieldsType } from '../../../types/pages-types/admin/admin-event-types';


const EventSettingsSchema = new Schema<EventSettingType>({
  limitClientTicket: { type: Boolean, required: false },
  ticketLimit: { type: String, required: false },
  canSelectNotRelatedSites: { type: Boolean, required: false }
}, {_id: false,versionKey: false,})

const TicketSchema = new Schema<TicketType>({
  EndSalesHour: { type: String, required: false },
  EndSalesDate: { type: String, required: false },
  selectedType: { type: String, required: true },
  priceInfo: { type: String, required: false },
  price: { type: String, required: true }
}, {_id: false,  versionKey: false,})

const DraftGlobalFiled = new Schema<infoFieldsType>({
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

const EventGlobalFiled = new Schema<infoFieldsType>({
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

export const EventLogsSchema = new Schema( {
  time_stamp :{type:String, required:false},
  user:{type:String, required:false},
  ip:{type:String, required:false},
})

export const CartItemSchema = new Schema({
  name: { type: String,required: true},
  quantity: {type: String,required: true},
  unitAmount: {
    value: { type: String,required: true},
    currencyCode: { type: String,required: true }
   },
},{versionKey:false,_id:false});

export const  PayedItemInvoce = new Schema({
  id:{ type:String , required: true },
  payer:{},
  payment_source:{},
  purchase_units:{},
  cart:{type : [CartItemSchema], required: true },
  total: { type: String, required: true },
  purchase_date: { type: String, required: true }
},{versionKey:false,_id:false})


// createBindToConnectionModel create schemas 

export const DraftSchema =  {
  info: { type: DraftGlobalFiled },
  tickets: { type: [TicketSchema], required: false },
  settings: { type: EventSettingsSchema, required: false },
}

export const EventSchema = {
  _id:{type: String, required:false},
  ...DraftSchema, // Extending EventSchemaDef with DraftSchemaDef
  public_id: { type: String, required: false, unique: true },  // only if client save paypal  info , id is added to the event for sdk 
  log: { type: [EventLogsSchema], required: false },
  invoices: { type: [PayedItemInvoce], required: false },
};






