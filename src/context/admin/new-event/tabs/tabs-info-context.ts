import { infoFieldsType } from "@/types/pages-types/admin/admin-event-types";
import { createContext, Dispatch, SetStateAction } from "react";

interface InfoTabContextType {
    infoFields:infoFieldsType
    setInfoFields:Dispatch<SetStateAction<infoFieldsType>>
}

// example the context why need to be here  ?

export default createContext<InfoTabContextType>(
        {
        infoFields:{
            eventName: "",
            pre: "",
            cat: "",
            TheaterName: '',
            Theater: undefined,
            preview: "",
            isEventClosedForSeal: false,
            Date: "",
            Hour: "",
            OpenDoors: "",
            availableSeatsAmount: 0
        },
        setInfoFields: function (value: SetStateAction<infoFieldsType>): void {
            throw new Error("Function not implemented.");
        }
    }
)