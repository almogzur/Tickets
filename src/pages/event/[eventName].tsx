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
import ClientWrapper from '@/Wrappers/client';
import DrawerContent from '@/pages-components/client/event-page/drawer/drawer-content';
import DrawerWighet from '@/pages-components/client/event-page/drawer/info-drawer-wighet';
import TheaterMap from '@/pages-components/client/event-page/theater/client-theater-map';
import { ClientSelectedSeatType } from '@/types/pages-types/client/client-event-type';

import ClientSelectedEventContext from '@/context/client/event-page/selected-event-context'




// mote to theater types  after 


const DetailsPage = ({ Events }: { Events: ClientEventType[] }) => {





  // const { Event } = useContex(LiveEventContext)

  const theme = useTheme()
  const router = useRouter()
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)
  const [ClientMapPositions, setClientMapPositions] = useState<Positions>({ x: 0, y: 0, Scale: undefined })


 //Page State 
  const { eventName } = router.query

  const [wighetIsExp, setWighetIsExp] = useState<boolean>(false)


  // Event State 
  const {  ClientSelectedEvent , setClientSelectedEvent} = useContext(ClientSelectedEventContext)

  const [clientEventTheaterState, setClientEventTheaterState] = useState<TheaterType|undefined>(ClientSelectedEvent?.info.Theater)
  const [eventSelectSeats, setEventSelectedSeats] = useState<ClientSelectedSeatType[]>([])
  const [hendlerSeatOldValues, setHendlerSeatOldValues] = useState<Record<string, number>>({});



  const Wrapper = Flex,
            BackBTN = Button

  useEffect(() => {
    if (ClientSelectedEvent) {
      setClientEventTheaterState
    }
    // setNoScrool(true) IMPORTENTT ADD THIS 
  }, [ClientSelectedEvent])

  if ( !ClientSelectedEvent) return <div>loading...</div>

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
          onClick={() => { router.push("/") }}
        >
          <TiArrowBack size={"2em"} color='black' />

        </BackBTN>


        <DrawerWighet
          wighetIsExp={wighetIsExp}
          eventSelectSeats={eventSelectSeats}
          setWighetIsExp={setWighetIsExp}
        >
          <DrawerContent
            //event 

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