import { StaticImageData } from "next/image"

export type Movie = {
  id: number,
  name: string,
  cover: StaticImageData,
  adText:String,
  ticketCost?: number,
  seats?: Seats
  citizenTicketCost:number

}





export type Seats = {
  [key: string]: number[]
}