
import { TheaterType } from '@/types/Thearer/theater-types';
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
export type  TicketType  = z.infer<typeof TicketValidationSchema> 

export interface TicketStateType extends Omit<TicketType, "selectedType" | "Date" | "EndSealesDate"> {
    selectedType: "normal" | "discount" | "citizen" | "approachable" | ""; 
    EndSealesDate: Date | null
  
}
  

export const TempInfoFiledsValidationSchema = z.object({
  eventName: z.string().min(3, "שם צריך להיות לפחות  3  תווים"),
});

export const ProductionInfoFiledsValidtinSchema = z.object({
  eventName: z.string().min(3, " לפחות 3 תווים"),
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


export type TempInfoType = z.infer<typeof TempInfoFiledsValidationSchema>

export interface infoFiledsType  {
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


