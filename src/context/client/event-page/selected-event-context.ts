import { ClientEventType } from "@/types/pages-types/admin/new-event-types"
import { createContext, Dispatch, SetStateAction } from "react"

interface ClientSelectedEventType  {
    ClientSelectedEvent:ClientEventType|undefined
    setClientSelectedEvent:Dispatch<SetStateAction<ClientEventType|undefined>>
    
}

export default createContext<ClientSelectedEventType>({
    ClientSelectedEvent: {
        info: {
            eventName: "",
            cat: "",
            pre: "",
            TheaterName: "",
            availableSeatsAmount: 0,
            preview: "",
            isEventClosedForSeal: false,
            Date: "",
            Hour: "",
            OpenDoors: ""
        },
        tickets: [],
        eventSetting: {
            canSelectNotRelatedSites: false,
            limitClientTicket: false,
            ticketLimit: ""
        },
        publicId: ""
    },
    setClientSelectedEvent: function (value: SetStateAction<{ info: { eventName: string; cat: string; pre: string; TheaterName: string; availableSeatsAmount: number; preview: string; isEventClosedForSeal: boolean; Date: string; Hour: string; OpenDoors: string; Theater?: { mainSeats: Record<string, number[]>; sideSeats: Record<string, number[]>; textsStyle: Record<string, any>; styles: Record<string, any>; ThaeaterName: string; TheaterLocation: { alt: string; lot: string; city: string; address: string }; TheaterMainPhone: string } | undefined }; tickets: { EndSealesHour: string | null; EndSealesDate: string | null; selectedType: "" | "normal" | "discount"; priceInfo: string; price: string }[]; eventSetting: { canSelectNotRelatedSites: boolean; limitClientTicket: boolean; ticketLimit: string }; publicId: string; _id?: string | undefined } | undefined>): void {
        throw new Error("Function not implemented.")
    }
})

    