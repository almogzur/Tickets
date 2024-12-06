import { createContext } from "react";

interface MapContextType {
    x:number
    y:number
    S:number
    setY:React.Dispatch<React.SetStateAction<number>>
    setX:React.Dispatch<React.SetStateAction<number>>
    setS:React.Dispatch<React.SetStateAction<number>>
}

export default createContext<MapContextType>(null)