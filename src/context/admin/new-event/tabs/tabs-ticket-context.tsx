import { TicketType } from "@/pages/admin/new-event";
import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tickets:TicketType[]
    setTickets:Dispatch<SetStateAction<TicketType[]>>

}


export default createContext<TicketContextType>({
    tickets:[],
    setTickets: function (value: SetStateAction<TicketType[]>): void {
        throw new Error("Function not implemented.");
    }

})