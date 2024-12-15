
import {  Typography  , Stack as Flex, Button , Box, Divider, FormControl, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import {Dispatch, SetStateAction, useContext, useEffect,useState} from 'react'
import WidthContext from '@/context/WidthContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Avatar from '@mui/material/Avatar';
import { MdDelete } from "react-icons/md";
import { MobileDatePicker ,MobileTimePicker} from '@mui/x-date-pickers'
import { FcPlanner } from "react-icons/fc";
import TabsEventDatesContext from '@/context/tabs-event-dates-context'

import { MdExpandCircleDown } from "react-icons/md";

import { useTheme } from '@mui/material/styles';
import { Schedule } from '@/pages/_app';

import InputWrap from '../../input';





const DatesList = ()=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const { schedules,setSchedules,addEventDate,removeDate,dateEroor, } = useContext(TabsEventDatesContext)
    const [expanded, setExpanded] = useState<number | false>(false);

    const ExpendedChangeHendler = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {    
    
        setExpanded(isExpanded ? panel : false);
      };

    const theme = useTheme()
 // first pick day 
 // then pick enven repetition time that dat ie 3 6 9 
 // mark done 
 // contine to new day 



  return (
    <>
        {/* piker */}
       <Flex direction={'row'} alignItems={'end'} mx={2}  >

        <FcPlanner size={'3em'}  />

        <MobileDatePicker    
             slotProps={{textField:{ placeholder:"לחץ לבחור תאריך " ,    }}}
            sx={{mt:2 }}
 
             onAccept={addEventDate}
        
       />
       </Flex>

       <Divider sx={{m:1, borderWidth:3 }}/>
     {/* list */}
       <Flex  
         width={"inherit"}  
         height={'calc(85% - 80px)'}
         overflow={"auto" } 
        >   
        <Box  width={"100%"}  >
         <List  >
             {schedules.map((schedul,i)=>{         
                return <MainDate 
                    key={schedul.date.toString()+i+"EventDate"}  
                    schedul={schedul} 
                    schedulIndex={i}  
                    panel={expanded}  
                    ExpendedChangeHendler={ExpendedChangeHendler} 
                  />  
                 })}
         </List>
       </Box>


      </Flex>
    </>
 )
}

export default DatesList



interface MainDatePropsType { 
  schedul:Schedule
  schedulIndex:number
  panel:number|false
  ExpendedChangeHendler:(panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => void
 }



const MainDate = ({ schedul,schedulIndex , panel,ExpendedChangeHendler }:MainDatePropsType)=>{

   const { removeDate,dateEroor, addEventHour} = useContext(TabsEventDatesContext)
   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


  const theme = useTheme()

  const options :Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        

  return  ( 
 
     <Accordion expanded={panel === schedulIndex+1 }  onChange={ExpendedChangeHendler(schedulIndex+1)}  sx={{ width:"inherit"  , boxShadow:theme.shadows[1] }}   >

      <AccordionSummary  
        sx={{position:panel === schedulIndex+1 ? "sticky" : null, top:0 ,zIndex:2 ,bgcolor:"#fff"}}
        expandIcon={<MdExpandCircleDown size={"3em"}  />}
         >
          
           <Flex direction={'row'}    alignItems={"center"} justifyContent={"space-between"}  gap={2} width={"100%"}   >
            <Typography textAlign={'start'} variant={"h6"} > { schedul.date.toLocaleDateString("he-IL",options)  }</Typography>          


             <Avatar sx={{background:theme.palette.error.main , mx:3 }} color='error' onClick={()=>removeDate(schedul)} variant='rounded'  >
            <MdDelete   />
            </Avatar>
            
          </Flex>
          
       
      </AccordionSummary>
      <Divider sx={{borderWidth:1.5 , background:theme.palette.error.main ,position:panel === schedulIndex+1 ? "sticky" : null, top:75 ,zIndex:2  }} />


       <Flex direction={"row"} alignItems={"center"}  bgcolor={"#fff"}   gap={1}   p={2}  position={ panel === schedulIndex+1 ? "sticky" : null} top={80} zIndex={2} >

              <FcPlanner size={"2em"} />
              <MobileTimePicker    
                    slotProps={{textField:{ placeholder:"לחץ לבחור שעה " ,    }}}      
                    onAccept={(e)=>{  addEventHour(e,schedul,schedulIndex) } }
                   />
           
       </Flex>
       
        {schedul.hours.map(({time,endOfSales},i)=>{
           return ( <HoursListItem key={time} time={time} schedul={schedul} hoursIndex={i} schedulIndex={schedulIndex}  />
     
            )
         })
   
      }
      <Divider sx={{borderWidth:1.5 , background:theme.palette.error.main , }} />
    </Accordion>
 
)
  }


const HoursListItem =({time,schedul,hoursIndex,schedulIndex}:{time:string,schedul:Schedule,hoursIndex:number,schedulIndex:number})=>{
  const { removeEventHour} = useContext(TabsEventDatesContext)

  const theme = useTheme()
     return(
           
            <Flex direction={"row"} p={0.5} alignItems={"center"}  gap={1} justifyContent={"space-around"}  >
                    <Typography variant='body1' fontWeight={700} >{"שעה"} : {time}</Typography>
                    <InputWrap stateName={''} label={' סגירת הזמנות  '}/>
                    <Avatar sx={{background:theme.palette.error.main , mx:3 }} color='error' variant='rounded'  >
                      <MdDelete size={""} onClick={(e)=>removeEventHour(hoursIndex,schedulIndex)}   />
                    </Avatar>
            </Flex>

           

     
     )
}
