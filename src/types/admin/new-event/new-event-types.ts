
import { TheaterType } from '@/types/Thearer/theater-types';
import { nullable, z }  from 'zod'
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Validation Shema Zod 
export const TicketValidationSchema = z.object({
  EndSealesDate: z.date(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("citizen"), z.literal("approachable")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
     .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
     .or(z.number().nonnegative().min(1))
})  
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

// Derived Types From Zod Schemas 
export type TicketType  = z.infer<typeof TicketValidationSchema> 
export interface TicketStateType extends Omit<TicketType, "selectedType" | "Date" | "EndSealesDate"> {
  selectedType: "normal" | "discount" | "citizen" | "approachable" | ""; 
  EndSealesDate: Date | null

}

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

// Db Schema Mongoosee

const TempDBNewEventSchemaDefinition = {
  eventName:{type: String , require:true},
  cat:{type:String , require:false},
  TheaterName:{type:String , require:false},
  availableSeatsAmount:{type:Number, require:false},
  Date: { type: Date , require:false},
  OpenDorHour:{ type: Date , require:false},
  Hour:{ type: Date , require:false},
  isEventClosedForSeal: { type: Boolean , require:false},
  pre: {type:String , require:false},
  image: { type: Buffer, required: false }, // Store image data as binary
}
const TempDBNewEventSchemaOptions = {
  autoIndex:true,

}

const ProductionENewventSchemaDefinition ={}
const ProductionENewventSchemaOptions ={}

export const TempDBNewEventSchema = new  Schema<TempInfoType>(
      TempDBNewEventSchemaDefinition,
      TempDBNewEventSchemaOptions
    )
export const ProductionENewventSchema = new Schema<infoFiledsType>(
        ProductionENewventSchemaDefinition,
        ProductionENewventSchemaOptions
      )