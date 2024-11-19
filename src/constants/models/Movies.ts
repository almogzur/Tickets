export type Movie = {
  id: number,
  name: string,
  cover: StaticImageData,
  adText:String,
  ticketCost?: number,
  seats?: Seats
}

export type Seats = {
  [key: string]: number[]
}