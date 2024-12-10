import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {  Typography  , Stack as Flex, Button , Box, Divider } from '@mui/material'
import {useContext, useEffect,useState} from 'react'
import WidthContext from '@/context/WidthContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { MdDelete } from "react-icons/md";
import { DateTimeValidationError, PickerChangeHandlerContext, renderTimeViewClock } from '@mui/x-date-pickers'
import { grey } from "@mui/material/colors"


import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
interface DatePikerPropsType { date:Date}


interface DatesListPropsType { 
  Dates:Date[]
  addDataHndler :(e:any, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
  removeDateHndler:(dateToRemove: Date) => void
 }

const DatesList = ({addDataHndler,removeDateHndler,Dates}:DatesListPropsType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const theme = useTheme()



 const Item = ({date}:DatePikerPropsType)=>{
         const options :Intl.DateTimeFormatOptions = {
                 weekday: 'long',
                 year: 'numeric',
                 month: 'long',
                 day: 'numeric',
               };
               
 
         return  ( 
        
          <ListItem  sx={{background:grey[100] , border:"solid .5px black", borderRadius:2 , m:1}}   >
           <ListItemAvatar  >
              <Button color='error' onClick={()=>removeDateHndler(date)}>
                <Avatar sx={{background:theme.palette.error.light}} >
                <MdDelete   />
              </Avatar>
              </Button>
           </ListItemAvatar>
 
         <ListItemText 
             sx={{color:theme.palette.primary.main}} 
             primary={date.toLocaleDateString("he-IL",options)} 
             secondary={ "שעה : " + date.toLocaleTimeString("he-IL")  }  
             secondaryTypographyProps={{style:{color:theme.palette.secondary.main}}} />
        </ListItem>

 
        
      
 )
         }


  return (
    <Flex 
      direction={ !md? "column":'row'}  
      mt={3} 

      sx={{}} 
 
      mb={2} 
      boxShadow={` 3px 3px 3px 2px ${theme.palette.primary.main}`}
    >   

    {/* piker */}
     <Flex p={1}     >
   

      <DateTimePicker
        desktopModeMediaQuery='@media (min-width: 600px)'
         
         slotProps={{
     
         openPickerIcon: {  color: 'primary',},
      
         textField:{ placeholder:"בחר תאריך" ,   }
         
       }}


        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
         }}
        onAccept={addDataHndler}
        
       />
       
     </Flex>

     {/* list */}
    
     <Divider sx={{borderWidth:3}} ></Divider>
     
      <Box   height={200}  >
        

      <Typography variant='h4' textAlign={'center'} color='primary'  >תאריכים נבחרים </Typography>
            <List  >
             {Dates.map((date,i)=>{
                return <Item key={date.toString()} date={date}  ></Item>
                 })}
           </List>

     </Box>


    </Flex>
 )
}

export default DatesList