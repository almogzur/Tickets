import  {  ReactNode, useState   } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {Box , Stack as Flex } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import { RiArchiveDrawerFill } from "react-icons/ri";
import { FcPuzzle } from "react-icons/fc";
import { FcHome } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

import Link from 'next/link';

import { FcPrevious } from "react-icons/fc";

const DRAWER_OPEN_WIDTH = 200;


const links  = [
  {text:'ראשי' , Icon:<FcHome size={"1.5em"} /> , link:"/admin" },
  {text:'צור אירוע' , Icon:<FcPuzzle size={"1.5em"} /> , link:"/admin/new-event" },
  {text:'ניהול אירועים ' , Icon:<FcBusinessman size={"1.5em"} /> , link:"/admin/manage-events" }

]
const subLinks = [
  {text:"" , Icon:"" , link:"" },


]

export default function TemporaryDrawer() {

  const [ open, setOpen ] = useState<boolean>(false);

  const theme = useTheme()
  const toggleDrawer = (newOpen:boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <>
    <nav dir='rtl' style={{ height:60 , background:"black" , display:"flex", flexDirection:"row"  , }   }  >
        <FcPrevious size={'1.5em'}  onClick={toggleDrawer(true)} style={{padding:10 , margin:10 , cursor:'pointer'}}/>
    </nav>


      <Drawer
       open={open}
        onClose={toggleDrawer(false)} 
        anchor='right'
        SlideProps={{ direction:"left" }}
         >
        <DrawerList/>

        <ListItem sx={{background:"gray"}}>
          <ListItemButton  onClick={()=>signOut({callbackUrl:"/"})}>
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
      </>
  );
}




const DrawerList = ()=>{
 
return (
  <Box sx={{ width: DRAWER_OPEN_WIDTH, direction: "rtl" }} role="presentation" >
    <List>
      {links.map(({ text, Icon, link }, index) => (
        <DrawerItem text={text} Icon={Icon} link={link} index={index} key={text} />
      ))}
    </List>
    <Divider />
    <List>
      {/* {subLinks.map((text, index) => (
          <Item text={text} index={index} key={text}/>  ))} */}
    </List>
  </Box>
)
}


interface ItemPropsType  {text: string ,Icon :ReactNode , link:string,index:number }

const DrawerItem  = ({text, Icon ,link , index} :ItemPropsType)=>{
  return    (  
   
<Link href={link} style={{textDecoration:'none'  , color:"black" }}  >
  <ListItem  disablePadding sx={{}} >
   <ListItemButton
       
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
