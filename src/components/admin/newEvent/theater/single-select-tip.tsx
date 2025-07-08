
import SingleTipContext from "@/context/admin/new-event/map/single-tip-context"
import WidthContext from "@/context/WidthContext"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, Dispatch, MouseEventHandler, SetStateAction, useContext, useEffect, useState } from "react"
import {  Button, Stack as Flex, Typography, useTheme } from "@mui/material"
import {  grey, orange, pink } from "@mui/material/colors"
import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types"
import { infoFieldsType } from "@/types/pages-types/admin/admin-event-types"
 


interface SingleSelectTipPropsType  { 
  theaterDate:TheaterType ,
   setTheater:Dispatch<SetStateAction<infoFieldsType>>
  }

const SingleSelectTip= ({theaterDate ,setTheater }:SingleSelectTipPropsType)=>{
   const theme= useTheme()

    const { singleTipPositions , seatTipInfo, setSeatTipInfo,resetSingleTip }=useContext(SingleTipContext)
    
   // useEffect(()=>{ console.log(seatTipInfo) },[seatTipInfo])

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const updateSeatValue = (newSeatValueArg: number) => {


              
         const row =  seatTipInfo.row
         const inMain = theaterDate.mainSeats.hasOwnProperty(row) 
         const inSide =  theaterDate.sideSeats.hasOwnProperty(row) 
         const seatNumber = seatTipInfo.seatNumber
         
         if (inMain) {
           setTheater((prevState) => {

                 if(prevState.Theater){
                // Clone the entire previous state
                  const newState = {
              ...prevState,
              Theater: { ...prevState.Theater }
                   };
        
                    // Clone mainSeats object
                    const updatedMainSeats = { ...newState.Theater.mainSeats };

                    // Clone the specific row to avoid mutation
                    const updatedRow = [...updatedMainSeats[row]];

                    // Update the specific seat in the row
                    updatedRow[seatNumber] = newSeatValueArg;

                    // Assign the updated row back to mainSeats
                    updatedMainSeats[row] = updatedRow;

                    // Assign the updated mainSeats back to theater
                    newState.Theater.mainSeats = updatedMainSeats;

                    // Return the updated state
                    return newState;
                 }
                else return prevState
          }
            );
          
        }
         else if(inSide){
          setTheater((prevState) => {
            if(prevState.Theater){

                    // Clone the entire previous state
                    const newState = {
                      ...prevState,
                      Theater: { ...prevState.Theater }
                    };
                  
                    // Clone mainSeats object
                    const updatedMainSeats = { ...newState.Theater.sideSeats };
                  
                    // Clone the specific row to avoid mutation
                    const updatedRow = [...updatedMainSeats[row]];
                  
                    // Update the specific seat in the row
                    updatedRow[seatNumber] = newSeatValueArg;
                  
                    // Assign the updated row back to mainSeats
                    updatedMainSeats[row] = updatedRow;
                  
                    // Assign the updated mainSeats back to theater
                    newState.Theater.sideSeats = updatedMainSeats;
                  
                    // Return the updated state
                    return newState;
             }
             else return prevState
          }
        );
         }
         resetSingleTip()
    };

    const commonAtt : CSSProperties = {  padding:0.3, margin:0.2 ,  }
    
    return  ( < AnimatePresence >

                 { singleTipPositions.x && singleTipPositions.y  && (
          
                <motion.div 
                 style={{
               
                    width:140,
                    position:'absolute',   
                    top:`${singleTipPositions.y-90 }px`,
                    left:`${singleTipPositions.x-60}px`,
                    textAlign:"end",
                    zIndex:4,
                    background:grey['A400'],
                    borderRadius:10,
                    padding:5,
                    boxShadow:theme.shadows[19],
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center"
                    
                    }}
  
                 initial={{ opacity: 0, y: -15 }}
                 animate={{ opacity: 1, y:-33,   transition: { duration: 0.5 } }}
                 exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                   <Typography 
                        textAlign={"center"} fontWeight={900} variant='h6' 
                        sx={{color:theme.palette.primary.main  }} >מושב :{seatTipInfo.seatNumber+1} {seatTipInfo.row}</Typography>
                
                    <Flex alignItems={"center"} justifyContent={"center"} direction={'row'} flexWrap={'wrap'}  >

                   {/* normal */}
                         <Button    
                           variant='contained' 
                            sx={{...commonAtt}} 
                            onClick={()=>{updateSeatValue(0)}}
                            >רגיל 
                         </Button>

                        {/* blacked */}
                        <Button
                         variant='contained' 
                         sx={{...commonAtt  , bgcolor:"black"}}  
                         onClick={()=>{updateSeatValue(3)}}
                         >
                         חסום
                        </Button>

                    </Flex>
                    <Button 
                  variant='contained' 
                  color='error'
                  sx={{borderRadius:1 , width:"60%", mt:1}} 
                  onClick={()=>resetSingleTip()} >
                  סגור
                  </Button>
           
               </motion.div>
      
       
              )
      
            }
            
         </AnimatePresence> 

         )
}

export default SingleSelectTip

/* movement function 
  onDrag={(e:MouseEvent, d) => { 

               const movingObjectWidth :number = 50

               const innerWidth:number = e.view.innerWidth
               
               const CurrentXPos:number = e.x

               // Negative : Total size - pos si not bigger the the moving item mens it at the end of the left hand pos
               // positive Rule :  if current size  is equal to the size innerWidth + moving object we got to the end of screen

               const negRule : boolean = innerWidth - CurrentXPos <= movingObjectWidth  // facing the screen right hand side handler
               const posRule : boolean =  (innerWidth - CurrentXPos)  >= (innerWidth-movingObjectWidth) // left hand 
                

               setPositions({ x: d.x, y: d.y })

                     if(negRule||posRule){
            
                            // console.log("bonded")
                     setPositions({ x: 0, y: 0 })
                   }
                 

            
               
            // setPositions({ x: d.x, y: d.y }) 
            }}
            */