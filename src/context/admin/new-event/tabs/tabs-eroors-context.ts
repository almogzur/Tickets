import { createContext } from "react";

interface TicketContextType {
    newEventValidateFiled : (filed:string   ) => string | undefined  
}


export default createContext<TicketContextType>({
    newEventValidateFiled: function (filed: string): string | undefined {
        throw new Error("Function not implemented.");
    }
})