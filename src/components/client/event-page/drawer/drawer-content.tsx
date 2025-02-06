import WidthContext from "@/context/WidthContext";
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

import { ItemCategory, Item as PatPalItem } from "@paypal/paypal-server-sdk";
import { ClientEventType } from "@/components/admin/newEvent/types/new-event-types";



 export type   DrawerContentType = {

    // event Data 
    event :ClientEventType
    setEventState:Dispatch<SetStateAction<ClientEventType|undefined>>


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
      clientEventTheaterState,
     ...restDrawerContentProps
    }:DrawerContentType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
    const sanitizedHtml = DOMPurify.sanitize(event.info.pre);
    const theme = useTheme()

   const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true);};  
    const handleClose = () => {setOpen(false);};


    const getNormailTicket = ()=>{
      return event?.tickets?.find((tikect)=> tikect.selectedType === 'normal' )
    }
    const getNoramlPrice = ()=>{
       return getNormailTicket()?.price ?? "N/A" 
    }
    const createPaymentCart = (selectedSeats:SeatType[]) : PatPalItem[]  =>{

        const {_id , info, ...rest} = event
        const {eventName} = info

          if(selectedSeats){
              // array
           const cart =   selectedSeats.map((seat)=>{
                   return {
                       id:_id,  // assigning event id
                       name:`${eventName}`,
                       quantity:"1",
                       category:ItemCategory.DigitalGoods,
                       unitAmount: { currencyCode: "USD", value: seat.price  },
                   }
              })
              return cart
          } 
          else{
            return []
          }
    }
    const getTotalCost = (): string => {
      let total = 0;
  
      eventSelectSeats.map(seat => {
        total += parseInt(seat.price); // Ensure proper number conversion
    });
  
      return total.toString(); // Return formatted string
  };


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
              src={event.info.preview}
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
                {event.info.eventName}
          </Typography>
          <Typography   > מיקום : {event.info.TheaterName}</Typography>
          <Typography  > תאריך: {event.info.Date}</Typography>
          <Typography  >שעה :{event.info.Hour}</Typography>
          <Typography >שעת פתיחת דלתוד:{event.info.OpenDoors?.toString().slice(0,10)}</Typography>
          <Typography> מחיר :   { getNoramlPrice()}</Typography>
        </Tags>



        {/*  pay btn and tickets counte */}
       { eventSelectSeats.length > 0   &&  
       <>
        <Typography mt={2} > סה״כ { eventSelectSeats.length  } מחיר : {getTotalCost()}</Typography>

     
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
         <PaypalBtn   
            cart={createPaymentCart(eventSelectSeats)} 
            total={getTotalCost()} 
            TheaterState={clientEventTheaterState}
            eventId={event._id}
 
             />

       </DialogContent>

        </Dialog>


       <ClientTicketList
          event={event}
          eventSelectSeats={eventSelectSeats}
          clientEventTheaterState={clientEventTheaterState}
          {...restDrawerContentProps}
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


