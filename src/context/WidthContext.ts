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

export default  createContext<WidthContext>({
  xl:false,
  xxl: false,
  lg: false,
  md: false,
  sm: false,
  xs: false,
  xxs: false
})

