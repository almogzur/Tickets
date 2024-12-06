import {createContext} from "react";

interface WidthContext {  
     xxl:boolean
    xl:boolean
    lg:boolean
    md:boolean
    sm:boolean
    xs:boolean
    xxs:boolean
  }

export default  createContext<WidthContext>(null)

