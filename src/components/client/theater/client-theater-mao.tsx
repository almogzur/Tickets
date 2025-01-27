import TooltipButton from '../client-seat-btn'
import ClientTheaterMap from '../client-theater-map';
import { motion ,AnimatePresence } from "framer-motion"

import ClientTipContext from '@/context/client/c-tip-context'

import { useState, useEffect, useContext, CSSProperties, useRef, Dispatch, SetStateAction, } from 'react'
import { ClientTheaterType } from './client-theater';
import { useTheme , Stack as Flex, Typography } from '@mui/material';
import WidthContext from '@/context/WidthContext';
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';

const  TheaterMap = ({theater}:ClientTheaterType) => {

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const[ clientEventState ,setClientEventState] = useState<TheaterType>()

  useEffect(()=>{
        if(theater){
            setClientEventState(theater)
        }

  },[theater])



    const theme = useTheme()

const hendler = (  seatValue: number,seatNumber: number, row:string , newSeatValueArg:number ) => {

// Update the selected seats array
const inMain = theater.mainSeats.hasOwnProperty(row) 
const inSide =  theater.sideSeats.hasOwnProperty(row) 

if (inMain) {
  setClientEventState((prevState) => {

      if(prevState){
     // Clone the entire previous state
       const newState = {   ...prevState,};

         // Clone mainSeats object
         const updatedMainSeats = { ...newState.mainSeats };

         // Clone the specific row to avoid mutation
         const updatedRow = [...updatedMainSeats[row]];

         // Update the specific seat in the row
         updatedRow[seatNumber] = newSeatValueArg;

         // Assign the updated row back to mainSeats
         updatedMainSeats[row] = updatedRow;

         // Assign the updated mainSeats back to theater
         newState.mainSeats = updatedMainSeats;

         // Return the updated state
         return newState;
      }
     else return prevState
}
 );
}
else if(inSide){
  setClientEventState((prevState) => {
    if(prevState){

            // Clone the entire previous state
            const newState = {            ...prevState,
  
            };
          
            // Clone mainSeats object
            const updatedMainSeats = { ...newState.sideSeats };
          
            // Clone the specific row to avoid mutation
            const updatedRow = [...updatedMainSeats[row]];
          
            // Update the specific seat in the row
            updatedRow[seatNumber] = newSeatValueArg;
          
            // Assign the updated row back to mainSeats
            updatedMainSeats[row] = updatedRow;
          
            // Assign the updated mainSeats back to theater
            newState.sideSeats = updatedMainSeats;
          
            // Return the updated state
            return newState;
     }
     else return prevState
  }
);
 }
};

const {clientTipPosition,clinetTipInfo, setClientTipPosition  ,setClinetTipInfo, resetClinetTip }=useContext(ClientTipContext)



  const sideSeatsStylesObject = clientEventState && Object.fromEntries(
    Object.entries(clientEventState.styles).map(([row, positions]) => [row, positions])
  )
   const sideTextStylesObject = clientEventState && Object.fromEntries(
        Object.entries(clientEventState.textsStyle).map(([row, positions]) => [row, positions])
  )

   const MainSeatS  =  clientEventState &&  Object.entries(clientEventState.mainSeats).map(([row, rowContent]) => {
    const colValue  = rowContent.map((seatValue: number, i: number) => {
      const textset = "מושב";
      const textrow = "שורה";
  
      return (
        <TooltipButton // uses Context
          key={`${row}.${i}`}
          seatValue={seatValue}
          seatnumber={i}
          row={row}
           hendler={()=>
              hendler(seatValue,i,row,2)
            }
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
   const SideSeats = clientEventState &&     Object.entries(clientEventState.sideSeats).map(([row, rowContent])=>{
    const colValue  = rowContent.map((seatValue: number, i: number) => {
     
    
        return (
          <TooltipButton
            key={`${row}.${i}`}
            seatValue={seatValue}
            seatnumber={i}
            row={row}
            hendler={   ()=>hendler(seatValue,i,row,2)}
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
   const Text =  Object.entries(theater.sideSeats).map(([row, rowContent])=>{
       return <Typography key={row} sx={{color:theme.palette.secondary.main}}  height={0} style={ sideTextStylesObject?  sideTextStylesObject[row] :{}} >{row}</Typography>
  })


    
return (
 <>
    <AnimatePresence>
     {clientTipPosition.x && clientTipPosition.y  && (
    <motion.h1
     style={{
        background: "#fff",
       
        borderRadius: "4px",
        height:"fin-content",
        width:"fin-content",
        position:'absolute',
        zIndex:99,
        top:`${clientTipPosition.y-40 }px`,
        left:`${clientTipPosition.x-60}px`,
        fontSize:!xs? 12 : 15,
        padding:10,
        textAlign:"end",
        fontWeight:"bold"
        
        
     }}

    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y:-23,   transition: { duration: 0.5 } }}
     exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
     {clinetTipInfo.row}:{clinetTipInfo.seatNumber}
   </motion.h1>
    )}
   </AnimatePresence> 


      <ClientTheaterMap   >    

       <Flex direction={"column"}    height={!xs? 300 : !md? 500 : 800}      sx={{direction:"ltr"}} >
       <Stage />
          {MainSeatS}
          {Text}
         {SideSeats}
    </Flex>      

      </ClientTheaterMap>         
  </>
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
  