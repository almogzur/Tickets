
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';

import { z }  from 'zod'

export const TicketValidationSchema = z.object({
  EndSealesHour :z.string().nullable(), // Date Component need null do display label 
  EndSealesDate: z.string().nullable(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("citizen"),z.literal("")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
     .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
})  

export const ProductionInfoFiledsValidtinSchema = z.object({
  eventName: z.string().min(3, " לפחות 3 תווים").max(30),
  cat: z.string().min(1,{message:"בחר קטגוריה"}),
  TheaterName: z.string({message:"בחר אולם"}),
  availableSeatsAmount: z.number(),
  Date: z.string({message:"בחר תאריך לאירוע"}),
  OpenDorHour: z.string({message:"בחר שעת פתחיחת דלתות"}),
  Hour: z.string({message:"בחר שעה לאירוע"}),
  isEventClosedForSeal: z.boolean().optional(),
  pre: z.string().min(5,"הוסף תוכן או פרטים  על האירוע"),
  image: z.instanceof(File,{message:"בחר קובץ"}).refine(
    (file) => !!file,
    { message: "בחר תמונה ראשית לאירוע" }
  ),
});

export const TempInfoFiledsValidationSchema = z.object({
  eventName: z.string().min(3, "שם צריך להיות לפחות  3  תווים").max(20),
});


// the massages are all optinal + boolean fileds too so ... 
//  ther is no real need to vlidate hear
export const EventSettingValidationSchema = z.object({

}) 
// maby santise user input will see ...

export type TempInfoType = z.infer<typeof TempInfoFiledsValidationSchema>

export type RequestStatusType ="Temp"|"Production"|undefined

export type TicketType  = z.infer<typeof TicketValidationSchema> 

export interface infoFiledsType {
  eventName:string ,
  cat:string
  pre:string
  TheaterName:string
  Theater:TheaterType|undefined
  availableSeatsAmount:number|undefined
  image:File|undefined
  preview:string
  isEventClosedForSeal:boolean
  Date:string|null,
  Hour:string|null
  OpenDorHour:string|null
}

export type EventSettingType  =  {
  canSelectNotRelatedSites:boolean,
  limitClientTicket : boolean
  ticketLimit:string
  }


export interface EventType extends infoFiledsType {
    _id: string;
    tickets?: TicketType[]
    eventSetting:EventSettingType
  }

export interface LogType {  
  time_stemp : string ,
  user : string ,
  ip :string,
}

