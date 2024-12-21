import { InfoFormType } from "@/pages/admin/new-event";
import { createContext, Dispatch, SetStateAction } from "react";

interface InfoTabContextType {
    infoFileds:InfoFormType
    setInfoFileds:Dispatch<SetStateAction<InfoFormType>>
}

// explane the context why need to be here  ?

export default createContext<InfoTabContextType>(
    {
        infoFileds:{
                eventName: "",
                location: "",
                cat: "",
                theater: undefined,
                day: undefined,
                isEventClosedForSeal: false,
                closingSealesDate: undefined,
                pre: "",
                image: undefined,
                 preview: ""
        },
        setInfoFileds: function (value: SetStateAction<InfoFormType>): void {
            throw new Error("Function not implemented.");
        }
    }
)