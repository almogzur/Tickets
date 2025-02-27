
import {Schema} from 'mongoose';
import { EventSettingType, TicketType, infoFiledsType } from '../../../types/pages-types/admin/admin-event-types';
import { SavePayPalInvoceTpee } from '@/types/pages-types/client/client-event-type';


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

export const EventLogsSchema = new Schema( {
  time_stemp :{type:String, required:false},
  user:{type:String, required:false},
  ip:{type:String, required:false},
})

export const cartItemSchema = new Schema({
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
  cart:{type : [cartItemSchema], required: true },
  total: { type: String, required: true },
  purchase_date: { type: String, required: true }
},{versionKey:false,_id:false})


// createBindToConnectionModel create thes schemas 

export const DraftSchemaDef =  {
  
  info: { type: DraftGlobalFiled },
  tickets: { type: [TicketSchema], required: false },
  settings: { type: EventSettingsShema, required: false },
}

export const EventSchemaDef = {
    _id:{type: String, required:false},
  ...DraftSchemaDef, // Extending EventSchemaDef with DraftSchemaDef
  public_id: { type: String, required: true, unique: true },
  log: { type: [EventLogsSchema], required: false },
  invoices: { type: [PayedItemInvoce], required: false },
};


export const ClientSchmaDef = DraftSchemaDef




