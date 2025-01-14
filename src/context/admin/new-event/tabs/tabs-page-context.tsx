import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tabValue:number
    setTabValue:Dispatch<SetStateAction<number>>
    isLoading:boolean
    setIsLoading:Dispatch<SetStateAction<boolean>>
    ,
}


export default createContext<TicketContextType>({
    tabValue: 0,
    setTabValue: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    isLoading: false,
    setIsLoading: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    }
})