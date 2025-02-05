import TooltipButton from './client-seat-btn'
import ClientTheaterRTransform from '@/components/client/event-page/theater/client-theater-transformer'


import { useState, useEffect, useContext, CSSProperties, useRef, Dispatch, SetStateAction, } from 'react'
import { useTheme , Stack as Flex, Typography, Drawer } from '@mui/material';
import WidthContext from '@/context/WidthContext';
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import { SeatType } from '@/pages/details/[id]';
import { ClientEventType } from '@/components/admin/newEvent/types/new-event-types';

type TheaterMapType = {

    event:ClientEventType|undefined
    eventSelectSeats:SeatType[]
    clientEventTheaterState:TheaterType|undefined


    setEventSelectedSeats:Dispatch<SetStateAction<SeatType[]>>
    setClientEventTheaterState:Dispatch<SetStateAction<TheaterType|undefined>>


    hendlerSeatOldValues:Record<string, number>
    setHendlerSeatOldValues:Dispatch<SetStateAction<Record<string,number>>>
  }


const  TheaterMap = ({  
      event,
      clientEventTheaterState,
      eventSelectSeats ,
      hendlerSeatOldValues,
      setHendlerSeatOldValues ,
      setEventSelectedSeats,
       setClientEventTheaterState
       }:TheaterMapType) => {

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()
  const MapFlexContaner = Flex



    // to hndle remove item in sebling component in the tree 
    // hendler function cant be exported  or made ganric  
    // insted State is  lifted to perent 



    // henlder need event in the global+scope

     
    const updateTheater = ( seatValue: number, seatNumber: number, row: string,theater:TheaterType ,price:string , priceInfo?:string ) => {
    
    const inMain = theater.mainSeats.hasOwnProperty(row);
    const inSide = theater.sideSeats.hasOwnProperty(row);
    
    const allowedToChangeSeatValues = [0, 2, 4, 5];

    if (!allowedToChangeSeatValues.includes(seatValue)) return;

    const seatKey = `${row}-${seatNumber}`;

    // Toggle seat selection
    setEventSelectedSeats((prev) =>
        prev.some((item) => item.row === row && item.seatNumber === seatNumber)
            ? prev.filter((item) => !(item.row === row && item.seatNumber === seatNumber))
            : [...prev, { row, seatNumber, value: seatValue ,price:price , priceInfo:priceInfo}]
    );

    const updateSeats = (prevState: TheaterType | undefined, seatCollection: "mainSeats" | "sideSeats") => {

  //    console.log("updateSeats - Price", price);
      
        if (!prevState) return prevState;

        const newState = { ...prevState };
        const updatedSeats = { ...newState[seatCollection] };
        const updatedRow = [...updatedSeats[row]];

        const oldNumber = updatedRow[seatNumber];

        // Store the original seat value if not already stored
        setHendlerSeatOldValues((prev) => ({
            ...prev,
            [seatKey]: prev[seatKey] ?? oldNumber,
        }));

        // Toggle between 2 and the stored original value
        updatedRow[seatNumber] = oldNumber === 2 ? hendlerSeatOldValues[seatKey] ?? seatValue : 2;

        updatedSeats[row] = updatedRow;
        newState[seatCollection] = updatedSeats;

        return newState;
    };

    if (inMain) {
      setClientEventTheaterState((prevState) => updateSeats(prevState, "mainSeats"));
    } 
    else if (inSide) {
      setClientEventTheaterState((prevState) => updateSeats(prevState, "sideSeats"));
    } 
    else {
        throw new Error("Seat not found in main or side seats.");
    }
   };
// Reset state function



  const sideSeatsStylesObject = clientEventTheaterState && Object.fromEntries(
    Object.entries(clientEventTheaterState.styles).map(([row, positions]) => [row, positions])
  )
   const sideTextStylesObject = clientEventTheaterState && Object.fromEntries(
        Object.entries(clientEventTheaterState.textsStyle).map(([row, positions]) => [row, positions])
        
  )

  const Text =  clientEventTheaterState &&   Object.entries(clientEventTheaterState.sideSeats).map(([row, rowContent])=>{
    return <Typography key={row} sx={{color:theme.palette.secondary.main}}  height={0} style={ sideTextStylesObject?  sideTextStylesObject[row] :{}} >{row}</Typography>
})

   const MainSeatS  =  clientEventTheaterState &&  Object.entries(clientEventTheaterState.mainSeats).map(([row, rowContent]) => {
    const colValue  = rowContent.map((seatValue: number, i: number) => {
      const textset = "מושב";
      const textrow = "שורה";
  
      return (
        <TooltipButton // uses Context
          key={`${row}.${i}`}
          seatValue={seatValue}
          seatnumber={i}
          row={row}
          hendler={updateTheater}
           event={event}
            />
      );
    })
  
    return (
      <Flex 
        key={row}
        justifyContent="center"
        
        direction={'row'}
        sx={{direction:"ltr"}}
        alignItems={'top'}
      >
        <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"#fff"}}  >{ !xs ? row.slice(5) :  row  }</Typography>
          {colValue}
          <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"#fff"}}  >{ !xs? row.slice(5) :  row  }</Typography>
        
      </Flex>
    );
  })
   const SideSeats = clientEventTheaterState &&     Object.entries(clientEventTheaterState.sideSeats).map(([row, rowContent])=>{
    const colValue  = rowContent.map((seatValue: number, i: number) => {
     

        return (
          <TooltipButton
            key={`${row}.${i}`}
            seatValue={seatValue}
            seatnumber={i}
            row={row}
            hendler={updateTheater}
            event={event}
            />
        );
      });
    
      return (
        <Flex

          key={row}
          style={sideSeatsStylesObject ?sideSeatsStylesObject[row] :{} } // target by key in CSS
          justifyContent="center"
          direction={'row'}
          sx={{direction:"ltr"}}
        >
          {colValue}
        </Flex>
      );
  })


if(!clientEventTheaterState){
  return <h6>Loading</h6>
}
    
return (
 
       <ClientTheaterRTransform >    

          <MapFlexContaner  
              sx={{direction:"ltr" }} 
            >
               <Stage />
                {MainSeatS}
                {Text}
                {SideSeats}
         </MapFlexContaner>      

      </ClientTheaterRTransform>         
  
);
};

export default TheaterMap



const Stage = ()=>{
  const theme = useTheme()

  const Styles :CSSProperties =  {          
      height:40 ,
      margin:20,
       background:"silver",
         color:"red",
         width:"100%",
         borderBottomLeftRadius: "45%",
          borderBottomRightRadius:"45%" ,
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          alignContent:'center',
          }
  
  return    <Flex direction={'row'}  justifyContent={'center'}> 
              <div style={Styles} > 
                <Typography variant='h6' color={theme.palette.secondary.main}>במה</Typography> 
             </div>
           </Flex >
  }   
  
