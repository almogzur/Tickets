import { Box, Container , Stack as Flex, GlobalStyles, useTheme } from "@mui/material";
import ClientNavbar from "../components/client/Navbar"
import Head from "next/head";
import { ReactNode } from "react";

const ClientLayout = ({ children }: any) => {
    const theme = useTheme()
  
  return (
    <>
        <GlobalStyles
         styles={{
          "html, body": {
            scrollbarWidth: "none", // For Firefox

          },
          "html::-webkit-scrollbar": {
            width: "10px",
          },
          " html::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          " html::-webkit-scrollbar-thumb": {
            background: theme.palette.secondary.main,
            borderRadius: "5px",
          },
          " html::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          }}
      />
       <FullHeightPage >

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
const FullHeightPage = ({children}:{children:ReactNode}) => (
  <div style={{
      background:"black",
      overflow:"clip",
      direction:"rtl"

    }} >
    {children}
    <style global jsx>{`
      html,
      body,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
  </div>
)



