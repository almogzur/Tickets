
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
//Icons 

import { FcFilm, } from "react-icons/fc";
import TicketComponent from "./ticket"
import { IoMdAddCircle } from "react-icons/io"
import { BaceTIcketType, TheaterType, 
 } from "@/pages/admin/new-event"


import Eilat_1 from "@/constants/theathers/eilat_1";
import Eilat_2 from "@/constants/theathers/eilat_2";


import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context"
import SelectWrap from "@/components/select-wrap"
import { IoTicket } from "react-icons/io5"






interface TicketsTabPropsType {  setTabPage : Dispatch<SetStateAction<number>>}
 
  const TicketsTab = ({setTabPage}:TicketsTabPropsType)=>{ 

       const theme = useTheme()
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
       const {tickets,setTickets}= useContext(TabsTicketContext)
       const {infoFileds, setInfoFileds} = useContext(TabsInfoContext)

       const updateTicket=(  key: "price"|"type"|"discription"|"discoundInfo" , value:string|number ):void=>{
       
             setTickets(p=>({...p,[key]:value}))
         }
       const updteTicketsArray= (ticket:BaceTIcketType, Action:"add"|"remove"):void=>{
           
            if(Action==="add"){setTickets(p=>([...p,ticket]))}
            else if (Action === "remove"){
                 setTickets(p=>([...p].filter((item)=> item !== ticket)))
            }
       
         }
       const countTheaterSeatAmount = ( Theater: TheaterType ) : number =>{

        const combineSeats  = [Theater.mainSeats,Theater.sideSeats]
    
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
        direction={"row"}
         justifyContent={"center"}   
        
        >
          <Container        sx={{ m:2, p:1 }}  >
        {/* Seats Amount */}
        <SelectWrap 
              label={"בחר אולם"}
              items={[{ label: Eilat_1.ThaeaterName, value: Eilat_1 }, { label: Eilat_2.ThaeaterName, value: Eilat_2 }]}
              changeHndler={(e) => setInfoFileds(p => ({ ...p, Theater: e.target.value }))} labelPositioin={"top"}               
                />
        <Divider sx={{borderWidth:3,mt:1}} />
        { infoFileds.Theater &&
          <>
         <Flex position={"sticky"} top={0}  zIndex={2} bgcolor={"#fff"}>
          
  
          <Flex direction={"row"} p={1}  gap={2} alignItems={"center"} >
            <IoTicket size={"2em"} color={theme.palette.primary.main}  style={{border:`solid ${theme.palette.primary.main} ` ,  padding:4 }} />
            <Flex>
              <Typography   color="black" fontSize={!xs?17:20} >מספר כרטיסים זמינים למכירה  {100} </Typography >
              <Typography  color="black"   fontSize={!xs?13:15}  >מסיר את המושבים המסומנים כחסומים</Typography>
       
            </Flex>

          </Flex>
              

          <Flex p={1} gap={2} direction={"row"} alignItems={"center"}   >

                <IoMdAddCircle color={theme.palette.primary.main} size={"2em"}   style={{border:`solid ${theme.palette.primary.light} ` ,  padding:4  }}   />
               <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"} width={"100%"}  gap={2} >              
                   <Flex  flexGrow={1}>
               <Typography  fontSize={!xs?15:20}>  הוסף סוגי כרטיסים</Typography>
               <Typography variant='subtitle2' > סוג הכרטיס ו הפרטים יוצגו ללקוח בעת הרכישה  </Typography>
           
                   </Flex>
                       {/* Add State updae functions */}
                     <Flex >
                        <MakeNewTickit setTabPage={setTabPage}/>
                     </Flex>
               </Flex>
          </Flex>

          <Divider sx={{borderWidth:2}} />
         </Flex>
        
         </>
         }
          {/* loop over tickits tikits.map....  */}
  
          </Container>

          
     </Flex>
     )
   }













export default TicketsTab