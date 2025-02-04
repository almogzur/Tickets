import { infoFiledsType } from "@/components/admin/newEvent/types/new-event-types";
import dayjs from "dayjs";
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
            image: undefined,
            preview: "",
            isEventClosedForSeal: false,
            Date: "",
            Hour: "",
            OpenDorHour: "",
            availableSeatsAmount: undefined
        },
        setInfoFileds: function (value: SetStateAction<infoFiledsType>): void {
            throw new Error("Function not implemented.");
        }
    }
)