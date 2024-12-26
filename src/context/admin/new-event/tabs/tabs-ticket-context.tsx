import { BaceTIcketType, BaceTIcketType_Partial } from "@/pages/admin/new-event";
import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tickets:BaceTIcketType[]
    setTickets:Dispatch<SetStateAction<BaceTIcketType[]>>

}


export default createContext<TicketContextType>({
    tickets:[],
    setTickets: function (value: SetStateAction<BaceTIcketType[]>): void {
        throw new Error("Function not implemented.");
    }

})