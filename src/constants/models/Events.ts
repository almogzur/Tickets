import { TheaterType } from "@/components/admin/newEvent/theater/types/theater-types"
import { StaticImageData } from "next/image"
import { CSSProperties, ReactNode } from "react"

export type Event = {
  id: number,
  name: string,
  cover: StaticImageData,
  adText:String,
  ticketCost?: number,
  citizenTicketCost:number
   theater :TheaterType

}

export interface Seats { [key:string] :number[]  }

export interface SeatStyles   {[key:string]: CSSProperties  }


