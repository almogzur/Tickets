import { Ticket } from "@/pages/_app";
import { createContext, Dispatch, SetStateAction } from "react";


interface TikitsContextType {
    tickets:Ticket[]
    setTickets:Dispatch<SetStateAction<Ticket[]>>
    updateTicketsPrice:()=> void
    updateTicketslabel:()=> void
    updateTickitDiscription:()=> void
}


export default createContext<TikitsContextType>(null)