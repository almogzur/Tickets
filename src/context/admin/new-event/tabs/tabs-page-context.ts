import { RequestStatusType } from "@/types/pages-types/client/client-event-type";
import { createContext, Dispatch, SetStateAction } from "react";


interface TicketContextType {
    tabValue:number
    setTabValue:Dispatch<SetStateAction<number>>
    isLoading:boolean
    setIsLoading:Dispatch<SetStateAction<boolean>>
    SaevNewEventReqestStatus: RequestStatusType
    setSaevNewEventReqestStatus:Dispatch<SetStateAction<RequestStatusType>>
    loadingScrenText:string|undefined
    setLoadingScrenText:Dispatch<SetStateAction<string|undefined>>
}

export default createContext<TicketContextType>({
    tabValue: 0,
    isLoading: false,
    SaevNewEventReqestStatus: undefined,
    loadingScrenText: undefined,
    setTabValue: function (value: SetStateAction<number>): void {
        throw new Error("Function not implemented.");
    },
    setIsLoading: function (value: SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    },
    setSaevNewEventReqestStatus: function (value: SetStateAction<RequestStatusType>): void {
        throw new Error("Function not implemented.");
    },
    setLoadingScrenText: function (value: SetStateAction<string | undefined>): void {
        throw new Error("Function not implemented.");
    }
})