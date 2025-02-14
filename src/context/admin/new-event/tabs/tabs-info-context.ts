import { infoFiledsType } from "@/types/pages-types/admin/new-event-types";
import { createContext, Dispatch, SetStateAction } from "react";

interface InfoTabContextType {
    infoFileds:infoFiledsType
    setInfoFileds:Dispatch<SetStateAction<infoFiledsType>>
}

// explane the context why need to be here  ?

export default createContext<InfoTabContextType>(
        {
        infoFileds:{
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
        setInfoFileds: function (value: SetStateAction<infoFiledsType>): void {
            throw new Error("Function not implemented.");
        }
    }
)