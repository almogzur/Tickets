
// React
import { ChangeEventHandler, Dispatch, SetStateAction, useContext, useState } from "react"

//Context Useg
import WidthContext from "@/context/WidthContext"
import TabsTicketContext from "@/context/admin/new-event/tabs/tabs-ticket-context"

//Types
import { FullDateOptions } from "@/pages/_app"

// Components
import MakeNewTickit from "./make-new-ticket"
import { Divider, Stack as Flex , Typography , useTheme} from "@mui/material"
//Icons 

import { FcFilm, } from "react-icons/fc";
import TicketComponent from "./ticket"
import { IoMdAddCircle } from "react-icons/io"
import { TheaterType, TicketType } from "@/pages/admin/new-event"
import TheaterSelect from "../info-form/theater-select"


import Eilat_1 from "@/constants/theathers/eilat_1";
import Eilat_2 from "@/constants/theathers/eilat_2";
import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context"


interface TicketsTabPropsType {  setTabPage : Dispatch<SetStateAction<number>>}
 
  const TicketsTab = ({setTabPage}:TicketsTabPropsType)=>{ 
       const theme = useTheme()
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
       const {tickets,setTickets}= useContext(TabsTicketContext)
       const { setInfoFileds} = useContext(TabsInfoContext)


         const updateTicket=(  key: "price"|"type"|"discription"|"discoundInfo" , value:string|number ):void=>{
       
             setTickets(p=>({...p,[key]:value}))
         }
         const updteTicketsArray= (ticket:TicketType, Action:"add"|"remove"):void=>{
           
            if(Action==="add"){setTickets(p=>([...p,ticket]))}
            else if (Action === "remove"){
                 setTickets(p=>([...p].filter((item)=> item !== ticket)))
            }
       
         }

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
        <TheaterSelect theaters={[Eilat_1,Eilat_2]}  setInfoFileds={setInfoFileds}  />
        <Flex position={"sticky"} top={0}  zIndex={2} bgcolor={"#fff"}>

          <Flex direction={"row"} p={1}  gap={2} alignItems={"center"} >
          <FcFilm size={"2em"} color={"black"}  style={{border:`solid ${theme.palette.secondary.main} ` ,  padding:4 }} />
            <Flex>
              <Typography   color="black" fontSize={!xs?17:20} >מספר כרטיסים זמינים למכירה  {100} </Typography >
              <Typography  color="black"   fontSize={!xs?13:15}  >מסיר את המושבים המסומנים כחסומים</Typography>
            </Flex>
          </Flex>
              

          <Flex p={1} gap={2} direction={"row"} alignItems={"center"}   >

                <IoMdAddCircle color={theme.palette.secondary.main} size={"2em"}   style={{border:`solid ${theme.palette.secondary.light} ` ,  padding:4  }}   />
               <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}  gap={2} >              
                   <Flex  flexGrow={1}>
               <Typography  fontSize={!xs?15:20}>  הוסף סוגי כרטיסים</Typography>
               <Typography variant='subtitle2' > סוג הכרטיס ו הפרטים יוצגו ללקוח בעת הרכישה  </Typography>
           
                   </Flex>
                       {/* Add State updae functions */}
                     <Flex >
                     <MakeNewTickit setTabPage={setTabPage}  />
                     </Flex>
               </Flex>
          </Flex>
          <Divider sx={{borderWidth:2}} />
         </Flex>




      <TicketComponent 
         
         finelPrice={"0"}
            evenName={"הופעה חיה של שחר חסון"}
            eventDate={new Date().toLocaleDateString("he-IL", { year: 'numeric', month: 'long', day: "numeric", hour: '2-digit', })}
            selectedType={'citizen'}
            location={"תיאטראות -  אילת"}
            priceInfo="הנחת תושב "     
            TicketClosingSealesDate={new Date().toLocaleDateString("he-IL", FullDateOptions)}

         />
          <TicketComponent 
            finelPrice={"159"}
            evenName={"הופעה חיה של שחר חסון"}
            eventDate={new Date().toLocaleDateString("he-IL", { year: 'numeric', month: 'long', day: "numeric", hour: '2-digit', })}
            selectedType={'normal'}
            location={"תיאטראות -  אילת"}
            TicketClosingSealesDate={new Date().toLocaleDateString("he-IL", FullDateOptions)} priceInfo={""}
         />
        <TicketComponent  
            finelPrice={"159"}
            evenName={"הופעה חיה של שחר חסון"}
            eventDate={new Date().toLocaleDateString("he-IL", FullDateOptions)}
            selectedType ={'discount'}
            priceInfo="הנחה לחברי מועדון "
            location={"תיאטראות -  אילת"}
            TicketClosingSealesDate={new Date().toLocaleDateString("he-IL", FullDateOptions)}
         />
          {/* loop over tickits tikits.map....  */}
        

     </Flex>
     )
   }













export default TicketsTab