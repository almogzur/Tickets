import { createContext } from "react";

import { Positions } from "@/pages/_app";

interface ClientTransformContext {
    ClientMapPositions:Positions
    setClientMapPositions:React.Dispatch<React.SetStateAction<Positions>>
}

export default createContext<ClientTransformContext>({
    ClientMapPositions:{
        x: undefined,
        y: undefined
    },
    setClientMapPositions:():void=>{
            throw new Error("this is placeholder")
    }
})