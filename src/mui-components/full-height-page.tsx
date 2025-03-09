import { Box, useTheme } from "@mui/material"
import { ReactNode } from "react"



export type  FullHeightPagePropsType =   {
  children?:ReactNode,
  noScrool?:boolean,
  HeaderName?:string
}




const FullHeightPage = ({children,noScrool}:FullHeightPagePropsType) => {
    const theme = useTheme()
  
     return<Box sx={{
      direction:"rtl",
      height:"100dvh",
      background:"black",
      overflowY: noScrool? 'clip' : 'scroll', 
      overflowX:"clip",
      scrollbarWidth: 'none', // "auto", "thin",  "none"
      scrollbarColor: `${theme.palette.secondary.main} transparent`, // thumb and track colors
    }} >
    {children}
  
  </Box>
  }
  
  export default FullHeightPage