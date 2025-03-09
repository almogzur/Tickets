import Head from "next/head";
import FullHeightPage, { FullHeightPagePropsType } from "@/mui-components/full-height-page";
import { EventsProvider } from "@/context/client/client-events-context";
import ClientNavbar from "@/components/client/Navbar";



interface  ClientLayoutPropsType  extends FullHeightPagePropsType  {
  
}

const  ClientLayout = (props:ClientLayoutPropsType) => {
    
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
 
export default ClientLayout;


// new only event [id] layout 
// fix scroll on under 600 expended 

// see https://gist.github.com/dmurawsky/d45f068097d181c733a53687edce1919


