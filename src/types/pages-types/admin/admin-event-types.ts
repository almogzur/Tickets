
import { z }  from 'zod'
import { TheaterValidationSchema } from "@/types/components-typs/admin/theater/admin-theater-types";
import { SavePayPalInvoceVS } from '../client/client-event-type';
import { EventLogsSchema } from '@/util/dbs/schma/db-event';

//ZT (Zod inferd Types) schema


// Bace ZT for Global Use
export const infoFiledsZT = z.object({
  eventName:z.string() ,
  cat:z.string(),
  pre:z.string(),
  TheaterName:z.string(),
  Theater:TheaterValidationSchema.or(z.undefined()),
  availableSeatsAmount:z.number(),
  preview:z.string(),
  isEventClosedForSeal:z.boolean(),
  Date:z.string(),
  Hour:z.string(),
  OpenDoors:z.string()
})
export const TicketZVS = z.object({
  EndSealesHour :z.string().nullable(), // Date Component need null do display label 
  EndSealesDate: z.string().nullable(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
     .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
})
export const SettingsZT = z.object({
  canSelectNotRelatedSites:z.boolean(),
  limitClientTicket : z.boolean(),
  ticketLimit:z.string(),
})



// Zod Validate Form / Api Use 

// Draft 
export const DraftInfoFiledsZVS = infoFiledsZT.extend({
  eventName: z.string().min(3, "❌ לפחות 3 תווים").max(30),
});
export const NewDraftZVS= z.object({
  info:DraftInfoFiledsZVS,
  tickets: z.array(TicketZVS).optional(),
  settings:SettingsZT
})
export const UpdateDraftZVS= NewDraftZVS.extend({
  _id: z.string().nonempty()
})

export const EventLogsZVS = z. object( {
  time_stemp :z.string(),
  user:z.string(),
  ip:z.string().ip(),
})

// Eevent

export const  EventInfoFiledsZVS = infoFiledsZT.extend({ 
  eventName: z.string().min(3, "❌ לפחות 3 תווים").max(30),
  cat: z.string().min(1,{message:"❌ בחר קטגוריה"}),
  pre: z.string().min(5,"❌ הוסף תוכן או פרטים  על האירוע"),
  TheaterName:z.string().min(1,"❌ בחר אולם"),
  Theater:TheaterValidationSchema,
  Date: z.string().min( 1 , "❌ בחר תאריך לאירוע"),
  Hour: z.string().min(1,"❌ בחר שעה לאירוע"),
  OpenDoors: z.string().min(1,"❌ בחר שעת פתחיחת דלתות"),
  preview:z.string().min(1,"❌ בחר תמונה לאירוע"),
  availableSeatsAmount:z.number(),  
}) 
export const EventSettingZVS = TicketZVS.array().nonempty({message:"❌ הוסף לפחות כרטיס 1"})

export const NewEventZVS = z.object({
  info:EventInfoFiledsZVS,
  tickets: EventSettingZVS,
  settings: SettingsZT,
  public_id:z.string().nonempty()
})

export const EventFromDraftZVS= NewEventZVS.extend({
  _id:z.string().nonempty(), // draft saved object id 
})

export const WithDataAdminEventZVS= EventFromDraftZVS.extend({
  log:z.array(EventLogsZVS),
  invoices:z.array(SavePayPalInvoceVS),
})

 
// Bace 
export type infoFiledsType = z.infer< typeof infoFiledsZT>
export type TicketType  = z.infer<typeof TicketZVS> 
export type EventSettingType = z.infer<typeof SettingsZT>

// derived from bace

//Draft

export type  NewDraftType = z.infer< typeof NewDraftZVS>
export type  UpdateDraftType = z.infer <typeof UpdateDraftZVS>

// Event 

export type  EventFromDraftType  = z.infer <typeof EventFromDraftZVS>

export type  NewEventType = z.infer <typeof NewEventZVS >

export type WithDataEventType = z.infer< typeof WithDataAdminEventZVS>

export type ClientEventType = z.infer<typeof EventFromDraftZVS>


