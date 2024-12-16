import { createContext } from "react";

import { Positions } from "@/pages/_app";

interface AdminTransformContext {
    AdminMapPositions:Positions
    setAdminMapPositions:React.Dispatch<React.SetStateAction<Positions>>
}

export default createContext<AdminTransformContext|null>(null)