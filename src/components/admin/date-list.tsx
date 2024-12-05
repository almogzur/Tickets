import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {  Typography  , Stack as Flex, Button , Box, Divider } from '@mui/material'

import {useContext, useEffect,useState} from 'react'
import WidthContext from '@/context/WidthContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { MdOutlineDateRange } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { renderTimeViewClock } from '@mui/x-date-pickers'
import { Colors } from '@/lib/colors'

import { useTheme } from '@mui/material/styles';
const DatesList = ()=>{

    const [Dates, setDates] = useState([])
    const [selectedDate , setsSlectedDate] =useState("")    
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const theme = useTheme()

 const hndler = (e) => {

         const newDate = new Date(e.$y , e.$M ,e.$D,e.$H , e.$m) 

         
         

         if (e && e.$y && e.$M && e.$D && e.$H && e.$m ) {
             setDates((prev) => [...prev, newDate ]);
         }
        //  error henler
     };
 const removeDate = (dateToRemove) => {
         setDates((prev) => prev.filter((date) => date !== dateToRemove));
       };

 const Item = ({date})=>{
         const options = {
                 weekday: 'long',
                 year: 'numeric',
                 month: 'long',
                 day: 'numeric',
               };
               
 
         return  ( 
        <>
          <ListItem   >
           <ListItemAvatar  >
              <Button color='error' onClick={()=>removeDate(date)}>
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
        onAccept={hndler}
       />
       
   </Flex>

     {/* list */}
    <Box flexGrow={4} >
         <Typography variant='h4' textAlign={'center'} color='primary'  >תאריכים נבחרים </Typography>
         <Divider variant='middle' sx={{ background:theme.palette.primary.main, borderWidth:3 }}  />

          <Flex height={200}  overflow={'auto'}    >  
         

            <List  >
             {Dates.map((date,i)=>{
                return <Item key={date} date={date}  ></Item>
                 })}
           </List>

          </Flex> 
   </Box>

  </Flex>
 )
}

export default DatesList