
// React
import { ChangeEventHandler, Dispatch, SetStateAction, useContext, useState } from "react"

//Context Useg
import WidthContext from "@/context/WidthContext"
import TabsTicketContext from "@/context/admin/new-event/tabs/tabs-ticket-context"

//Types
import { FullDateOptions } from "@/pages/_app"

// Components
import MakeNewTickit from "./make-new-ticket"
import { Container, Divider, Stack as Flex , Typography , useTheme} from "@mui/material"
import Head from "next/head"

//Icons 
import TicketComponent from "./ticket"
import { IoMdAddCircle } from "react-icons/io"
import { BaceTicketType, TheaterType, 
 } from "@/pages/admin/new-event"


import Eilat_1 from "@/constants/theathers/eilat_1";
import Eilat_2 from "@/constants/theathers/eilat_2";


import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context"
import SelectWrap from "@/components/gen/select-wrap"
import { IoTicket } from "react-icons/io5"


interface TicketsTabPropsType {  setTabPage : Dispatch<SetStateAction<number>>}
 
  const TicketsTab = ({setTabPage}:TicketsTabPropsType)=>{ 

   const theme = useTheme()
   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
   const {tickets,setTickets}= useContext(TabsTicketContext)
   const {infoFileds, setInfoFileds} = useContext(TabsInfoContext)

   const updteTicketsArray= (ticket:BaceTicketType, Action:"add"|"remove"):void=>{
     if(Action==="add"){setTickets(p=>([...p,ticket]))}
     else if (Action === "remove"){
      setTickets(p=>([...p].filter((item)=> item !== ticket)))
            }
   }
   const countTheaterSeat = ( Theater: TheaterType ) : number =>{
     const combineSeats  = [Theater.mainSeats,Theater.sideSeats]
       combineSeats.map((data,i)=>{
           console.log(data);    
        })   
    return 0
   }


   return (
    <Container  sx={{ mt:2 }}   >
      <Flex>
        {/* Seats Amount */}
         <Flex>
           <SelectWrap
             label={"אולם"}
             items={[{ label: Eilat_1.ThaeaterName, value: Eilat_1 }, { label: Eilat_2.ThaeaterName, value: Eilat_2 }]}
             changeHndler={(e) => setInfoFileds(p => ({ ...p, Theater: e.target.value, TheaterName: e.target.value }))}
             labelPositioin={"top"}
             value={infoFileds.TheaterName}
             variant='outlined'
             isValueBold 
             isTitelBold
             
             helpText={""}
             />
         </Flex>
        { 
         infoFileds.Theater &&
         <Flex  bgcolor={"#fff"}>

              <Flex direction={"row"} p={0.5}  gap={1} alignItems={"center"} >
                   <IoTicket size={"2em"} color={theme.palette.primary.main}  />
                   <Flex>
                   <Typography  fontWeight={'bold'}  fontSize={!xs?13:18} >מספר כרטיסים זמינים למכירה : {100} </Typography >
                   <Typography   fontSize={!xs?11:15}  >מסיר את המושבים המסומנים כחסומים</Typography>
                </Flex>
              </Flex>
              
              <Flex p={0.5} gap={1} direction={"row"} alignItems={"center"}   >
                <IoMdAddCircle color={theme.palette.primary.main} size={"2.5em"}   />
                 <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}  gap={2} >              
                     <Flex  flexGrow={1}>
                       <Typography fontWeight={'bold'} fontSize={!xs?12:18}>  הוסף סוגי כרטיסים</Typography>
                       <Typography fontSize={!xs ? 11 : 15} > סוג הכרטיס ו הפרטים יוצגו ללקוח בעת הרכישה  </Typography>     
                    </Flex>
                </Flex>
              </Flex>

              <Flex display={"row"} alignSelf={"center"} m={1} >
                <MakeNewTickit setTabPage={setTabPage} />
              </Flex>
         </Flex>
         }
         {/* loop over tickits tikits.map....  */}
         {tickets.map((ticket,i) => 
           <TicketComponent 
              key={"ticket" + i + ticket.selectedType} 
              {...ticket} 
              index={i}
           />
          )}
      </Flex>
    </Container>
     )
   }
   // price={ticket.price} eventName={ticket.eventName} location={ticket.location} cat={ticket.cat} Date={ticket.Date} EndSealesDate={ticket.EndSealesDate} selectedType={ticket.selectedType} priceInfo={""}













export default TicketsTab