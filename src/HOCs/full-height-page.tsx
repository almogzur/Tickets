import { Box, useTheme } from "@mui/material"
import { ReactNode } from "react"

const FullHeightPage = ({children,noScrool}:{children:ReactNode, noScrool?:boolean ,HeaderName?:string}) => {
    const theme = useTheme()
  
     return<Box sx={{
      direction:"rtl",
      height:"100vh",
      background:"black",
      overflowY: noScrool? 'clip' : 'scroll', 
      overflowX:"clip",
      scrollbarWidth: 'none', // "auto", "thin", or "none"
      scrollbarColor: `${theme.palette.secondary.main} transparent`, // thumb and track colors
    }} >
    {children}
  
  </Box>
  }
  
  export default FullHeightPage