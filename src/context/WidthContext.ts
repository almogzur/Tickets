import {createContext} from "react";

export default  createContext<ScreenSize  | null>(null)

interface ScreenSize {
    xxl:Boolean,
    xl:Boolean,
    lg:Boolean,
    md:Boolean,
    sm:Boolean,
    xs:Boolean,
    xxs:Boolean
}
