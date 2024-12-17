import { InfoFormType } from "@/pages/_app";
import { createContext, Dispatch, SetStateAction } from "react";

interface InfoTabContextType {
    infoFileds:InfoFormType
    setInfoFileds:Dispatch<SetStateAction<InfoFormType>>
}

export default createContext<InfoTabContextType>(null)