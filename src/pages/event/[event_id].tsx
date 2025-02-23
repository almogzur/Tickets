import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect, useContext} from 'react'
import { Stack as Flex, Button, useTheme, Box } from '@mui/material';
import Map from '@/pages-components/client/event-page/sidebar/tom-map'

import WidthContext from '@/context/WidthContext';
import React from 'react';
import ClineTransformContext from '@/context/client/event-page/client-tranform-contenx'
import { Positions, TheaterType } from '@/types/components-typs/admin/theater/admin-theater-types';
import { TiArrowBack } from "react-icons/ti";

import DrawerContent from '@/pages-components/client/event-page/sidebar/sidebar-content';
import SideBar from '@/pages-components/client/event-page/sidebar/sidebar-wrapper';
import TheaterMap from '@/pages-components/client/event-page/theater/client-theater-map';
import { ClientSelectedSeatType } from '@/types/pages-types/client/client-event-type';
import { useEvents } from '@/context/client/client-events-context';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types';


export const getServerSideProps: GetServerSideProps<{ Event: ClientEventType | null }> = async (context) => {
  try {
    const { event_id } = context.query; // Get event ID from URL params
    if (!event_id || typeof event_id !== "string") {
      return { props: { Event: null } }; // Handle missing or invalid ID
    }

    const baseUrl = `${process.env.NEXTAUTH_URL}` // Use proper environment variable
    const response = await axios.get<ClientEventType>(`${baseUrl}/api/client/events/get-event-by-id`, {
      params: { event_id }, // Pass ID as query param
    });

    return {
      props: { Event: response.status === 200 ? response.data : null },
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return { props: { Event: null } }; // Keep consistent type
  }
};




// mote to theater types  after 


const DetailsPage = ({Event}:{ Event:ClientEventType|null}) => {


  // const { Event } = useContex(LiveEventContext)

  const theme = useTheme()
  const router = useRouter()
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)


  const ClientSelectedEvent = Event

  const [clientEventTheaterState, setClientEventTheaterState] = useState<TheaterType|undefined>()
  const [eventSelectSeats, setEventSelectedSeats] = useState<ClientSelectedSeatType[]>([])
 const [  pageMaunted, setPageMaunted] = useState<boolean>(false)
 
  // component leftedUpState

  //Theater
  const [hendlerSeatOldValues, setHendlerSeatOldValues] = useState<Record<string, number>>({});
  const [ClientMapPositions, setClientMapPositions] = useState<Positions>({ x: 0, y: 0, Scale: undefined })

  // Wighet
  const [wighetIsExp, setWighetIsExp] = useState<boolean>(false)


  useEffect(()=>{
    setClientEventTheaterState(ClientSelectedEvent?.info.Theater)
    setPageMaunted(true)
  }, [ClientSelectedEvent?.info.Theater]) // refresh pages hendler 
  

 //Page State 

  const Wrapper = Flex,
            BackBTN = Button

  if ( !ClientSelectedEvent || ! pageMaunted) return <div>loading...</div>

  return (

      <Wrapper
        direction={!md ? 'column' : "row"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <BackBTN
          color='secondary'
          sx={{
            position: "absolute",
            left: "3%",
            top: !md ? "10%" : "13%",
            borderRadius: 45,
            p: 2,
            scale: !md ? 0.7 : 1,
            zIndex: 5

          }}
          onClick={() => {
          return    router.push("/")
            

             }}
        >
          <TiArrowBack size={"2em"} color='black' />

        </BackBTN>


        <SideBar
          ClientSelectedEvent={ClientSelectedEvent}
          wighetIsExp={wighetIsExp}
          eventSelectSeats={eventSelectSeats}
          setWighetIsExp={setWighetIsExp}
          
        >
          <DrawerContent
            //event 
            ClientSelectedEvent={ClientSelectedEvent}
            // tikect list
            eventSelectSeats={eventSelectSeats}
            setEventSelectedSeats={setEventSelectedSeats}
            // theater  seates
            clientEventTheaterState={clientEventTheaterState}
            setClientEventTheaterState={setClientEventTheaterState}
            // old seate valuse  ( state to return the orgin icons and colors at  un-select )
            hendlerSeatOldValues={hendlerSeatOldValues}
            setHendlerSeatOldValues={setHendlerSeatOldValues}
          />
        </SideBar>

         {ClientSelectedEvent?.info.Theater &&
          <Box
            width={"100%"}
            height={wighetIsExp && !md ? 0 : undefined}
          >
             <ClineTransformContext.Provider value={{ ClientMapPositions, setClientMapPositions }}>
              <TheaterMap
                event={ClientSelectedEvent}
                // theater  seates
                clientEventTheaterState={clientEventTheaterState}
                setClientEventTheaterState={setClientEventTheaterState}
                // tikect list
                eventSelectSeats={eventSelectSeats}
                setEventSelectedSeats={setEventSelectedSeats}
                // old seate valuse  ( state to return the orgin icons and colors at  un-select )
                hendlerSeatOldValues={hendlerSeatOldValues}
                setHendlerSeatOldValues={setHendlerSeatOldValues}
              />
            </ClineTransformContext.Provider>
          </Box>
        }

        {/* <Map/>*/}

      </Wrapper>


  );
}





export default DetailsPage;