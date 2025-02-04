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
import React from 'react';

import ClineTransformContext from '@/context/client/event-page/client-tranform-contenx'

import { Positions, TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import DrawerContent from '@/components/client/event-page/drawer/drawer-content';
import DrawerWighet from '@/components/client/event-page/drawer/info-drawer-wighet';

import { TiArrowBack } from "react-icons/ti";


// mote to theater types  after 
export type  SeatType  = {
      row:string,
      seatNumber:number
      value:number
      price:string,
      priceInfo?:string
}

const DetailsPage = ({}) => {  

  const theme = useTheme()
  const router = useRouter()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const [ClientMapPositions , setClientMapPositions] =useState<Positions>({ x:0 ,y:0 ,Scale:undefined})
  const {Events,isEventsError,isEventsValidating,updateEvents} = useClientEvents()
  const { id }  = router.query
  const FilteredEvent = Events?.find((event)=> event._id  === id )


  const [eventState ,setEventState]=useState<EventsType|undefined>(undefined)

   // Theater State lifted up to pass  and passed to  ticket list  to gain theater handler functinalty 
  const [ clientEventTheaterState , setClientEventTheaterState ]=useState<TheaterType>()
  const [ eventSelectSeats, setEventSelectedSeats ] = useState<SeatType[]>([])
  const [hendlerSeatOldValues, setHendlerSeatOldValues] = useState<Record<string, number>>({});
 // Theater State lifted up to pass  and passed to  ticket list  to gain theater handler functinalty 

   // Wighet lifted up State 
 const [wighetIsExp , setWighetIsExp  ]= useState<boolean>(false)


  const   TheaterFlex = Flex,
                Wrapper = Flex,
                 BackBTN = Button

   // update the event state 
     useEffect(()=>{
      setEventState(FilteredEvent)
         },[FilteredEvent])


   // update the event Theater state 
   useEffect(()=>{
               if(FilteredEvent){
                  setClientEventTheaterState(FilteredEvent.Theater)
               }
       
         },[FilteredEvent])
       
  if (!eventState) return <div>loading...</div>

  return (
    
      <ClientLayout noScrool  HeaderName={eventState.eventName} > 
         <Wrapper 
                direction={ !md ? 'column':  "row"} 
                sx={{ 
                  width:"100%",
                  height:"100%",
                 }}
              >   
               <BackBTN
                     color='secondary'
                  sx={{
                     position:"absolute",
                     left:"3%",
                     top: !md ? "10%" : "13%",
                     borderRadius:45 ,
                       p:2, 
                       scale:!md? 0.7 : 1,
                       zIndex:5
                     
                  }}
                  onClick={()=>{router.push("/")}}
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

            { eventState.Theater &&  
             <Box
               width={"100%"}
               height={ wighetIsExp && !md ? 0 : undefined  }

              >
               <ClineTransformContext.Provider value={{ClientMapPositions ,setClientMapPositions}}>

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