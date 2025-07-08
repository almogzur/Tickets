import WidthContext from "@/context/WidthContext";
import { Box, Typography, Chip, Stack as Flex, useTheme, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FaExpeditedssl, FaLocationDot } from "react-icons/fa6";
import DOMPurify from "isomorphic-dompurify";
import ClientTicketList from "./tickets-list";
import PaypalBtn, { PaypalBtnType } from "./payments-providers-buttons/paypal";
import { ItemCategory } from "@paypal/paypal-server-sdk";
import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";
import { ClientSelectedSeatType, 
  IsracardCartItemType, PayPalCartItemType , IsracardGenerateSaleRequestType } from "@/types/pages-types/client/client-event-type";
import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types";
import { useRouter } from "next/router";
import IsracardBtn from './payments-providers-buttons/isracard-360'




export type DrawerContentType = {

  // event Data 
  ClientSelectedEvent: ClientEventType,

  //Theater to update 
  clientEventTheaterState: TheaterType 
  setClientEventTheaterState: Dispatch<SetStateAction<TheaterType|undefined>>

  /// Selected sates 
  eventSelectSeats: ClientSelectedSeatType[]
  setEventSelectedSeats: Dispatch<SetStateAction<ClientSelectedSeatType[]>>


  // old setae values  ( state to return the origin icons and colors at  un-select )
   handlerSeatOldValues: Record<string, number>
   setHandlerSeatOldValues: Dispatch<SetStateAction<Record<string, number>>>

}


const DrawerContent = ({
  eventSelectSeats,
  clientEventTheaterState,
  ClientSelectedEvent,
  ...props
}: DrawerContentType) => {



  const { xxl, xl, lg, md, sm, xs, xxs } = React.useContext(WidthContext)

  const router = useRouter()
  const theme = useTheme()


const sanitizedHtml = DOMPurify.sanitize(ClientSelectedEvent?.info.pre ?? "");


  const getNormalTicket = () => {
    return ClientSelectedEvent?.tickets?.find((ticket) => ticket.selectedType === 'normal')
  }
  const getNormalPrice = () => {
    return getNormalTicket()?.price ?? "N/A"
  }

  const getIsracardTotal = (): string => {
    let total = 0;
  
    eventSelectSeats.forEach(seat => {
      total += parseInt(seat.price); // Ensure proper number conversion
    });
  
    return `${total}00`; // Append "00" at the end
  };

  const getTotalCost = (): string => {
    let total = 0;

    eventSelectSeats.map(seat => {
      total += parseInt(seat.price); // Ensure proper number conversion
    });

    return total.toString(); // Return formatted string
  };

  const createPayPalCart = (selectedSeats: ClientSelectedSeatType[]): PayPalCartItemType[] => {

    if (selectedSeats.length) {

      const { info, ...rest } = ClientSelectedEvent
      const { eventName } = info

      const cart = selectedSeats.map((seat) => {
          return {
            id: ClientSelectedEvent._id,
            name: `${eventName} _ ${seat.row}  מושב : ${seat.seatNumber + 1}`,
            quantity: "1",
            category: ItemCategory.DigitalGoods,
            unitAmount: { currencyCode: "USD", value: seat.price },
          }
        })
        return cart
    }
    return []
  }

 const createIsracardCart = (selectedSeats:ClientSelectedSeatType[]):IsracardGenerateSaleRequestType['items'] => {

    if(ClientSelectedEvent){

      const { info, ...rest } = ClientSelectedEvent
      const { eventName } = info

   const cart = selectedSeats.map((seat) => {
          return {
             name:eventName,
             quantity: 1,
             unit_price: 1,
             total: 1,
             discount_total: 1,
             description:`${eventName} _ ${seat.row}  מושב : ${seat.seatNumber + 1}`,
             product_code: ClientSelectedEvent._id,
           }
    })

    return cart

    }
    return []
  }


  // useEffect(()=>{
  //   console.log(eventSelectSeats,"Drawer Content see ")
  // },[eventSelectSeats])


  const Pre = Box,
     Tags = Flex,
     PreBox = Box

  if (!ClientSelectedEvent) {
    return
  }

  return (
    <Flex
      alignItems={"center"}
      sx={{
        height: undefined // ! impotent don't limit 
      }}
    >

      {/* cover */}
      {!eventSelectSeats.length &&
        <CldImage
          src={ClientSelectedEvent.info.preview}
          alt="Description of my image"
          width={'300'}
          height={!xs ? 300 : 400}
          draggable={false}
          unoptimized
        />
      }



      {/* heading */}




      {/*  tags */}
      <Tags width={"100%"} mr={5}    >
        <Typography
          color={theme.palette.secondary.main}
          variant={'h4'}
        >
          {ClientSelectedEvent.info.eventName}
        </Typography>
        <Typography   > מיקום : {ClientSelectedEvent.info.TheaterName}</Typography>
        <Typography  > תאריך: {ClientSelectedEvent.info.Date}</Typography>
        <Typography  >שעה :{ClientSelectedEvent.info.Hour}</Typography>
        <Typography >שעת פתיחת דלתוד:{ClientSelectedEvent.info.OpenDoors?.toString().slice(0, 10)}</Typography>
        <Typography> מחיר :   {getNormalPrice()}</Typography>
      </Tags>



      {/*  pay btn and tickets count */}

     { eventSelectSeats.length > 0  ?
        <>
          <Typography mt={2} > סה״כ {eventSelectSeats.length} מחיר : {getTotalCost()}</Typography>

          {
            ClientSelectedEvent.public_id &&
            
            <PaypalBtn
              cart={createPayPalCart(eventSelectSeats)}
              total={getTotalCost()}
              eventId={ClientSelectedEvent._id}
              TheaterState={clientEventTheaterState}
              publicId={ClientSelectedEvent.public_id}
              selectedSeats={eventSelectSeats}
            />
          }

          <IsracardBtn 
            cart={createIsracardCart(eventSelectSeats)}
            total={getIsracardTotal()}
            eventId={ClientSelectedEvent._id}
            TheaterState={clientEventTheaterState}
            eventName={ClientSelectedEvent.info.eventName}
            selectedSeats={eventSelectSeats}

             />

          <ClientTicketList
            ClientSelectedEvent={ClientSelectedEvent}
            eventSelectSeats={eventSelectSeats}
            clientEventTheaterState={clientEventTheaterState}
            {...props}
          />
        </>
        :
        <>
          {/* pre */}
          <Pre
            p={1}
            textAlign={"center"}
            style={{ background: 'inherit', direction: "rtl" }}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
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