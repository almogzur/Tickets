import { BaceTicketType } from "@/pages/admin/new-event";
import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tickets:BaceTicketType[]
    setTickets:Dispatch<SetStateAction<BaceTicketType[]>>

}


export default createContext<TicketContextType>({
    tickets:[],
    setTickets: function (value: SetStateAction<BaceTicketType[]>): void {
        throw new Error("Function not implemented.");
    }

})