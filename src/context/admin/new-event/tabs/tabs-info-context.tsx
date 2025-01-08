import { InfoFormType } from "@/pages/admin/new-event";
import dayjs from "dayjs";
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
            pre: "",
            cat: "",
            TheaterName: "",
            Theater: undefined,
            image: undefined,
            preview: "",
            isEventClosedForSeal: false,
            Date: null,
            Hour:null,
            OpenDorHour: null
},
        setInfoFileds: function (value: SetStateAction<InfoFormType>): void {
            throw new Error("Function not implemented.");
        }
    }
)