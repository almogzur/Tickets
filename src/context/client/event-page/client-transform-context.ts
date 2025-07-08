import { Positions } from "@/types/components-types/admin/theater/admin-theater-types";
import { createContext } from "react";


interface ClientTransformContext {
    ClientMapPositions:Positions
    setClientMapPositions:React.Dispatch<React.SetStateAction<Positions>>
}

export default createContext<ClientTransformContext>({
    ClientMapPositions:{
        x: 0,
        y: 0
    },
    setClientMapPositions:():void=>{
            throw new Error("this is placeholder")
    }
})