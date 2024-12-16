
// React
import { ChangeEventHandler, Dispatch, SetStateAction, useContext, useState } from "react"

//Context Useg
import WidthContext from "@/context/WidthContext"
import Eventschdual from "@/context/admin/new-event/tabs/tabs-event-schedules-context"
//Types
import { TheaterType } from "@/pages/_app"

// Components
import InputWrap from "../../../input"
import MakeNewTickit from "./make-new-tickit"
import { Alert, AlertTitle, Box ,Paper, Button, Divider, Fade, Stack as Flex , Popover, Typography , useTheme} from "@mui/material"
//Icons 

import { FcFilm, FcIntegratedWebcam } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import TicketComponent from "./tickit"

interface TicketsTabPropsType {  }
 
  const TikitsTab = ({}:TicketsTabPropsType)=>{ 
       const theme = useTheme()
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

       const countTheaterSeatAmount = ( theater: TheaterType ) : number =>{

        const combineSeats  = [theater.mainSeats,theater.sideSeats]
    
        combineSeats.map((data,i)=>{
           console.log(data);
           
        })
    
    return 0
        }

      return (
       <Flex         
        height={'calc(100% - 80px)'}
        overflow={"auto"} 
        width={"100%"}
        
        >
        {/* Seats Amount */}
        <Flex direction={"row"} px={2} m={1} gap={1} alignItems={"center"} >
          <FcFilm size={!xs? "1.5em":"2em"} color={"black"}  style={{border:`solid ${theme.palette.secondary.main} ` ,  padding:4 }} />
            <Flex>
              <Typography   color="black" fontSize={!xs?17:20} >מספר כרטיסים זמינים למכירה  {100} </Typography >
              <Typography  color="black"   fontSize={!xs?13:15}  >מסיר את המושבים המסומנים כחסומים</Typography>
            </Flex>
        </Flex>
            
        {/*  set price too all in one place  */}
 
         <Box  >

          <Flex px={2} m={1} gap={1} direction={"row"} alignItems={"center"}  >
            <FcPlus color="black" size={!xs? "1.5em":"2em"}  style={{border:`solid ${theme.palette.success.light} ` ,  padding:4  }}   />
          <Flex>
            <Typography  fontSize={!xs?15:20}>  הוסף סוגי כרטיסים</Typography>
            <Typography variant='subtitle2' > סוג הכרטיס ו הפרטים יוצגו ללקוח בעת הרכישה  </Typography>
            </Flex>
         </Flex>
         
          <Flex direction={'row'} flexWrap={'wrap'}  gap={!xs? -0 : 1} justifyContent={"center"} p={1}  >
            
         </Flex>

          <Flex direction={"row"} justifyContent={"end"} m={2} >
            {/* Add State updae functions */}
          <MakeNewTickit/>
         </Flex>

         <Divider sx={{borderWidth:2}} />
        </Box>

          {/* loop over tickits tikits.map....  */}
        

    

     </Flex>
     )
   }













export default TikitsTab