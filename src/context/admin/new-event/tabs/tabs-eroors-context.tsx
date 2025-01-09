import { createContext } from "react";
import { ZodIssue, ZodObject } from "zod";

interface TicketContextType {
    findValidationEroor : (value:string   ) => string | undefined  
}


export default createContext<TicketContextType>({
    findValidationEroor: function (value: string): string | undefined {
        throw new Error("Function not implemented.");
    }
})