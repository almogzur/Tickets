import Head from 'next/head'

import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef, SetStateAction, } from 'react'
import { Container , Typography as Heading , Stack as Flex  , Button, Typography, useTheme, Box, Chip } from '@mui/material';
import Map from '../../components/client/event-page/tom-map'
import ClientLayout from '../../Layouts/client-layout';

import useClientEvents from '@/lib/client/Hooks/useGetEvents';
import { EventsType } from '../api/client/events/R/get-events';
import WidthContext from '@/context/WidthContext';

import TheaterMap from '@/components/client/event-page/theater/client-theater-mao';
import { grey } from '@mui/material/colors';
import ClientInfoDrawer from '@/components/client/event-page/info-drawer';
import React from 'react';


import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from 'react-icons/fa6';
import { TbClockHour1 } from "react-icons/tb";
import { CldImage } from 'next-cloudinary';
import DOMPurify from "isomorphic-dompurify";


const DetailsPage = ({}) => {  

  const router = useRouter()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  
  const {Events,isEventsError,isEventsValidating,updateEvents} = useClientEvents()
  const {id}  = router.query
  const FilteredEvent = Events?.find((event)=> event._id  === id )

  const [eventState ,setEventState]=useState<EventsType|undefined>(undefined)


  const   TheaterFlex = Flex,
              Wrapper = Flex

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
                alignItems={!md? '': "start"}
                width={"100%"}
                height={"100dvh"}

              >   
             <ClientInfoDrawer >
                  <DrawerContent event={eventState}/>
            </ClientInfoDrawer>

           <TheaterFlex  
                sx={{    width:'inherit',margin:0 , height : "inherit" }} 
                >
               { eventState.Theater &&   <TheaterMap theater={eventState.Theater}/> }
              {/* <Map/>       */}
          </TheaterFlex>

          </Wrapper>

      </ClientLayout>
    </>
  );
}



const DrawerContent = ({event}:{event :EventsType})=>{
  const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
  const sanitizedHtml = DOMPurify.sanitize(event.pre);
  const theme = useTheme()

  const Pre=Typography,
  Datas = Flex
  const data  = false

  return(
    <Flex
    bgcolor={"#ddd"}
    alignItems={"center"}
    overflow={"scroll"}
    height={"inherit"}
    pt={2}
    
   >
    {
      data 
      ?
         ""
      :
      < >
      <CldImage
            src={event.preview}
            alt="Description of my image"
            width={300}
            height={!xs? 300: 400}
            draggable={false}
            />

      <Typography 
      color={theme.palette.common.white}
       variant={'h4'}
      textAlign={"center"}
       >
        {event.eventName}
     </Typography>
     <Datas alignItems={"start"}   >
            <Chip
            avatar={<FaLocationDot />}
             label={<Typography sx={{color:"#ddd"}}  > מיקום : {event.TheaterName}</Typography>}
            />
            <Chip
              avatar={<CgCalendarDates />}
              label={<Typography  sx={{color:"#ddd"}}> תאריך: {event.Date}</Typography>}
            />
            <Chip
             avatar={<TbClockHour1 />}
            label={  <Typography sx={{color:"#ddd"}}  >שעה :{event.Hour}</Typography>}
            />
            <Chip
            avatar={   <TbClockHour1 />}
            label={<Typography  sx={{color:"#ddd"}}>שעת פתיחת דלתוד:{event.OpenDorHour?.toString().slice(0,10)}</Typography>}
              />
     </Datas>
       <Box overflow={'scroll'} height={300}  bgcolor={"inherit"} p={2} m={2} >
         <Pre
             textAlign={"center"}
             style={{background:'inherit',direction:"rtl"}}
             dangerouslySetInnerHTML={{__html:sanitizedHtml}}
          />
      </Box>
      <Box width={"inhreit"} height={100} ></Box>
      
      </>
      
    }

  </Flex>

  )

 

 
}



export default DetailsPage;