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
import { CartItem } from "@/pages/api/client/pay/paypal-types";



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


    const getNormailTicket = ()=>{
      return event?.tickets?.find((tikect)=> tikect.selectedType === 'normal' )
    }
    const getNoramlPrice = ()=>{
       return getNormailTicket()?.price ?? "" 
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const PaymentOCart = () : CartItem|CartItem[]|undefined  =>{
      
        const {_id,  eventName,  } = event
        


       
      return undefined
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
              unoptimized
              />
        }



        {/* heading */}




         {/*  tags */}
         <Tags  width={"100%"}  mr={5}    >
         <Typography 
          color={theme.palette.secondary.main}
          variant={'h4'}
         >
          {event.eventName}
         </Typography>

            <Typography   > מיקום : {event.TheaterName}</Typography>
             <Typography  > תאריך: {event.Date}</Typography>
              <Typography  >שעה :{event.Hour}</Typography>
              <Typography >שעת פתיחת דלתוד:{event.OpenDorHour?.toString().slice(0,10)}</Typography>
                <Typography> מחיר :   { getNoramlPrice()}</Typography>

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
         <PaypalBtn   cart={PaymentOCart()} />

       </DialogContent>

        </Dialog>


       <ClientTicketList
          event={event}
          eventSelectSeats={eventSelectSeats}
          {...rest}
            />
       </>
       }


       { !eventSelectSeats.length &&
        <>
                {/* pre */}
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


