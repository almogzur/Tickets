import { StaticImageData } from "next/image"

export type Event = {
  id: number,
  name: string,
  cover: StaticImageData,
  adText:String,
  ticketCost?: number,
  seats?: Seats
  citizenTicketCost:number
  textposions?:TextPosition
}


export type Seats = {
  [key: string]: number[]
}


export type TextPosition = { 
  [key:string] : { top: number;left: number} 
}
