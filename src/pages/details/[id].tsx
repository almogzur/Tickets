import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef, SetStateAction, } from 'react'
import { Container , Typography as Heading , Stack as Flex  , Button, Typography, useTheme, Box, Chip } from '@mui/material';
import Map from '../../components/client/event-page/tom-map'
import ClientLayout from '../../Layouts/client-layout';

import useClientEvents from '@/lib/client/Hooks/useGetEvents';
import { EventsType } from '../api/client/events/R/get-events';
import WidthContext from '@/context/WidthContext';

import TheaterMap from '@/components/client/event-page/theater/client-theater-map';
import { grey } from '@mui/material/colors';
import ClientInfoDrawer from '@/components/client/event-page/drawer/info-drawer';
import React from 'react';

import ClineTransformContext from '@/context/client/event-page/client-tranform-contenx'

import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from 'react-icons/fa6';
import { TbClockHour1 } from "react-icons/tb";
import { CldImage } from 'next-cloudinary';
import { Positions } from '@/components/admin/newEvent/theater/types/theater-types';
import DrawerContent from '@/components/client/event-page/drawer/drawer-content';

// mote to theater types  after 
export type  SeatType  = {
      row:string,
      seatNumber:number
      value:number
}

const DetailsPage = ({}) => {  

  const router = useRouter()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()
  const [ClientMapPositions , setClientMapPositions] =useState<Positions>({ x:0 ,y:0 ,Scale:undefined})
  


  const {Events,isEventsError,isEventsValidating,updateEvents} = useClientEvents()
  const {id}  = router.query
  const FilteredEvent = Events?.find((event)=> event._id  === id )

  const [eventState ,setEventState]=useState<EventsType|undefined>(undefined)

  const [ eventSelectSeats, setEventSelectedSeats ] = useState<SeatType[]>([])


  const   TheaterFlex = Flex, Wrapper = Flex, PreBox = Box

     useEffect(()=>{
      setEventState(FilteredEvent)
         },[FilteredEvent])
            
 
  if (!eventState) return <div>loading...</div>

  return (
    <>
      <Head>
         <title>{eventState?.eventName}</title>
         <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>

      <ClientLayout> 

         <Wrapper 

                direction={ !md ? 'column':  "row"} 
                sx={{ 
                  width:"100%",
                  
                  height:"100%"
    
                  
                 }}
              >   
         
            <ClientInfoDrawer >
                  <DrawerContent 
                     event={eventState}
                     setEventState={setEventState}


                     eventSelectSeats={eventSelectSeats}
                     setEventSelectedSeats={setEventSelectedSeats}
                   
                  />
            </ClientInfoDrawer>

            <ClineTransformContext.Provider value={{ClientMapPositions ,setClientMapPositions}}>

            { eventState.Theater &&  
             <TheaterMap 
                theater={eventState.Theater}
                 setEventSelectedSeats={setEventSelectedSeats} 
                 eventSelectSeats={eventSelectSeats}
                 
                /> 
             }

           </ClineTransformContext.Provider>


             {/* <Map/>*/}


         </Wrapper>

      </ClientLayout>
    </>
  );
}





export default DetailsPage;