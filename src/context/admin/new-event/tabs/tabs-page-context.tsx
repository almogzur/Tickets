import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tabValue:number
    setTabValue:Dispatch<SetStateAction<number>>
    ,
}


export default createContext<TicketContextType>({
    tabValue: 0,
    setTabValue: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    }
})