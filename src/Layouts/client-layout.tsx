import { Box, Container , Stack as Flex, GlobalStyles, useTheme } from "@mui/material";
import ClientNavbar from "../components/client/Navbar"
import Head from "next/head";
import { ReactNode } from "react";




interface ClientLayoutPropsType  {
    children?:ReactNode,
    noScrool?:boolean,
    HeaderName?:string
  }

const  ClientLayout = (props:ClientLayoutPropsType) => {
    const theme = useTheme()

  const {children, noScrool, HeaderName} = props
  return (
    <>
        <Head>
          <title>{HeaderName}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>
          <FullHeightPage  noScrool={noScrool}  HeaderName={HeaderName} >

         <ClientNavbar />
           { children }
  
      </FullHeightPage>
      </>
    
  );
}
 
export default ClientLayout;


// new only event [id] layout 
// fix scroll on under 600 expended 

// see https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919
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



