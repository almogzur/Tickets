import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef, SetStateAction, } from 'react'
import { Container, Typography as Heading, Stack as Flex, Button, Typography, useTheme, Box, Chip } from '@mui/material';
import Map from '@/pages-components/client/event-page/tom-map'

import WidthContext from '@/context/WidthContext';
import React from 'react';
import ClineTransformContext from '@/context/client/event-page/client-tranform-contenx'
import { Positions, TheaterType } from '@/types/components-typs/admin/theater/admin-theater-types';
import { TiArrowBack } from "react-icons/ti";
import { ClientEventType, } from '@/types/pages-types/admin/new-event-types';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import ClientLayout from '@/Wrappers/client';
import DrawerContent from '@/pages-components/client/event-page/drawer/drawer-content';
import DrawerWighet from '@/pages-components/client/event-page/drawer/info-drawer-wighet';
import TheaterMap from '@/pages-components/client/event-page/theater/client-theater-map';
import { ClientSelectedSeatType } from '@/types/pages-types/client/client-event-type';




export const getServerSideProps  =( 
  async (context:any) =>
{
    try {
      const response = await axios.get<ClientEventType[]>( `${process.env.NEXTAUTH_URL}/api/client/events/get-events`);
      if(response.status=== 200){
         return { props: { Events: response.data } };
      }
      return { props: { Events: [] } }
  }
  catch (error) {
   console.error("Error fetching events:", error);
  return { props: { Events: [] } }; // Return an empty array as a fallback
}
}) satisfies GetServerSideProps<{ Events: ClientEventType[] }>


// mote to theater types  after 


const DetailsPage = ({ Events }: { Events: ClientEventType[] }) => {




  // const { Event } = useContex(LiveEventContext)

  const theme = useTheme()
  const router = useRouter()
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)
  const [ClientMapPositions, setClientMapPositions] = useState<Positions>({ x: 0, y: 0, Scale: undefined })


 //Page State 
  const { id } = router.query
  const FilteredEvent = Events?.find((event) => event._id === id)
  const [eventState, setEventState] = useState<ClientEventType | undefined>(undefined)
  const [wighetIsExp, setWighetIsExp] = useState<boolean>(false)


  // Event State 
  const [clientEventTheaterState, setClientEventTheaterState] = useState<TheaterType>()
  const [eventSelectSeats, setEventSelectedSeats] = useState<ClientSelectedSeatType[]>([])
  const [hendlerSeatOldValues, setHendlerSeatOldValues] = useState<Record<string, number>>({});



  const Wrapper = Flex,
            BackBTN = Button

  // update the event state from db
  useEffect(() => { setEventState(FilteredEvent) }, [FilteredEvent])


  // update the event Theater state  from db 
  useEffect(() => {
    if (FilteredEvent) {
      setClientEventTheaterState(FilteredEvent.info.Theater)
    }
  }, [FilteredEvent])

  if (!eventState || !FilteredEvent) return <div>loading...</div>

  return (

    <ClientLayout noScrool HeaderName={eventState.info.eventName} >
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
          onClick={() => { router.push("/") }}
        >
          <TiArrowBack size={"2em"} color='black' />

        </BackBTN>


        <DrawerWighet
          wighetIsExp={wighetIsExp}
          eventSelectSeats={eventSelectSeats}
          setWighetIsExp={setWighetIsExp}
          event={FilteredEvent}
        >
          <DrawerContent
            //event 
            event={eventState}
            setEventState={setEventState}
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
        </DrawerWighet>

        {eventState.info.Theater &&
          <Box
            width={"100%"}
            height={wighetIsExp && !md ? 0 : undefined}
          >
            <ClineTransformContext.Provider value={{ ClientMapPositions, setClientMapPositions }}>
              <TheaterMap
                event={FilteredEvent}
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
    </ClientLayout>

  );
}





export default DetailsPage;