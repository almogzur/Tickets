import { RefObject } from 'react';
import {z} from 'zod'

export const SeatValidationSchema = z.record(z.string(), z.array(z.number()));
export const SeatStylesValidationSchema = z.record(z.string(), z.any())

export const TheaterLocationValidationSchma = z.object({
  alt:z.string(),
  lot:z.string(),
  city:z.string(),
  address:z.string()
})
export const TheaterValidationSchema = z.object({
     mainSeats:SeatValidationSchema ,
     sideSeats:SeatValidationSchema ,
     textsStyle:SeatStylesValidationSchema,
     styles:SeatStylesValidationSchema,
     ThaeaterName:z.string(),
     TheaterLocation:TheaterLocationValidationSchma,
     TheaterMainPhone:z.string()
})



export type  SeatsRow = z.infer< typeof SeatValidationSchema>
export type  SeatStyles = z.infer<typeof SeatStylesValidationSchema>
export type TheaterLocationType = z.infer<typeof TheaterLocationValidationSchma>
export type TheaterType = z.infer< typeof TheaterValidationSchema>





export interface TheaterTipinfoType {
    initValue:number
    row:string
    seatNumber:number
} 
export interface TheaterMultiTipeInfoType  {
  seatNumber: number|undefined
  row: string
  first:number|undefined
  second:number|undefined
  totalselected:number
  err:string
  selectdir:"R"|"L"|undefined
}

export interface Positions {
    x:number ,
    y:number ,
    Scale?:number ,
    disabled? :boolean
  }
  
export type RefsType = {
    [key:string] : RefObject<HTMLInputElement>
} 