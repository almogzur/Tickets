import { Box, useTheme } from "@mui/material"
import { ReactNode } from "react"



export type  FullHeightPagePropsType =   {
  children?:ReactNode,
  noScroll?:boolean,
  HeaderName?:string
}




const FullHeightPage = ({children,noScroll}:FullHeightPagePropsType) => {
    const theme = useTheme()
  
     return<Box sx={{
      direction:"rtl",
      height:"100dvh",
      background:"black",
      overflowY: noScroll? 'clip' : 'scroll', 
      overflowX:"clip",
      scrollbarWidth: 'none', // "auto", "thin",  "none"
      scrollbarColor: `${theme.palette.secondary.main} transparent`, // thumb and track colors
    }} >
    {children}
  
  </Box>
  }
  
  export default FullHeightPage