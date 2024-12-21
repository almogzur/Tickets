
import {Dispatch, SetStateAction, useContext, useEffect,useState} from 'react'
import WidthContext from '@/context/WidthContext';
import { useTheme } from '@mui/material/styles';

//Dates Formats 
import { FullDateOptions , samiDateOptions } from '@/pages/_app';

//Icons
import { MdDelete } from "react-icons/md";
import { FcPlanner } from "react-icons/fc";
import { MdOutlineTimer } from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { MdOutlineDateRange } from "react-icons/md";

import { TiArrowUpThick } from "react-icons/ti";


//Components
import {  Typography  , Stack as Flex, Button , Box, Divider, FormControl, Alert, Accordion, AccordionSummary, Container, } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { MobileDateTimePicker} from '@mui/x-date-pickers'


//Context 
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';

// Types
import dayjs from 'dayjs';

const DatesList = ()=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const {  infoFileds ,setInfoFileds } = useContext(TabsInfoContext)

    const [dateEroor,setDateEroor ]= useState(false)

    const theme = useTheme()

   const addScheduleDate = (e:dayjs.Dayjs) :void => {

    if (e && e.year() && e.month() && e.date() && e.day()  ,e.hour(), e.minute() ) {
      // set the time in utc  -3 form area time , 
       const newDate = new Date(e.toDate())

          
      }
    //  error henler
};



  return (
    <>
      
       <Flex direction={'row'} alignItems={'center'}   gap={1} >

   

     
                <FcPlanner color={theme.palette.primary.main} size={'2.5em'}  />

                <MobileDateTimePicker                 
                  orientation= { !sm? "portrait": 'landscape'}    
                  minDate={dayjs(new Date())}
                  slotProps={{
                    textField:{ 
                    required:true,
                    placeholder:"בחר יום" ,
                 },
            }}
              sx={{mt:2 , height:60  }}
                   onAccept={(e)=> e !== null ? addScheduleDate(e) : null}
           />







       </Flex>


       <Flex   >      
              { infoFileds.day && <MainDate  />  }
      </Flex>
    </>
 )
}

export default DatesList




const MainDate = ({   })=>{
   const {infoFileds, setInfoFileds} = useContext(TabsInfoContext)
   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()

  const setEndOfDate= (e:dayjs.Dayjs) :void =>{
   
    if (e && e.year() && e.month() && e.date() && e.day()  ,e.hour(), e.minute()) {
      const newDate = new Date(e.toDate())
      console.log(newDate);
      
    } 
   
   }

   const removeScheduleDate = ():void => {

   };
   

        

  return  ( 
 
     <Accordion    >

      <AccordionSummary  
        sx={{position:"sticky" , top:0 ,zIndex:2 ,bgcolor:"#fff" ,border:"nonce" , height:80 ,direction:"ltr", m:0 ,p:1}}
        expandIcon={
          <Avatar variant='rounded' sx={{ borderRadius:1 , background:"#fff"}  }>
          <TiArrowUpThick  size={"1.5em"} style={{marginRight:0 }} color='black' />
          </Avatar>
        }
         >
          
           <Flex direction={'row'}    alignItems={"center"}  width={"100%"}  justifyContent={'space-between'} >

         { infoFileds.day ?  <Typography sx={{mx:1}} textAlign={'start'}   variant={"h6"} > { infoFileds.day.toLocaleTimeString("he-IL",FullDateOptions) }</Typography>     :null    } 

             <Avatar sx={{background:theme.palette.error.main  ,}} color='error' onClick={()=>removeScheduleDate} variant='rounded'  >
               <MdDelete  size={"1.5em"}  />
            </Avatar>

            
          </Flex>
          
      </AccordionSummary>
        
       <Flex direction={"row"} gap={1} p={2 } >


              <FcPlanner size={"3em"} />
              <MobileDateTimePicker    
         
                    minDate={dayjs(new Date())}
                    maxDateTime={dayjs(infoFileds.day).subtract(2,"hours")}

                    slotProps={{
                      textField:{ 
                        placeholder:"שעת סגירה קופות" ,
                        helperText: <>
                        <Typography textAlign={"start"} variant='subtitle2' >הוסף שעה לסגור קופות </Typography>
                        <Typography textAlign={"start"} variant='subtitle2' >אופציונלי  </Typography>
                        </>
                         }}}      
                         sx={{}}
                    onAccept={ (e)=>  e !== null?   setEndOfDate(e) :null   }
                   />
                   
           
       </Flex>

     
            
     {infoFileds.closingSealesDate && <HoursListItem endOfSalesDate={infoFileds.closingSealesDate.toLocaleDateString("he-IL",FullDateOptions)}/>}
            
    
    </Accordion>
 
)
  }


const HoursListItem =({endOfSalesDate,EventHour}:{EventHour?:string,endOfSalesDate?:string})=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const removeEndOdDate = ()=>{
  }
  
  

  const theme = useTheme()
     return(
           
            <Flex direction={"row"} p={0.5}  alignItems={"center"} justifyContent={"space-between"}  width={!xs?"90%":"80%"}  mx={2}>
          {  EventHour &&   
              <Flex direction={'row'} gap={2} alignItems={"center"}>
                  <MdOutlineTimer size={"2.5em"} />
                  <Typography  width={"90%"}  variant={!xs?'subtitle1':"body1"} fontWeight={700}  > שעת האירוע : {EventHour}</Typography>
                </Flex>
           }    
          {endOfSalesDate && 
          <Flex direction={"row"} gap={2} alignItems={"center"} >
            <FcLeave size={"2em"}    />
            <Typography width={"90%"}  fontWeight={700} > סגירה קופות : {endOfSalesDate}</Typography> 
            </Flex>
          }

               <Avatar  sx={{background:theme.palette.error.main , mx:1 , }}  color='error' variant='rounded'  >
                 <MdDelete size={"1.5em"} onClick={(e)=>  removeEndOdDate()    }   />
                </Avatar>
            </Flex>

           

     
     )
}
