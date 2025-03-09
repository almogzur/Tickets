import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect, useContext} from 'react'
import { Stack as Flex, Button, useTheme, Box } from '@mui/material';

import WidthContext from '@/context/WidthContext';
import React from 'react';
import ClineTransformContext from '@/context/client/event-page/client-tranform-contenx'
import { Positions, TheaterType } from '@/types/components-typs/admin/theater/admin-theater-types';
import { TiArrowBack } from "react-icons/ti";

import { ClientSelectedSeatType } from '@/types/pages-types/client/client-event-type';

import { useClientEvent } from '@/hooks/client/use-event';
import DrawerContent from '@/components/client/event-page/sidebar/sidebar-content';
import TheaterMap from '@/components/client/event-page/theater/client-theater-map';
import SideBarWraper from '@/components/client/event-page/sidebar/sidebar-wrapper';



// mote to theater types  after 


const DetailsPage = () => {


  // const { Event } = useContex(LiveEventContext)

  const theme = useTheme()
  const router = useRouter()
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)
  
  const { event_id } = router.query

  const { Event, isEventError } = useClientEvent(`${event_id}`);


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



    setClientEventTheaterState(Event?.info.Theater)
    setPageMaunted(true)
  }, [Event, event_id]) // refresh pages hendler 
  

 //Page State 

  const Wrapper = Flex,
            BackBTN = Button

  if ( !Event || ! pageMaunted){ return <div>loading...</div>;}

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


        <SideBarWraper
          ClientSelectedEvent={Event}
          wighetIsExp={wighetIsExp}
          eventSelectSeats={eventSelectSeats}
          setWighetIsExp={setWighetIsExp}
          
        >
          <DrawerContent
            //event 
            ClientSelectedEvent={Event}
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
        </SideBarWraper>

         {Event?.info?.Theater &&
          <Box
            width={"100%"}
            height={wighetIsExp && !md ? 0 : undefined}
          >
             <ClineTransformContext.Provider value={{ ClientMapPositions, setClientMapPositions }}>
              <TheaterMap
                event={Event}
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