import TooltipButton from './client-seat-btn'


import { useState, useEffect, useContext, CSSProperties, useRef, Dispatch, SetStateAction, } from 'react'
import { useTheme , Stack as Flex, Typography, Drawer } from '@mui/material';
import WidthContext from '@/context/WidthContext';
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types';
import ClientTheaterRTransform from './client-theater-transformer';
import { ClientSelectedSeatType } from '@/types/pages-types/client/client-event-type';
import { TheaterType } from '@/types/components-types/admin/theater/admin-theater-types';

type TheaterMapType = {

    event:ClientEventType|undefined
    eventSelectSeats:ClientSelectedSeatType[]
    clientEventTheaterState:TheaterType|undefined


    setEventSelectedSeats:Dispatch<SetStateAction<ClientSelectedSeatType[]>>
    setClientEventTheaterState:Dispatch<SetStateAction<TheaterType|undefined>>


    handlerSeatOldValues:Record<string, number>
    setHandlerSeatOldValues:Dispatch<SetStateAction<Record<string,number>>>
  }


const  TheaterMap = ({  
      event,
      clientEventTheaterState,
      handlerSeatOldValues,
      setHandlerSeatOldValues ,
      setEventSelectedSeats,
       setClientEventTheaterState
       }:TheaterMapType) => {

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()
  const MapFlexContainer = Flex



    // to  remove item in Sibling component in the tree 
    // handler function cant be exported  or made generic  
    // instead State is  lifted to parent 



    // handler need event in the global+scope

     
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
        setHandlerSeatOldValues((prev) => ({
            ...prev,
            [seatKey]: prev[seatKey] ?? oldNumber,
        }));

        // Toggle between 2 and the stored original value
        updatedRow[seatNumber] = oldNumber === 2 ? handlerSeatOldValues[seatKey] ?? seatValue : 2;

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
  
      return (
        <TooltipButton // uses Context
          key={`${row}.${i}`}
          seatValue={seatValue}
          seatNumber={i}
          row={row}
          handler={updateTheater}
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
            seatNumber={i}
            row={row}
            handler={updateTheater}
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

          <MapFlexContainer  
              sx={{direction:"ltr" }} 
            >
               <Stage />
                {MainSeatS}
                {Text}
                {SideSeats}
         </MapFlexContainer>      

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
  
