
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
import TabsEventDatesContext from '@/context/admin/new-event/tabs/tabs-event-schedules-context'

import { MdExpandCircleDown } from "react-icons/md";

import { useTheme } from '@mui/material/styles';
import { Schedule } from '@/pages/_app';

import InputWrap from '../../input';





const DatesList = ()=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const { schedule,setSchedule,addScheduleDate,removeScheduleDate,dateEroor,  } = useContext(TabsEventDatesContext)
   
    const theme = useTheme()



  return (
    <>
        {/* piker */}
       <Flex direction={'row'} alignItems={'center'} mx={2}   >

        <FcPlanner size={'3em'}  />

        <MobileDatePicker    
              
             slotProps={{
              textField:{ 
                required:true,
                placeholder:"בחור מועד" ,
                 helperText:<Typography variant='subtitle2' textAlign={'start'} >בחר מועד</Typography> 
                 }
                             
              
            }}
            sx={{mt:2 , height:60 }}
 
             onAccept={addScheduleDate}
        
       />
       </Flex>

       <Divider sx={{m:1, borderWidth:3 }}/>
     {/* list */}
       <Flex  
         width={"inherit"}  
         height={'calc(85% - 80px)'}
         overflow={"auto" } 
        >      
       { schedule.day && <MainDate schedul={schedule} />  }
      </Flex>
    </>
 )
}

export default DatesList



interface MainDatePropsType { 
  schedul:Schedule
 
 }

const MainDate = ({ schedul  }:MainDatePropsType)=>{
   const { removeScheduleDate,dateEroor, removeScheduleHour,addScheduleHour,setEndOfDate} = useContext(TabsEventDatesContext)
   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()

  const FullDateOptions :Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour:'2-digit',
    minute:'2-digit'
  };
  const samiDateOptions :Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
    
        };

  const  sortDateOptions :Intl.DateTimeFormatOptions = {
    hour:'2-digit',
    minute:'2-digit'
  };
        

  return  ( 
 
     <Accordion    sx={{ width:"inherit"  }}   >

      <AccordionSummary  
        sx={{position:"sticky" , top:0 ,zIndex:2 ,bgcolor:"#fff" ,border:"nonce" , height:80}}
        expandIcon={<MdExpandCircleDown size={"3em"}  />}
         >
          
           <Flex direction={'row'}    alignItems={"center"} justifyContent={"space-between"}  gap={2} width={"100%"}  >
            <Typography textAlign={'start'} variant={"h6"} > { schedul.day.toLocaleDateString("he-IL",samiDateOptions)   }</Typography>          


             <Avatar sx={{background:theme.palette.error.main , mx:3 ,p:0.5 }} color='error' onClick={()=>removeScheduleDate(schedul)} variant='rounded'  >
               <MdDelete  size={"1.5em"} />
            </Avatar>
            
          </Flex>
          
      </AccordionSummary>
        
       <Flex direction={"row"} gap={1} p={2 } >

              <FcPlanner size={"3em"} />
              <MobileTimePicker    
                    slotProps={{
                      textField:{
                          placeholder:"שעה" ,
                          helperText: <Typography textAlign={"start"} variant='subtitle2' >הוסף שעה לאירוע </Typography> 
                       }}}      
                    onAccept={(e)=>{  addScheduleHour(e,schedul) } } 
                   />
              <FcPlanner size={"3em"} />
              <MobileTimePicker    
                    slotProps={{
                      textField:{ 
                        placeholder:"שעת סגירה קופות" ,
                        helperText: <>
                        <Typography textAlign={"start"} variant='subtitle2' >הוסף שעה לסגור קופות </Typography>
                        <Typography textAlign={"start"} variant='subtitle2' >אופציונלי ניתן לשינוי </Typography>
                        </>
                         }}}      
                    onAccept={(e)=>{ setEndOfDate(e,schedul) } } 
                   />
                   
           
       </Flex>

     
       

     { schedul.hour &&  <HoursListItem EventHour={schedul.hour.toLocaleDateString("he-IL",sortDateOptions).slice(10)}  />}
     
     {schedul.closingSealesDate && <HoursListItem endOfSalesDate={schedul.closingSealesDate.toLocaleDateString("he-IL",FullDateOptions)}/>}
            
    
    </Accordion>
 
)
  }


const HoursListItem =({endOfSalesDate,EventHour}:{EventHour?:string,endOfSalesDate?:string})=>{
  const { removeScheduleHour , removeEndOdDate} = useContext(TabsEventDatesContext)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  

  const theme = useTheme()
     return(
           
            <Flex direction={"row"} p={0.5}  alignItems={"center"} justifyContent={"space-between"}  width={"70%"} mx={'auto'} >
          {  EventHour &&    <Typography variant='body1' fontWeight={700} > שעת האירוע : {EventHour}</Typography>}    
          {endOfSalesDate && <Typography variant='body1' fontWeight={700} > סגירה קופות : {endOfSalesDate}</Typography> }         
                    <Avatar  sx={{background:theme.palette.error.main , mx:1 }} color='error' variant='rounded'  >
                      <MdDelete size={""} onClick={(e)=> endOfSalesDate? removeEndOdDate(): removeScheduleHour()     }   />
                    </Avatar>
            </Flex>

           

     
     )
}
