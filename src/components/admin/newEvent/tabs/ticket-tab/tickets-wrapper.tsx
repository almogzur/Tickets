
// React
import { ChangeEventHandler, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"

//Context Useg
import WidthContext from "@/context/WidthContext"
import TabsTicketContext from "@/context/admin/new-event/tabs/tabs-ticket-context"

//Types
import { FullDateOptions } from "@/pages/_app"

// Components
import MakeNewTickit from "./make-new-ticket"
import { Container, Divider, Stack as Flex , Typography , useTheme} from "@mui/material"

//Icons 
import TicketComponent from "./ticket"
import { IoMdAddCircle } from "react-icons/io"


import Eilat_1 from "@/constants/theathers/eilat_1";
import Eilat_2 from "@/constants/theathers/eilat_2";


import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context"
import SelectWrap from "@/components/gen/select-wrap"
import { IoTicket } from "react-icons/io5"
import { infoFiledsType } from "@/components/admin/newEvent/types/new-event-types"
import { TheaterType } from "@/components/admin/newEvent/theater/types/theater-types"
import { Seats } from "@/components/theater-gen/types/theater-types"



interface TicketsTabPropsType {  setTabValue : Dispatch<SetStateAction<number>>}
 
  const TicketsTab = ({setTabValue}:TicketsTabPropsType)=>{ 

   const theme = useTheme()
   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
   const {tickets,setTickets}= useContext(TabsTicketContext)
   const {infoFileds, setInfoFileds} = useContext(TabsInfoContext)
   
   useEffect(() => {
    if (infoFileds.Theater) {
      
      const totalSeats = countTheaterSeat(infoFileds.Theater);
      setInfoFileds((prev:infoFiledsType) => ({ ...prev, availableSeatsAmount: totalSeats }));
    }
  }, [infoFileds.Theater, infoFileds.TheaterName, setInfoFileds]);



   const countTheaterSeat = (Theater: TheaterType | undefined): number => {
    if (!Theater) {
//      console.log("No Theater");
      return 0;
    }
  
    const skipThisValue = 3; // Value to exclude
    let totalSeats = 0;
  
    // Combine main and side seat sections
    const combinedTheaterSeats: Seats[]  = [Theater.mainSeats, Theater.sideSeats];
  
    // Iterate through each section (main and side seats)
    combinedTheaterSeats.forEach((section) => {
      // For each row in the section
      Object.values(section).forEach((seatsArray) => {
        // Filter out all occurrences of the skip value from the row
        const filteredSeats = seatsArray.filter((seat) => seat !== skipThisValue);
  
        // Add the remaining seat count to the total
        totalSeats += filteredSeats.length;
      });
    });
    return totalSeats ;
  };

  const selectTheater= (TheaterName:"תיאטראות אילת"|"2 אילת"): TheaterType | undefined =>{

        switch(TheaterName){
          case 'תיאטראות אילת': return Eilat_1
          break;
          case "2 אילת" : return Eilat_2
          break ;
          default : throw new Error ( " אין מקום כזה ")
          
        }
    
  }
 
  

   const availableSeatsAmount = countTheaterSeat(infoFileds.Theater)

 

   return (
    <Container  sx={{ mt:2 }}   >
      <Flex>
        {/* Seats Amount */}
         <Flex>
           <SelectWrap
             value={infoFileds.TheaterName}
             label={"אולם"}
             items={[{ label: Eilat_1.ThaeaterName, value: Eilat_1.ThaeaterName }, { label: Eilat_2.ThaeaterName, value: Eilat_2.ThaeaterName }]}
             changeHndler={(e)=>{
              setInfoFileds(p=>({...p,TheaterName:e.target.value , Theater:selectTheater(e.target.value) }))} }
             labelPositioin={"top"}
             variant='outlined'
             isValueBold              
             helpText={""}
             />
         </Flex>
        { 
         infoFileds.Theater &&
         <Flex >

              <Flex direction={"row"} p={0.5}  gap={1} alignItems={"center"} >
                   <IoTicket size={"2em"} color={theme.palette.primary.main}  />
             
                   <Flex>
                   <Typography  fontWeight={'bold'}  fontSize={!sm?13:18} >מספר מושבים זמינים למכירה : {availableSeatsAmount} </Typography >
                   <Typography   fontSize={!sm?11:15}  >מסיר את המושבים המסומנים כחסומים</Typography>
                </Flex>
              </Flex>
              
              <Flex p={0.5} gap={1} direction={"row"} alignItems={"center"}   >
           
                <MakeNewTickit setTabValue={setTabValue} />

                 <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}  gap={2} >
                     <Flex  flexGrow={1}>
                       <Typography fontWeight={'bold'} fontSize={!sm?12:18}>  הוסף כרטיסים</Typography>
                       <Typography fontSize={!sm ? 11 : 15} > סוג הכרטיס ו הפרטים יוצגו ללקוח בעת הרכישה  </Typography>     
                    </Flex>
                </Flex>
                
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