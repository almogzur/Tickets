import  { useContext, useState , Fragment ,  } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box , Stack as Flex } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Button} from '@mui/material'

import AdmindDawerContext from '../context/AdmindDawerContext';
import { RiArchiveDrawerFill } from "react-icons/ri";
import { FcPuzzle } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

import Link from 'next/link';

const DRAWER_OPEN_WIDTH = 160;


const links  = [
  {text:'ראשי' , Icon:<FcHome size={"2em"} /> , link:"/admin" },

  {text:'צור אירוע' , Icon:<FcPuzzle size={"2em"} /> , link:"/admin/new-event" },
  {text:'ניהול אירועים ' , Icon:<FcBusinessman size={"2em"} /> , link:"/admin/manage-events" }

]

const subLinks = [
  {text:"" , Icon:"" , link:"" },


]



export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const theme =useTheme()
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: DRAWER_OPEN_WIDTH , direction:"rtl" }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {links.map(( {text,Icon,link}, index) => (
          <Item text={text} Icon={Icon} link={link} index={index} key={text}/>  
          ))}
      </List>
      <Divider />
      <List>
        {/* {subLinks.map((text, index) => (
          <Item text={text} index={index} key={text}/>  ))} */}
      </List>
    </Box>
  );

  return (
    <Flex direction={'row'} justifyContent={"end"}  sx={{background:theme.palette.background.paper}}  >
      <Button onClick={toggleDrawer(true)}><RiArchiveDrawerFill size={'2em'}/></Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' >
        {DrawerList}

        <ListItem sx={{background:"gray"}}>
          <ListItemButton  sx={{minHeight: 48}}>
            <ListItemIcon
                 sx={{ } }
              >
              <FcCancel size={"2em"}/>
            </ListItemIcon>  

            <ListItemText
             primary={'התנתק'}
             sx={ {textAlign:"start"}}
             />
         </ListItemButton>
       </ListItem>

      </Drawer>
    </Flex>
  );
}

const Item  = ({text, Icon ,link , index})=>{
  return    (  
   
<Link href={link} style={{textDecoration:'none'  , color:"black" }}  >
  <ListItem  disablePadding sx={{}} >
   <ListItemButton
    sx={{minHeight: 48}}
  >
     <ListItemText
        primary={text}
        sx={ {textAlign:"start"}}
      />

      <ListItemIcon
        sx={{ minWidth: 0, justifyContent: 'center', padding:0.5 } }
       >
      {Icon}
     </ListItemIcon>

 

   </ListItemButton>

  </ListItem>
 </Link>
  )
}
