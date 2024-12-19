import { createContext, SetStateAction } from "react";

import { Positions } from "@/pages/_app";

interface AdminTransformContext {
    AdminMapPositions:Positions
    setAdminMapPositions:React.Dispatch<React.SetStateAction<Positions>>
}



export default createContext<AdminTransformContext>({
    AdminMapPositions:{
        x:undefined,
        y: undefined
    },
    setAdminMapPositions: function (value: SetStateAction<Positions>): void {
        throw new Error("Function not implemented.");
    }
})