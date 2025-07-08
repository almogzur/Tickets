import { RequestStatusType } from "@/types/pages-types/client/client-event-type";
import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tabValue:number
    setTabValue:Dispatch<SetStateAction<number>>
    isLoading:boolean
    setIsLoading:Dispatch<SetStateAction<boolean>>
    saveNewEventRequestStatus: RequestStatusType
    setSaveNewEventRequestStatus:Dispatch<SetStateAction<RequestStatusType>>
    loadingScreenText:string|undefined
    setLoadingScreenText:Dispatch<SetStateAction<string|undefined>>
}

export default createContext<TicketContextType>({
    tabValue: 0,
    isLoading: false,
    saveNewEventRequestStatus: undefined,
    loadingScreenText: undefined,
    setTabValue: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    setIsLoading: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    },
    setSaveNewEventRequestStatus: function (value: SetStateAction<RequestStatusType>): void {
        throw new Error("Function not implemented.");
    },
    setLoadingScreenText: function (value: SetStateAction<string | undefined>): void {
        throw new Error("Function not implemented.");
    }
})