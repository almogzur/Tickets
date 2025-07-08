import React, { RefObject } from 'react';
import {z} from 'zod'

export const SeatValidationSchema = z.record(z.string(), z.array(z.number()));
export const SeatStylesValidationSchema = z.record(
  z.string(),
  z.record( z.union([z.string(), z.number(), z.undefined()])
));

export const TheaterLocationValidationSchema = z.object({
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
     theaterName:z.string(),
     theaterLocation:TheaterLocationValidationSchema,
     theaterMainPhone:z.string()
})


export type  SeatsRow = z.infer< typeof SeatValidationSchema>
export type  SeatStyles = z.infer<typeof SeatStylesValidationSchema>
export type TheaterLocationType = z.infer<typeof TheaterLocationValidationSchema>
export type TheaterType = z.infer< typeof TheaterValidationSchema>


export interface TheaterTipInfoType {
    initValue:number
    row:string
    seatNumber:number
} 
export interface TheaterMultiTipInfoType  {
  seatNumber: number|undefined
  row: string
  first:number|undefined
  second:number|undefined
  totalSelected:number
  err:string
  selectDir:"R"|"L"|undefined
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