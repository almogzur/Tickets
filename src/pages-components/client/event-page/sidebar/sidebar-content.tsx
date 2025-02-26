import WidthContext from "@/context/WidthContext";
import { Box, Typography, Chip, Stack as Flex, useTheme, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CldImage } from "next-cloudinary";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { FaExpeditedssl, FaLocationDot } from "react-icons/fa6";
import DOMPurify from "isomorphic-dompurify";
import ClientTicketList from "./tickets-list";
import PaypalBtn from "./payments-providers-buttons/paypal";
import { ItemCategory} from "@paypal/paypal-server-sdk";
import { ClientEventType  } from "@/types/pages-types/admin/admin-event-types";
import {  ClientSelectedSeatType } from "@/types/pages-types/client/client-event-type";
import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { useRouter } from "next/router";
import { PayPalCartItemType } from "@/types/pages-types/client/payment-object";



export type DrawerContentType = {

  // event Data 
  ClientSelectedEvent:ClientEventType,

  //Theater to update 
  clientEventTheaterState: TheaterType | undefined
  setClientEventTheaterState: Dispatch<SetStateAction<TheaterType | undefined>>

  /// Selected Seates 
  eventSelectSeats: ClientSelectedSeatType[]
  setEventSelectedSeats: Dispatch<SetStateAction<ClientSelectedSeatType[]>>

  // old seate valuse  ( state to return the orgin icons and colors at  un-select )
  hendlerSeatOldValues: Record<string, number>
  setHendlerSeatOldValues: Dispatch<SetStateAction<Record<string, number>>>
}

const DrawerContent = ({
  eventSelectSeats,
  clientEventTheaterState,
  ClientSelectedEvent,
  ...restDrawerContentProps
}: DrawerContentType) => {
  const { xxl, xl, lg, md, sm, xs, xxs } = React.useContext(WidthContext)

const router = useRouter()
  
  const sanitizedHtml = DOMPurify.sanitize(ClientSelectedEvent?.info.pre?? "");

  const theme = useTheme()

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const getNormailTicket = () => {
    return ClientSelectedEvent?.tickets?.find((tikect) => tikect.selectedType === 'normal')
  }
  const getNoramlPrice = () => {
    return getNormailTicket()?.price ?? "N/A"
  }
  const createPaymentCart = (selectedSeats: ClientSelectedSeatType[]): PayPalCartItemType[] => {

    if(ClientSelectedEvent){

    const { public_id, info, ...rest } = ClientSelectedEvent
    const { eventName } = info

    if (selectedSeats) {
      // array
      const cart = selectedSeats.map((seat) => {
        return {
          id: public_id,  // assigning event id
          name: `${eventName} _ ${seat.row}  מושב : ${seat.seatNumber + 1}`,
          quantity: "1",
          category: ItemCategory.DigitalGoods,
          unitAmount: { currencyCode: "USD", value: seat.price },
        }
      })
      return cart
    }
    else {
      return []
    }
  }
  return []
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


  const Pre = Box,
          Tags = Flex,
          PreBox = Box

if(!ClientSelectedEvent){
  return 
}

  return (
    <Flex
      alignItems={"center"}
      sx={{
        height: undefined // ! importent dont limit 
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
        <Typography> מחיר :   {getNoramlPrice()}</Typography>
      </Tags>



      {/*  pay btn and tickets counte */}
      {eventSelectSeats.length > 0 &&
        <>
          <Typography mt={2} > סה״כ {eventSelectSeats.length} מחיר : {getTotalCost()}</Typography>
          
          <Button
            color='secondary'
            onClick={handleClickOpen}
          >לדף תשלום מאובטח
            {<FaExpeditedssl style={{ margin: 2 }} />}

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
                publicId={ClientSelectedEvent.public_id}
                eventId={ClientSelectedEvent._id}
              />

            </DialogContent>

          </Dialog>

          <ClientTicketList
          
          ClientSelectedEvent={ClientSelectedEvent} 
          eventSelectSeats={eventSelectSeats}
          clientEventTheaterState={clientEventTheaterState}
          {...restDrawerContentProps}          />
        </>
      }


      {!eventSelectSeats.length &&
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


