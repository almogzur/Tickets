import { Positions } from "@/types/components-typs/admin/theater/admin-theater-types";
import { createContext, SetStateAction } from "react";


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