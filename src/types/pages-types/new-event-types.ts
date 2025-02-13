
import { TheaterLocationType, TheaterType } from '@/types/components-typs/admin/theater/admin-theater-types';
import{  ItemCategory  } from  "@paypal/paypal-server-sdk";
import { CSSProperties } from 'react';
import { z }  from 'zod'

// NO runtime  vadiation 

// api that uses this type are protected  by session 

import { OrderRequest } from "@paypal/paypal-server-sdk";

export interface CartItemType extends Omit<SeatType, 'value'> {
    id: string;
    name: string;
    Date:string,
    Hour:string
}

export type PayPalReqType = { // see Order Controller fn parameters 
    body: OrderRequest;
    paypalRequestId?: string;
    paypalPartnerAttributionId?: string;
    paypalClientMetadataId?: string;
    prefer?: string;
    paypalAuthAssertion?: string;
}

export interface infoFiledsType {
  eventName:string ,
  cat:string
  pre:string
  TheaterName:string
  Theater:TheaterType|undefined
  availableSeatsAmount:number
  preview:string,
  isEventClosedForSeal:boolean,
  Date:string,
  Hour:string,
  OpenDoors:string
}
export type EventSettingType  =  {
  canSelectNotRelatedSites:boolean,
  limitClientTicket : boolean
  ticketLimit:string
}
export type SeatType = {
  row: string,
  seatNumber: number
  value: number
  price: string,
  priceInfo?: string
}
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
export interface DraftType {
     _id: string;
     info:infoFiledsType
     tickets?: TicketType[]
     eventSetting:EventSettingType
}
export interface  AdminEventType extends  DraftType   {
     publicId:string
     logs:LogType
     invoices:InvoiceType[]
}

export interface  ClientEventType extends Omit<AdminEventType, "logs" | "invoices"> {}



// no session to gured from un welcome users 
// runtime  vadiation 




export const SeatValidationSchema = z.record(z.string(), z.array(z.number()));

export const TheaterValidationSchema= z.object({})

export const TicketValidationSchema = z.object({
  EndSealesHour :z.string().nullable(), // Date Component need null do display label 
  EndSealesDate: z.string().nullable(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
     .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
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
export const DraftValidationSchema = z.object({
  eventName: z.string().min(3, "שם צריך להיות לפחות  3  תווים").max(20),
});
export const PayPalItemVlidationShema= z.object({
  id: z.string().min(1),  // assigning event id
  name: z.string().min(1),
  quantity: z.string().min(1),
  category:z.union([z.literal(ItemCategory.Donation) ,z.literal(ItemCategory.DigitalGoods),z.literal(ItemCategory.PhysicalGoods) ] ),
  unitAmount: z.object( { currencyCode:z.string().min(1), value:z.string().min(1)}),
})
export const  NewOrderValidationSchema = z.object({
  cart: z.array(PayPalItemVlidationShema),
  total:z.string(),
  publicId:z.string(),
  eventId:z.string()
})

export const  UpdateOrderValidationSchema = z.object({
   eventId:z.string(),
   reqTheater: z.object({
        mainSeats:SeatValidationSchema,
        sideSeats:SeatValidationSchema
     })
})

// json coming from createOrder  available onApprove callabck 
export const  PayPalOnApproveDataValidationSchema = z.object({
  billingToken: z.string().nullable().or(z.undefined()),
  facilitatorAccessToken: z.string().or(z.undefined()),
  orderID: z.string(),
  payerID:  z.string().nullable().or(z.undefined()),
  paymentID: z.string().nullable().or(z.undefined()),
  subscriptionID: z.string().nullable().or(z.undefined()),
  authCode:  z.string().nullable().or(z.undefined()),
})

export const CapturedOrderValidationSchema= z.object({
  resData:PayPalOnApproveDataValidationSchema,
  eventId:z.string(),
  publicId: z.string(),
  cart: z.array(PayPalItemVlidationShema),
})


export type RequestStatusType ="Temp"|"Production"|undefined
export type DraftInfoType = z.infer<typeof DraftValidationSchema>
export type TicketType  = z.infer<typeof TicketValidationSchema> 
export type  PayPalItem  =  z.infer<typeof PayPalItemVlidationShema>

export type  NewOrderType =z.infer<typeof NewOrderValidationSchema> 

export type  CapturedOrderType = z.infer<typeof CapturedOrderValidationSchema>




