import { Ticket } from "@/pages/_app";
import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tickets:Ticket[]
    setTickets:Dispatch<SetStateAction<Ticket[]>>
    updateTicket:(  key: "price"|"type"|"discription"|"discoundInfo" , value:string|number )=> void
    updteTicketsArray: (ticket:Ticket, Action:"add"|"remove")=>void
}


export default createContext<TicketContextType>(null)