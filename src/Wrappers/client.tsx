import ClientNavbar from "@/pages-components/client/Navbar";
import { Box, Container , Stack as Flex, GlobalStyles, useTheme } from "@mui/material";
import Head from "next/head";
import { ReactNode, useEffect, useMemo, useState } from "react";
import ClientSelectedEventContest from '@/context/client/event-page/selected-event-context'
import { ClientEventType } from "@/types/pages-types/admin/new-event-types";
import ClientSelectedEventContext from '@/context/client/event-page/selected-event-context'
import FullHeightPage from "@/HOCs/full-height-page";




interface ClientLayoutPropsType  {
    children?:ReactNode,
    noScrool?:boolean,
    HeaderName?:string
  }

const  ClientWrapper = (props:ClientLayoutPropsType) => {
    
    const [ ClientSelectedEvent , setClientSelectedEvent ] = useState<ClientEventType>()

  const {children, noScrool, HeaderName} = props

  return (
    <>
        <Head>
          <title>{HeaderName}</title>
          <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>
    
      <ClientSelectedEventContext.Provider value={{ClientSelectedEvent,setClientSelectedEvent}} >

      <FullHeightPage  noScrool={noScrool}  HeaderName={HeaderName} >

         <ClientNavbar />
           { children }
      </FullHeightPage>
      </ClientSelectedEventContext.Provider>

      </>
    
  );
}
 
export default ClientWrapper;


// new only event [id] layout 
// fix scroll on under 600 expended 

// see https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919


