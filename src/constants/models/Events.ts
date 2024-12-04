import { StaticImageData } from "next/image"
import { CSSProperties, ReactNode } from "react"

export type Event = {
  id: number,
  name: string,
  cover: StaticImageData,
  adText:String,
  ticketCost?: number,
  citizenTicketCost:number
  mainSeats?: Seats
  surroundSeats?:Seats,
  surroundSeatsStyles?:SeatStyles
  surroundTextStyles?:SeatStyles,

}

export interface Seats {[key: string]: number[]}

export interface SeatStyles   {[key:string]: CSSProperties  }


