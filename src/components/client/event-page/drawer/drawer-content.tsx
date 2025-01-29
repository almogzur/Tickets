import WidthContext from "@/context/WidthContext";
import { EventsType } from "@/pages/api/client/events/R/get-events";
import { Box, Typography, Chip ,Stack as Flex , useTheme, Button } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { TbClockHour1 } from "react-icons/tb";
import DOMPurify from "isomorphic-dompurify";
import { SeatType } from "@/pages/details/[id]";
import ClientTikectList from "./client-tikets-list";
import { GiTakeMyMoney } from "react-icons/gi";

type DrawerContentType = {

    // event Data 
    event :EventsType
    setEventState:Dispatch<SetStateAction<EventsType|undefined>>


    /// Selected Seates 
    eventSelectSeats:SeatType[]
    setEventSelectedSeats:Dispatch<SetStateAction<SeatType[]>>
}

const DrawerContent = ({event, eventSelectSeats , setEventState, setEventSelectedSeats}:DrawerContentType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
    const sanitizedHtml = DOMPurify.sanitize(event.pre);
    const theme = useTheme()

    useEffect(()=>{
      console.log(eventSelectSeats,"Drawer Content see ")
    },[eventSelectSeats])
  
    const Pre=Box,
    Datas = Flex,
    PreBox= Box
    return(
        <Flex    
           alignItems={"center"}
          width={"100%"}
          pt={2}
          >

      { !eventSelectSeats.length && 
        <CldImage
              src={event.preview}
              alt="Description of my image"
              width={300}
              height={!xs? 300: 400}
              draggable={false}
              />
        }
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
               {event.tickets?.map((ticket)=>{
               return     <Chip key={ticket.price+event.eventName} 
                  avatar={<GiTakeMyMoney/>}
                  label={<Typography>{ticket.price} : {ticket.selectedType}</Typography>}
                  
                  />
               })}

       </Datas>

           { eventSelectSeats.length > 0   &&  

        <ClientTikectList
                eventSelectSeats = {eventSelectSeats}

            />
            }


      { !eventSelectSeats.length &&
      <>
 


 
       
  
             
           <Pre
            height={200}
             p={2}
              overflow={"scroll"}
              sx={{
  
              overflowY:"scrool",
              overflowX:'clip',
              '&::-webkit-scrollbar': {
                width: '3px',
                
              
                
              },
              '&::-webkit-scrollbar-track': {
                boxShadow: `inset 0 0 2px rgba(0,0,0,0.00)`,
                webkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,0.00)'
              },
              '&::-webkit-scrollbar-thumb': {
                background:theme.palette.secondary.main,
  
              }
             }}
               textAlign={"center"}
               style={{background:'inherit',direction:"rtl"}}
               dangerouslySetInnerHTML={{__html:sanitizedHtml}}
            />
  
  
        <Box height={200} >box</Box>
        
        </>
        }
  
   
        </Flex>
        
    )
  
   
  
   
  }




  
export default DrawerContent  


