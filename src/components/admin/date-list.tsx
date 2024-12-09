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
        <>
          <ListItem   >
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
        <Divider variant='middle'  sx={{borderWidth:1}} />
 
        </>
      
 )
         }


  return (
    <Flex 
    direction={ md?  'row' : 'column'}  
    mt={3} 
    alignItems={ !md?'' :'center'} 
    sx={{}} 

    border={!md?"":`solid 1px #ddd`} 
    mb={2} 
    boxShadow={` 3px 3px 3px 2px ${theme.palette.primary.main}`}

    
    >   
    {/* piker */}
   <Flex p={1}  flexGrow={2}   >
      <Typography variant='h4' textAlign={'center'} color={theme.palette.primary.main}  >הוסף תאריכים</Typography>
      {md? <Divider sx={{borderWidth:3 , background:theme.palette.primary.main }} /> :null}

      <DateTimePicker
        desktopModeMediaQuery='@media (min-width: 600px)'
         
         slotProps={{
     
         openPickerIcon: {  color: 'primary',},
      
         textField:{ placeholder:"בחר תאריך" , style:{height: !md? 60 : 200}  }
         
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
    <Box flexGrow={4} >
         <Typography variant='h4' textAlign={'center'} color='primary'  >תאריכים נבחרים </Typography>
         <Divider variant='middle' sx={{ background:theme.palette.primary.main, borderWidth:3 }}  />

          <Flex height={200}  overflow={'auto'}    >  
         

            <List  >
             {Dates.map((date,i)=>{
                return <Item key={date.toString()} date={date}  ></Item>
                 })}
           </List>

          </Flex> 
   </Box>

    </Flex>
 )
}

export default DatesList