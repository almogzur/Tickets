
import { z }  from 'zod'
import { TheaterValidationSchema } from "@/types/components-types/admin/theater/admin-theater-types";
import { SavePayPalInvoceVS } from '../client/client-event-type';
import { EventLogsSchema } from '@/util/db/schemas/db-event';

//ZT (Zod infer Types) schema


// Base ZT for Global Use
export const infoFieldsZT = z.object({
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
  EndSalesHour :z.string().nullable(), // Date Component need null do display label 
  EndSalesDate: z.string().nullable(),
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
export const DraftInfoFieldsZVS = infoFieldsZT.extend({
  eventName: z.string().min(3, "❌ לפחות 3 תווים").max(30),
});
export const NewDraftZVS= z.object({
  info:DraftInfoFieldsZVS,
  tickets: z.array(TicketZVS).optional(),
  settings:SettingsZT
})
export const UpdateDraftZVS= NewDraftZVS.extend({
  _id: z.string().nonempty()
})

export const EventLogsZVS = z. object( {
  time_stamp :z.string(),
  user:z.string(),
  ip:z.string().ip(),
})

// event

export const  EventInfoFieldsZVS = infoFieldsZT.extend({ 
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
  info:EventInfoFieldsZVS,
  tickets: EventSettingZVS,
  settings: SettingsZT,
  public_id:z.string().optional()
})



export const EventFromDraftZVS= NewEventZVS.extend({
  _id:z.string().nonempty(), // draft saved object id 

})

export const WithDataAdminEventZVS= EventFromDraftZVS.extend({
  log:z.array(EventLogsZVS),
  invoices:z.array(SavePayPalInvoceVS),
})

 
// Base 
export type infoFieldsType = z.infer< typeof infoFieldsZT>
export type TicketType  = z.infer<typeof TicketZVS> 
export type EventSettingType = z.infer<typeof SettingsZT>

// derived from base

//Draft

export type  NewDraftType = z.infer< typeof NewDraftZVS>
export type  UpdateDraftType = z.infer <typeof UpdateDraftZVS>

// Event 

export type  EventFromDraftType  = z.infer <typeof EventFromDraftZVS>

export type  NewEventType = z.infer <typeof NewEventZVS >


export type WithDataEventType = z.infer< typeof WithDataAdminEventZVS>

export type ClientEventType = z.infer<typeof EventFromDraftZVS>


