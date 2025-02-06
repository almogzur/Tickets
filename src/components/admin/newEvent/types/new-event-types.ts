
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import { object } from '@paypal/paypal-server-sdk/dist/types/schema';

import { z }  from 'zod'

export const TicketValidationSchema = z.object({
  EndSealesHour :z.string().nullable(), // Date Component need null do display label 
  EndSealesDate: z.string().nullable(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
     .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
})  
export const EventValidtinSchema = z.object({
  eventName: z.string().min(3, "❌ לפחות 3 תווים").max(30),
  cat: z.string().min(1,{message:"❌ בחר קטגוריה"}),
  Date: z.string().min( 1 , "❌ בחר תאריך לאירוע"),
  OpenDoors: z.string().min(1,"❌ בחר שעת פתחיחת דלתות"),
  Hour: z.string().min(1,"❌ בחר שעה לאירוע"),
  pre: z.string().min(5,"❌ הוסף תוכן או פרטים  על האירוע"),
  preview:z.string().min(1,"❌ בחר תמונה לאירוע"),
  TheaterName:z.string().min(1,"❌ בחר אולם"),
  tickets: z.any({}).array().nonempty({message:"❌ הוסף לפחות כרטיס 1"})
})
export const DraftValidationSchema = z.object({
  eventName: z.string().min(3, "שם צריך להיות לפחות  3  תווים").max(20),
});
export const EventSettingValidationSchema = z.object({}) 

export interface infoFiledsType {
  eventName:string ,
  cat:string
  pre:string
  TheaterName:string
  Theater:TheaterType|undefined
  availableSeatsAmount:number|undefined
  preview:string,
  isEventClosedForSeal:boolean,
  Date:string,
  Hour:string,
  OpenDoors:string
}
export type DraftInfoType = z.infer<typeof DraftValidationSchema>

export type RequestStatusType ="Temp"|"Production"|undefined

export type TicketType  = z.infer<typeof TicketValidationSchema> 

export type LogType =  {  
  time_stemp : string ,
  user : string ,
  ip :string,
}
export type InvoiceType = {
  payerName:string
  for:string,
  price:string,
  amout:number,
  timeStamp:string,
  provider?:string

}
export type EventSettingType  =  {
  canSelectNotRelatedSites:boolean,
  limitClientTicket : boolean
  ticketLimit:string
}
export interface DraftType {
     _id: string;
     info:infoFiledsType
     tickets?: TicketType[]
     eventSetting:EventSettingType
}
export interface  AdminEventType extends  DraftType   {
    logs:LogType
    invoices:InvoiceType[]
}
export interface  ClientEventType extends Omit<AdminEventType, "logs" | "invoices"> {

}


