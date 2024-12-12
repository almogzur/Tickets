import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {  Typography  , Stack as Flex, Button , Box, Divider, FormControl } from '@mui/material'
import {Dispatch, SetStateAction, useContext, useEffect,useState} from 'react'
import WidthContext from '@/context/WidthContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { MdDelete } from "react-icons/md";
import { DateTimeValidationError, MobileDateTimePicker, PickerChangeHandlerContext, renderTimeViewClock } from '@mui/x-date-pickers'
import { grey } from "@mui/material/colors"


import { useTheme } from '@mui/material/styles';

interface DatePikerItemPropsType { date:Date , hendler:Dispatch<SetStateAction<Date>>}


interface DatesListPropsType { 
  Dates:Date[]
  addDataHndler :(e:any, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
  removeDateHndler:(dateToRemove: Date) => void
 }

const DatesList = ({addDataHndler,removeDateHndler,Dates}:DatesListPropsType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const theme = useTheme()




  return (
    <>

     <Flex  direction={  "column"}  width={"inherit"}   height={'calc(100% - 80px)'}
  overflow={"auto" } >   

    {/* piker */}
        <FormControl sx={{background:grey[400] , position:'sticky' , top:0 , zIndex:2 , }}  >
      <MobileDateTimePicker    
        slotProps={{
             textField:{ placeholder:"בחר תאריך" ,   }
          }}
        sx={{m:1 ,  }}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
         }}
          onAccept={addDataHndler}
        
       />
       </FormControl>
       
     {/* list */}
      <Box  width={"100%"}  >
         <List   >
             {Dates.map((date,i)=>{
                return <Item key={date.toString()} date={date} hendler={ removeDateHndler}  ></Item>
                 })}
         </List>

     </Box>


    </Flex>
    </>
 )
}

export default DatesList



const Item = ({date ,hendler }:DatePikerItemPropsType)=>{
  const theme = useTheme()

  const options :Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        

  return  ( 
 
   <ListItem  sx={{background:grey[200] , width:"inherit" , m:2 , boxShadow:"0.5px 0.5px 0.1em black"}}   >
    <ListItemAvatar  >
       <Button color='error' onClick={()=>hendler(date)}>
         <Avatar sx={{background:theme.palette.error.light}} >
         <MdDelete   />
       </Avatar>
       </Button>
    </ListItemAvatar>

  <ListItemText 
      primaryTypographyProps={{fontSize:18}}
      
      sx={{color:"black"}} 
      primary={date.toLocaleDateString("he-IL",options)} 
      secondary={ "שעה : " + date.toLocaleTimeString("he-IL")  }  
      secondaryTypographyProps={{style:{ fontSize:15}}} />
 </ListItem>


 

)
  }
