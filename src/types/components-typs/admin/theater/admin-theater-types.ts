
import { SeatValidationSchema } from '@/types/pages-types/new-event-types'
import { CSSProperties, RefObject } from 'react'
import { z } from 'zod'

export type  Seats = z.infer< typeof SeatValidationSchema>
export type  SeatStyles = Record<string,CSSProperties>


export interface TheaterLocationType {
  alt:string
  lot:string
  city:string
  address:string
}
export interface TheaterType {
   mainSeats:Seats 
   sideSeats:Seats 
   textsStyle:SeatStyles
   styles:SeatStyles
   ThaeaterName:string
   TheaterLocation:TheaterLocationType
   TheaterMainPhone:string
}

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