
import SingleTipContext from "@/context/admin/new-event/map/single-tip-context"
import WidthContext from "@/context/WidthContext"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, Dispatch, MouseEventHandler, SetStateAction, useContext, useEffect, useState } from "react"
import {  Button, Stack as Flex, Typography, useTheme } from "@mui/material"

import {  grey, orange, pink } from "@mui/material/colors"
import { Seats } from "@/constants/models/Events"
import { InfoFormType, TheaterType } from "@/pages/_app"
import { wrap } from "module"
 


interface SingleSelectTipPropsType  { 
  theraer:TheaterType ,
   isMultiSelect:boolean ,
   setTheater:Dispatch<SetStateAction<InfoFormType>>
  }

const SingleSelectTip= ({theraer,isMultiSelect ,setTheater }:SingleSelectTipPropsType)=>{
   const theme= useTheme()

    const { setSingleTipPositions,singleTipPositions , seatTipInfo, setSeatTipInfo,resetSingleTip }=useContext(SingleTipContext)
    
   // useEffect(()=>{ console.log(seatTipInfo) },[seatTipInfo])

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const upateSeateValue = (newSeatValueArg: number) => {

              
         const row : string = seatTipInfo.row
         const inMain = theraer.mainSeats.hasOwnProperty(row)
         const inSide = theraer.sideSeats.hasOwnProperty(row)
         const initVlaue = seatTipInfo.initValue
         const seatNumber = seatTipInfo.seatNumber
         
         if (inMain) {
          setTheater((prevState) => {
            // Clone the entire previous state
            const newState = {
              ...prevState,
              theater: { ...prevState.theater }
            };
        
            // Clone mainSeats object
            const updatedMainSeats = { ...newState.theater.mainSeats };
        
            // Clone the specific row to avoid mutation
            const updatedRow = [...updatedMainSeats[row]];
        
            // Update the specific seat in the row
            updatedRow[seatNumber] = newSeatValueArg;
        
            // Assign the updated row back to mainSeats
            updatedMainSeats[row] = updatedRow;
        
            // Assign the updated mainSeats back to theater
            newState.theater.mainSeats = updatedMainSeats;
        
            // Return the updated state
            return newState;
          });
        }
         else if(inSide){
          setTheater((prevState) => {
            // Clone the entire previous state
            const newState = {
              ...prevState,
              theater: { ...prevState.theater }
            };
        
            // Clone mainSeats object
            const updatedMainSeats = { ...newState.theater.sideSeats };
        
            // Clone the specific row to avoid mutation
            const updatedRow = [...updatedMainSeats[row]];
        
            // Update the specific seat in the row
            updatedRow[seatNumber] = newSeatValueArg;
        
            // Assign the updated row back to mainSeats
            updatedMainSeats[row] = updatedRow;
        
            // Assign the updated mainSeats back to theater
            newState.theater.sideSeats = updatedMainSeats;
        
            // Return the updated state
            return newState;
          });
         }
         resetSingleTip()
    };

    const comonAtt : CSSProperties = {  padding:0.3, margin:0.2 ,  }
    
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


                        {/*discount  */}
                        <Button 
                          variant='contained' 
                          color='success' 
                          sx={{...comonAtt}} 
                          onClick={(e)=>{ upateSeateValue(4) }}
                           >
                         מוזל
                        </Button>

                        {/* Bloacked */}
                        <Button
                         variant='contained' 
                         sx={{...comonAtt  , bgcolor:"black"}}  
                         onClick={()=>{upateSeateValue(3)}}
                         >
                         חסום
                        </Button>

                        {/* normal */}
                         <Button    
                           variant='contained' 
                            sx={{...comonAtt}} 
                            onClick={()=>{upateSeateValue(0)}}
                            >רגיל 
                         </Button>

                        <Button
                           sx={{...comonAtt , bgcolor:orange[600]}} 
                           onClick={()=>{upateSeateValue(5)}}
                         >נגיש</Button>
                        <Button 
                          sx={{...comonAtt ,bgcolor: pink[600]}} 
                          onClick={()=>{upateSeateValue(6)}}
                        >נגיש מוזל </Button>
   
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

/* Movment function 
  onDrag={(e:MouseEvent, d) => { 

               const movingObjectWidth :number = 50

               const innerWidth:number = e.view.innerWidth
               
               const CurrentXPos:number = e.x

               // Negative : Total size - pos si not beger the the moving item mens it at the end of the left hand pos
               // Psoitive Rule :  if Curnt size  is equle to the size innerWidth + moving object we got to the end of screen

               const negRule : boolean = innerWidth - CurrentXPos <= movingObjectWidth  // faceing the screen right hend side hndler
               const posRule : boolean =  (innerWidth - CurrentXPos)  >= (innerWidth-movingObjectWidth) // left hand 
                

               setPositions({ x: d.x, y: d.y })

                     if(negRule||posRule){
            
                            // console.log("bonded")
                     setPositions({ x: 0, y: 0 })
                   }
                 

            
               
            // setPositions({ x: d.x, y: d.y }) 
            }}
            */