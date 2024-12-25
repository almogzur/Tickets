
import {ChangeEvent, Dispatch, SetStateAction, useContext, useEffect,useState} from 'react'
import WidthContext from '@/context/WidthContext';
import { useTheme } from '@mui/material/styles';


//Components
import {  Typography  , Stack as Flex, Button , Box, Divider, FormControl, Alert, Accordion, AccordionSummary, Container, } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import { DateTimePicker, DateTimeValidationError, MobileDateTimePicker, PickerChangeHandlerContext} from '@mui/x-date-pickers'


//Context 
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';

// Types
import dayjs from 'dayjs';
import InputWrap from '@/components/input-wrap';
import { FullDateOptions } from '@/pages/_app';
import DateTimePickerWrap from '@/components/date-time-wrap';

const DatesList = ()=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const [dateEroor,setDateEroor ]= useState(false)    
    const theme = useTheme()

    const {  infoFileds , setInfoFileds } = useContext(TabsInfoContext)

   const addScheduleDate = (e:dayjs.Dayjs|null ,  context: PickerChangeHandlerContext<DateTimeValidationError>) :void => {

      if (e && e.year() && e.month() && e.date() && e.day() && e.hour()&& e.minute() ) {
      // set the time in utc  -3 form area time , 
       const newDate = new Date(e.toDate())
       setInfoFileds(p=>({...p,Date:newDate}))
       setDateEroor(false)
      }
      else{
        //  error henler
        setDateEroor(true)
      }

    
};
  
  const ErrorHndler = (e:DateTimeValidationError, context:dayjs.Dayjs|null ):void=>{}


  return (
    <>
      
       <Flex     >

       <DateTimePickerWrap                 
          orientation={!sm ? "portrait" : 'landscape'}
          MediaQuery={theme.breakpoints.up("sm")}
          minDate={new Date()}
          value={ infoFileds.Date? infoFileds.Date :undefined }
          onAcceptHendler={addScheduleDate}
          label={"בחר תאריך"} 
          labelPositioin={'end'}
          color='secondary'
          onEroorHndler={ErrorHndler}
                 />


       <InputWrap
           label={"קטגוריה"} 
           variant="outlined"
            value={infoFileds.cat}
              onChangeHndler={(e)=>{setInfoFileds(p=>({...p,cat:e.target.value}))}}
               labelPositioin={'end'}
               />

       </Flex>



    </>
 )
}

export default DatesList





