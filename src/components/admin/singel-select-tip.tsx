
import SingleTipContext from "@/context/single-tip-context"
import WidthContext from "@/context/WidthContext"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, Dispatch, MouseEventHandler, useContext, useEffect, useState } from "react"
import {  Button, Stack as Flex, Typography, useTheme } from "@mui/material"

import {  grey } from "@mui/material/colors"
import { Seats } from "@/constants/models/Events"
 
interface AdminMapTipToolPropsType {
   setSideSeatsState:React.Dispatch<React.SetStateAction<Seats>>
   setMainSeatsState:React.Dispatch<React.SetStateAction<Seats>>
   mainSeats:Seats
   sideSeats:Seats
   isMultiSelect?:boolean

}


const SingleSelectTip= ({setSideSeatsState,setMainSeatsState , mainSeats ,sideSeats }:AdminMapTipToolPropsType)=>{
   const theme= useTheme()

    const { setSingleTipPositions,singleTipPositions , seatTipInfo, setSeatTipInfo,resetSingleTip }=useContext(SingleTipContext)
    
   // useEffect(()=>{ console.log(seatTipInfo) },[seatTipInfo])

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const upateSeateValue = (newSeatValueArg: number) => {

              
         const row : string = seatTipInfo.row
         const inMain = mainSeats.hasOwnProperty(row)
         const inSide = sideSeats.hasOwnProperty(row)
         const initVlaue = seatTipInfo.initValue
         const seatNumber = seatTipInfo.seatNumber
         
         if(inMain){
            setMainSeatsState( prevMovies => {
                      // Find the movie object reference
              const updatedMovies = {...prevMovies};
              const updatedRow = [...updatedMovies[row]]; // Clone the specific row

                   // new seat state: newSeatValueArg
                   updatedRow[seatNumber] = newSeatValueArg
                  // Assign the updated row back to the seat details
                  updatedMovies[row] = updatedRow;
                  // Assign the updated seat details back to the movie
                  return updatedMovies; // Return the updated state
             });
         }
         else if(inSide){
            setSideSeatsState( prevMovies => {
               // Find the movie object reference
                const updatedMovies = {...prevMovies};
                const updatedRow = [...updatedMovies[row]]; // Clone the specific row
                     
               // new seat state: newSeatValueArg

              updatedRow[seatNumber] = newSeatValueArg
             // Assign the updated row back to the seat details
             updatedMovies[row] = updatedRow;
           // Assign the updated seat details back to the movie
           return updatedMovies; // Return the updated state
                  });
   
   
         }
         resetSingleTip()
    };

   const comonAtt : CSSProperties = { width:"100%", padding:1, margin:0.5 }
    
    return  ( < AnimatePresence >

                 { singleTipPositions.x && singleTipPositions.y  && (
          
                <motion.div 
                 style={{
               
                    width:100,
                    position:'absolute',   
                    top:`${singleTipPositions.y-90 }px`,
                    left:`${singleTipPositions.x-60}px`,
                    textAlign:"end",
                    zIndex:4,
                    background:grey['A400'],
                    borderRadius:10,
                    padding:10,
                    boxShadow:theme.shadows[19],
                    
                    }}
  
                 initial={{ opacity: 0, y: -15 }}
                 animate={{ opacity: 1, y:-33,   transition: { duration: 0.5 } }}
                 exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                   <Typography 
                        textAlign={"center"} fontWeight={700} variant='inherit'  
                        sx={{color:theme.palette.primary.main  }} >מושב :{seatTipInfo.seatNumber+1} {seatTipInfo.row}</Typography>
                
                    <Flex alignItems={"center"} justifyContent={"center"} >


                        {/*discount  */}
                        <Button 
                          variant='contained' 
                          color='success' 
                          sx={comonAtt} 
                          onClick={(e)=>{ upateSeateValue(4) }}
                           >
                         מוזל
                        </Button>

                        {/* Bloacked */}
                        <Button
                         variant='contained' 
                         sx={{ background:theme.palette.common.black, ...comonAtt}}  
                         onClick={()=>{upateSeateValue(3)}}
                         >
                         חסום
                        </Button>

                        {/* normal */}
                         <Button    
                           variant='contained' 
                            sx={comonAtt} 
                            onClick={()=>{upateSeateValue(0)}}
                            >רגיל 
                            </Button>


 

                <Button 
                  variant='contained' 
                  color='error'
                  sx={{borderRadius:0,width:"100%"}} 
                  onClick={()=>resetSingleTip()} >
                  סגור
                </Button>
              
  
   
                    </Flex>
           
           
        
            
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