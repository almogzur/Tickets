import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef, SetStateAction, } from 'react'
import ClientTheater  from '../../components/client/theater/client-theater'
import { Container , Typography as Heading , Stack as Flex  , Button, Typography, useTheme, Box, Chip } from '@mui/material';
import Map from '../../components/client/tom-map'
import ClientLayout from '../../Layouts/client-layout';
import { TbClockHour1 } from "react-icons/tb";

import useClientEvents from '@/lib/client/Hooks/useGetEvents';
import { EventsType } from '../api/client/events/R/get-events';
import { CldImage } from 'next-cloudinary';
import WidthContext from '@/context/WidthContext';
import DOMPurify from "isomorphic-dompurify";
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from 'react-icons/fa6';


const DetailsPage = ({}) => {  

  const router = useRouter()
const theme = useTheme()
  const {Events,isEventsError,isEventsValidating,updateEvents} = useClientEvents()

  const {id}  = router.query

  const FilteredEvent = Events?.find((event)=> event._id  === id )

  useEffect(()=>{
    setEvent(FilteredEvent)
  },[FilteredEvent])

  const [event ,setEvent]=useState<EventsType|undefined>(undefined)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const Datas = Flex


  if (!event) return <div>loading...</div>

  const sanitizedHtml = DOMPurify.sanitize(event.pre);

  return (
    <>
      <Head>
        <title>{event.eventName}</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>
      
      <ClientLayout> 


      <Typography 
              bgcolor={"black"} 
              color={theme.palette.common.white}
               
               variant={!sm ? "h5": !md? 'h4': 'h3'}
              textAlign={"center"}
               >
                {event.eventName}
        </Typography>
        
         <Datas direction={"row"} justifyContent={"center"} flexWrap={"wrap"} >

            <Chip
            avatar={<CgCalendarDates />
}
            label={
              <Typography sx={{color:theme.palette.info.main}} > תאריך: {event.Date}</Typography>
            }
          >
          </Chip>


          <Chip
           avatar={<TbClockHour1 />}

          label={
            <Typography sx={{color:theme.palette.info.main}}  >שעה :{event.Hour}</Typography>
          }
          >
          
          </Chip>

            <Chip
          
              avatar={
                <TbClockHour1 />

              }
              label={
               <Typography sx={{color:theme.palette.info.main}}  >שעת פתיחת דלתוד:{event.OpenDorHour}</Typography>
            }
            >

          
          </Chip>

          <Chip
          
              avatar={
                <FaLocationDot />

              }
              label={
               <Typography sx={{color:theme.palette.info.main}}  > מיקום : {event.TheaterName}</Typography>
            }
            >

          
          </Chip>
              
        </Datas>



          <Flex direction={"row"} bgcolor={"black"} justifyContent={"center"} p={5}>

                <CldImage
                src={event.preview}

                alt="Description of my image"
                width={!xs?260 : !sm?400 : !md? 450 : 600}
                height={!xs? 300: 400}
                />
            </Flex>
          
            <Typography
               textAlign={"center"}
               style={{background:"black",direction:"rtl"}}
               dangerouslySetInnerHTML={{__html:sanitizedHtml}}
          ></Typography>
      

       { event.Theater &&   <ClientTheater theater={event.Theater}  />}
      <Box height={300} bgcolor={"black"}   ></Box>
       {/* <Map/>    */}
      </ClientLayout>
    </>
  );
}










 
export default DetailsPage;