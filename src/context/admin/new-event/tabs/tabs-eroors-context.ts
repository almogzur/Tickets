import { createContext } from "react";

interface TicketContextType {
    GetFormErrors : (filed:string   ) => string | undefined  
}


export default createContext<TicketContextType>({
    GetFormErrors: function (filed: string): string | undefined {
        throw new Error("Function not implemented.");
    }
})