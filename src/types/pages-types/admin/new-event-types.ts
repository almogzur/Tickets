
import{  ItemCategory  } from  "@paypal/paypal-server-sdk";
import { z }  from 'zod'
import { OrderRequest } from "@paypal/paypal-server-sdk";
import { TheaterValidationSchema } from "@/types/components-typs/admin/theater/admin-theater-types";



export const infoFiledsValidationSchema = z.object({
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

export const TicketValidationSchema = z.object({
  EndSealesHour :z.string().nullable(), // Date Component need null do display label 
  EndSealesDate: z.string().nullable(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
     .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
})

export const EventSettingValidationSchema = z.object({
  canSelectNotRelatedSites:z.boolean(),
  limitClientTicket : z.boolean(),
  ticketLimit:z.string()

})

export const EventValidationSchema = z.object({
  eventName: z.string().min(3, "❌ לפחות 3 תווים").max(30),
  cat: z.string().min(1,{message:"❌ בחר קטגוריה"}),
  Date: z.string().min( 1 , "❌ בחר תאריך לאירוע"),
  OpenDoors: z.string().min(1,"❌ בחר שעת פתחיחת דלתות"),
  Hour: z.string().min(1,"❌ בחר שעה לאירוע"),
  pre: z.string().min(5,"❌ הוסף תוכן או פרטים  על האירוע"),
  preview:z.string().min(1,"❌ בחר תמונה לאירוע"),
  TheaterName:z.string().min(1,"❌ בחר אולם"),
  tickets: TicketValidationSchema.array().nonempty({message:"❌ הוסף לפחות כרטיס 1"})
})

export const DraftValidationSchema= z.object({
  _id: z.string().optional(),
  info:infoFiledsValidationSchema,
  tickets: z.array( TicketValidationSchema),
  eventSetting:EventSettingValidationSchema
})

export const AdminEventTypeValidationScheam = DraftValidationSchema.extend({
  publicId:z.string()
})

export const  ClientEventTypeValidationSchima = AdminEventTypeValidationScheam.omit({})





export type infoFiledsType = z.infer< typeof infoFiledsValidationSchema>
export type DraftInfoType = z.infer<typeof DraftValidationSchema>
export type EventSettingType = z.infer<typeof EventSettingValidationSchema>
export type TicketType  = z.infer<typeof TicketValidationSchema> 


export type  DraftType = z.infer <typeof DraftValidationSchema>
export type  AdminEventType = z.infer <typeof AdminEventTypeValidationScheam >
export type ClientEventType = z.infer<typeof ClientEventTypeValidationSchima>












