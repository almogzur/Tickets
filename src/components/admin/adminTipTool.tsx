
import TipContext from "@/context/Tip-context"
import WidthContext from "@/context/WidthContext"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, Dispatch, MouseEventHandler, useContext, useEffect, useState } from "react"
import {  Button, Stack as Flex, Typography, useTheme } from "@mui/material"

import {  grey } from "@mui/material/colors"
import { Seats } from "@/constants/models/Events"
 
interface AdminMapTipTool {
   setSideSeatsState:React.Dispatch<React.SetStateAction<Seats>>,
   setMainSeatsState:React.Dispatch<React.SetStateAction<Seats>>,
   mainSeats:Seats
   sideSeats:Seats
}


const AdminMapTipTool= ({setSideSeatsState,setMainSeatsState , mainSeats ,sideSeats}:AdminMapTipTool)=>{
   const theme= useTheme()

    const { tipX, setTipX , tipY, setTipY ,seatTipInfo, setSeatTipInfo,resetTip }=useContext(TipContext)
    
   // useEffect(()=>{ console.log(seatTipInfo) },[seatTipInfo])

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const upateSeateValue = (newSeatValueArg: number) => {

              
         const row : string = seatTipInfo.row
         const inMain = mainSeats.hasOwnProperty(row)
         const inSide = sideSeats.hasOwnProperty(row)
         const initVlaue = seatTipInfo.initValue
         const seatNumber = seatTipInfo.seatNumber
         console.log(inMain);
         
         if(inMain){
            setMainSeatsState( prevMovies => {
                      // Find the movie object reference
              const updatedMovies = {...prevMovies};
              const updatedRow = [...updatedMovies[row]]; // Clone the specific row
                    // Skip updates for unavailable or already selected seats
                  if (updatedRow[seatNumber] === 1) {
                        return prevMovies; // No update
                   }
                   // Toggle seat state: 0 to 2 or 2 to 0
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
               // Skip updates for unavailable or already selected seats
           if (updatedRow[seatNumber] === 1) {
                 return prevMovies; // No update
            }
            // Toggle seat state: 0 to 2 or 2 to 0
            updatedRow[seatNumber] = newSeatValueArg
           // Assign the updated row back to the seat details
           updatedMovies[row] = updatedRow;
           // Assign the updated seat details back to the movie
           return updatedMovies; // Return the updated state
                  });
   
   
         }
         resetTip()


       
         


    
     

    };




   const comonAtt : CSSProperties = { width:"100%", padding:1, margin:0.5 }
    
    return  ( < AnimatePresence >

      
             {tipX && tipY  && (
          
                <motion.div 

    
                 style={{
               
                    width:100,
                    position:'absolute',   
                    top:`${tipY-90 }px`,
                    left:`${tipX-60}px`,
                    textAlign:"end",
                    zIndex:4,
                    background:grey[300],
                    borderRadius:10,
                    padding:10,
                    }}
  
                 initial={{ opacity: 0, y: -15 }}
                 animate={{ opacity: 1, y:-33,   transition: { duration: 0.5 } }}
                 exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                   <Typography 
                        textAlign={"center"} fontWeight={700} variant='subtitle2'  
                        sx={{color:theme.palette.primary.main }} >מושב :{seatTipInfo.seatNumber+1} {seatTipInfo.row}</Typography>
                
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
                  onClick={()=>resetTip()} >
                  סגור
                </Button>
              
  
   
                    </Flex>
           
           
        
            
               </motion.div>
      
       
          )}
       
         </AnimatePresence> 

         )
}

export default AdminMapTipTool

/*
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