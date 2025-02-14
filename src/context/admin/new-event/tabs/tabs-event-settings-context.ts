import { EventSettingType } from "@/types/pages-types/admin/new-event-types";
import { createContext, Dispatch, SetStateAction } from "react";

interface TabEventSettingsContest {
    eventSetting:EventSettingType
    setEventSetting:Dispatch<SetStateAction<EventSettingType>>
}


export default createContext<TabEventSettingsContest>({
    eventSetting: {
        canSelectNotRelatedSites: true,
        limitClientTicket: true,
        ticketLimit: ""
    },
    setEventSetting: function (value: SetStateAction<EventSettingType>): void {
        throw new Error("Function not implemented.");
    }
})