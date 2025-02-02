import WidthContext from "@/context/WidthContext";
import { EventsType } from "@/pages/api/client/events/R/get-events";
import { Box, Typography, Chip ,Stack as Flex , useTheme, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { CgCalendarDates } from "react-icons/cg";
import { FaExpeditedssl, FaLocationDot } from "react-icons/fa6";
import { TbClockHour1 } from "react-icons/tb";
import DOMPurify from "isomorphic-dompurify";
import { SeatType } from "@/pages/details/[id]";
import ClientTicketList from "./tickets-list";
import { GiTakeMyMoney } from "react-icons/gi";
import { TheaterType } from "@/components/admin/newEvent/theater/types/theater-types";
import axios from "axios";
import PaypalBtn from "../payments-providers-buttons/paypal";
import GooglePatBtn from "../payments-providers-buttons/google";


 export type   DrawerContentType = {

    // event Data 
    event :EventsType
    setEventState:Dispatch<SetStateAction<EventsType|undefined>>


    //Theater to update 
    clientEventTheaterState:TheaterType|undefined 
    setClientEventTheaterState:Dispatch<SetStateAction<TheaterType|undefined>>

    /// Selected Seates 
    eventSelectSeats:SeatType[]
    setEventSelectedSeats:Dispatch<SetStateAction<SeatType[]>>

    // old seate valuse  ( state to return the orgin icons and colors at  un-select )
    hendlerSeatOldValues:Record<string, number>
    setHendlerSeatOldValues:Dispatch<SetStateAction<Record<string,number>>>
}

const DrawerContent = ({  
      event,
      eventSelectSeats,
     ...rest
    }:DrawerContentType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
    const sanitizedHtml = DOMPurify.sanitize(event.pre);
    const theme = useTheme()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };




    const updateEvent = async ()=>{

              const data = {
                eventSelectSeats,
              }

        const updateStatus = await axios.post('/api/client/events/U/update-event',data)

    }


    // useEffect(()=>{
    //   console.log(eventSelectSeats,"Drawer Content see ")
    // },[eventSelectSeats])

  
    const Pre=Box,
    Tags = Flex,
    PreBox= Box


    return(
       <Flex 
          alignItems={"center"}
          sx={{height:undefined // ! importent dont limit 
             }}
          >
        {/* cover */}
        { !eventSelectSeats.length && 
        <CldImage
              src={event.preview}
              alt="Description of my image"
              width={'300'}
              height={!xs? 300: 400}
              draggable={false}
              />
        }
        {/* heading */}
         <Typography 
          color={theme.palette.common.white}
          variant={'h4'}
          textAlign={"center"}
         >
          {event.eventName}
         </Typography>

         {/*  tags */}
         <Tags alignItems={"start"}   >
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
                  label={<Typography>{ticket.priceInfo}: {ticket.price} </Typography>}
                  
                  />
               })}

        </Tags>

        {/*  pay btn and tickets counte */}
       { eventSelectSeats.length > 0   &&  
       <>
        <Typography mt={2} > סה״כ { eventSelectSeats.length }</Typography>

        <Button
         color='secondary'

         onClick={handleClickOpen}
           >לדף תשלום מאובטח 
          {<FaExpeditedssl  style={{margin:2}}/>}
       </Button>

       <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="Payment-Dialog"
        aria-describedby="alert-dialog-Payment-Dialog"
      >
        <DialogContent  >
          <PaypalBtn  id={event.eventName} amount={eventSelectSeats.length}  />
          <GooglePatBtn/>
        </DialogContent>

      </Dialog>

       <ClientTicketList
          event={event}
          eventSelectSeats={eventSelectSeats}
          {...rest}
            />
       </>
       }

        {/* pre */}
       { !eventSelectSeats.length &&
        <>
         <Pre
            p={1}
            textAlign={"center"}
            style={{background:'inherit',direction:"rtl"}}
            dangerouslySetInnerHTML={{__html:sanitizedHtml}}
            />
        <Box height={200} >box</Box>
        <Box height={200} >box</Box>   
         <Box height={200} >box</Box>



        </>
        }


    
        </Flex>
    )
  
   
  
   
  }




  
export default DrawerContent  


