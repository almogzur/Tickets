import { Ticket } from "@/pages/_app";
import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tickets:Ticket[]
    setTickets:Dispatch<SetStateAction<Ticket[]>>
    updateTicket:(  key: "price"|"type"|"discription"|"discoundInfo" , value:string|number )=> void
    updteTicketsArray: (ticket:Ticket, Action:"add"|"remove")=>void
}


export default createContext<TicketContextType>({
    tickets:[],
    setTickets: function (value: SetStateAction<Ticket[]>): void {
        throw new Error("Function not implemented.");
    },
    updateTicket: function (key: "price" | "type" | "discription" | "discoundInfo", value: string | number): void {
        throw new Error("Function not implemented.");
    },
    updteTicketsArray: function (ticket: Ticket, Action: "add" | "remove"): void {
        throw new Error("Function not implemented.");
    }
})