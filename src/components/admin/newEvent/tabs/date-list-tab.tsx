
import {  Typography  , Stack as Flex, Button , Box, Divider, FormControl, Alert, Accordion, AccordionSummary, AccordionDetails, Fade } from '@mui/material'
import {Dispatch, SetStateAction, useContext, useEffect,useState} from 'react'
import WidthContext from '@/context/WidthContext';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import Avatar from '@mui/material/Avatar';
import { MdDelete } from "react-icons/md";
import { MobileDatePicker ,MobileDateTimePicker,MobileTimePicker} from '@mui/x-date-pickers'
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
 
     <Accordion expanded={panel === schedulIndex+1 }  onChange={ExpendedChangeHendler(schedulIndex+1)}  sx={{ width:"inherit"  }}   >

      <AccordionSummary  
        sx={{position:panel === schedulIndex+1 ? "sticky" : null, top:10 ,zIndex:2 ,bgcolor:"#fff" ,border:"nonce" , height:80}}
        expandIcon={<MdExpandCircleDown size={"3em"}  />}
         >
          
           <Flex direction={'row'}    alignItems={"center"} justifyContent={"space-between"}  gap={2} width={"100%"}  >
            <Typography textAlign={'start'} variant={"h6"} > { schedul.date.toLocaleDateString("he-IL",options)  }</Typography>          


             <Avatar sx={{background:theme.palette.error.main , mx:3 }} color='error' onClick={()=>removeDate(schedul)} variant='rounded'  >
               <MdDelete   />
            </Avatar>
            
          </Flex>
          
      </AccordionSummary>
        
       <Flex direction={"row"} alignItems={"center"}     gap={1}   p={2 }    position={"sticky"} top={"10%"} height={70} >

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

    </Accordion>
 
)
  }


const HoursListItem =({time,schedul,hoursIndex,schedulIndex}:{time:string,schedul:Schedule,hoursIndex:number,schedulIndex:number})=>{
  const { removeEventHour} = useContext(TabsEventDatesContext)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const theme = useTheme()
     return(
           
            <Flex direction={"row"} p={0.5} alignItems={"center"} justifyContent={!xs? "center": "space-between"}  >
                    <Typography variant='body1' sx={{width:110 ,mx:2}} fontWeight={700} >{"שעה"} : {time}</Typography>
                   <MobileDateTimePicker
                                       slotProps={{textField:{ placeholder:" סגירת מכירות " ,    }}}      

                     />
                    <Avatar sx={{background:theme.palette.error.main , mx:1 }} color='error' variant='rounded'  >
                      <MdDelete size={""} onClick={(e)=>removeEventHour(hoursIndex,schedulIndex)}   />
                    </Avatar>
            </Flex>

           

     
     )
}
