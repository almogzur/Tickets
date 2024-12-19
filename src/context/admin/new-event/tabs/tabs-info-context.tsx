import { InfoFormType } from "@/pages/_app";
import { createContext, Dispatch, SetStateAction } from "react";

interface InfoTabContextType {
    infoFileds:InfoFormType
    setInfoFileds:Dispatch<SetStateAction<InfoFormType>>
}

export default createContext<InfoTabContextType>(
    {
        infoFileds:{
            keys: {
                name: undefined,
                location: undefined,
                cat: undefined
            },
            theater: undefined
        },
        setInfoFileds: function (value: SetStateAction<InfoFormType>): void {
            throw new Error("Function not implemented.");
        }
    }
)