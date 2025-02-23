import ClientNavbar from "@/pages-components/client/Navbar";
import { Box, Container , Stack as Flex, GlobalStyles, useTheme } from "@mui/material";
import Head from "next/head";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";
import FullHeightPage, { FullHeightPagePropsType } from "@/HOCs/full-height-page";
import { EventsProvider } from "@/context/client/client-events-context";



interface  ClientLayoutPropsType  extends FullHeightPagePropsType  {
  
}

const  ClientWrapper = (props:ClientLayoutPropsType) => {
    
   const {children, noScrool, HeaderName} = props

  return (
    <>
        <Head>
          <title>{HeaderName}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>
     {/*  to prevent re fetching in page navigation  ofter the user click the eventState is set in the global context of client layout */}
     <EventsProvider>
      <FullHeightPage  noScrool={noScrool}  HeaderName={HeaderName} >
          <ClientNavbar />
            { children }
      </FullHeightPage>
      </EventsProvider>



      </>
    
  );
}
 
export default ClientWrapper;


// new only event [id] layout 
// fix scroll on under 600 expended 

// see https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919


