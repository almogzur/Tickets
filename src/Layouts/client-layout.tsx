import { Box, Container , Stack as Flex, GlobalStyles, useTheme } from "@mui/material";
import ClientNavbar from "../components/client/Navbar"
import Head from "next/head";
import { ReactNode } from "react";




interface ClientLayoutPropsType  {
    children?:ReactNode,
    noScrool?:boolean,
    HeaderName:string
  }

const ClientLayout = (props:ClientLayoutPropsType) => {
    const theme = useTheme()

  const {children, noScrool, HeaderName} = props
  return (
    <>
         <Head >
            <title>{HeaderName}</title>

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
 const FullHeightPage = ({children,noScrool}:{children:ReactNode, noScrool?:boolean ,HeaderName:string}) => {
  const theme = useTheme()

   return<Box sx={{
    direction:"ltr",
    height:"100vh",
    background:"black",
    overflowY: noScrool? 'clip' : 'scroll', 
    '&::-webkit-scrollbar': {
      width: '5px',
  },
   '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 2px rgba(0,0,0,0.00)`,
      webkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,0.00)',
 },
   '&::-webkit-scrollbar-thumb': {
     background:theme.palette.secondary.main,
 }


    



  }} >
  {children}

</Box>
}



