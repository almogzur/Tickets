import { createContext, SetStateAction } from "react";

import { Positions } from "@/pages/_app";

interface AdminTransformContext {
    AdminMapPositions:Positions
    setAdminMapPositions:React.Dispatch<React.SetStateAction<Positions>>
}



export default createContext<AdminTransformContext>({
    AdminMapPositions:{
        x:0,
        y: 0
    },
    setAdminMapPositions: function (value: SetStateAction<Positions>): void {
        throw new Error("Function not implemented.");
    }
})