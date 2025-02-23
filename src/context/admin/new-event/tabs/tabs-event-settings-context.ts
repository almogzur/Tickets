import { EventSettingType } from "@/types/pages-types/admin/admin-event-types";
import { createContext, Dispatch, SetStateAction } from "react";

interface TabEventSettingsContest {
    settings:EventSettingType
    setSetting:Dispatch<SetStateAction<EventSettingType>>
}


export default createContext<TabEventSettingsContest>({
    settings: {
        canSelectNotRelatedSites: true,
        limitClientTicket: true,
        ticketLimit: ""
    },
    setSetting: function (value: SetStateAction<EventSettingType>): void {
        throw new Error("Function not implemented.");
    }
})