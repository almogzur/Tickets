
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import { ObjectId } from 'mongoose';
import { nullable, z }  from 'zod'

export const TicketValidationSchema = z.object({
  EndSealesDate: z.date(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("citizen"), z.literal("approachable")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
     .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
     .or(z.number().nonnegative().min(1))
})  

export const ProductionInfoFiledsValidtinSchema = z.object({
  eventName: z.string().min(3, " לפחות 3 תווים").max(30),
  cat: z.string().min(1,{message:"בחר קטגוריה"}),
  TheaterName: z.string({message:"בחר אולם"}),
  availableSeatsAmount: z.number(),
  Date: z.date({message:"בחר תאריך לאירוע"}),
  OpenDorHour: z.date({message:"בחר שעת פתחיחת דלתות"}),
  Hour: z.date({message:"בחר שעה לאירוע"}),
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

export type TempInfoType = z.infer<typeof TempInfoFiledsValidationSchema>
export type RequestStatusType ="Temp"|"Production"|undefined
export interface TicketStateType extends Omit<TicketType, "selectedType" | "Date" | "EndSealesDate" > {
  selectedType: "normal" | "discount" | "citizen" | "approachable" | ""; 
  EndSealesDate: Date | null
}
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
  Date:Date|null,
  Hour:Date|null
  OpenDorHour:Date|null
}
export interface EventMongoseeDraftType extends infoFiledsType {
  tickets?: TicketType[];
  _id:''
}

export interface LogType {  
  time_stemp : Date ,
  user : string ,
  ip :string,
}

