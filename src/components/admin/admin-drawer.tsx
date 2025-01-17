import  {  ReactNode, useState   } from 'react';
import { useTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Box , Stack as Flex, Typography } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';

import { signOut, useSession } from 'next-auth/react'
import { FcBullish, FcCalculator,  FcDataSheet, FcExpired, FcFilingCabinet, FcPuzzle, FcSettings,FcHome,FcCancel } from "react-icons/fc";

import Link from 'next/link';

import { FcPrevious } from "react-icons/fc";
import { IoTicketSharp } from 'react-icons/io5';
import { blue, grey } from '@mui/material/colors';

import { DrawerLinkType, ItemPropsType } from './admin-drawer-types';
import { useRouter } from 'next/router';
import { RiDraftFill } from 'react-icons/ri';

const DRAWER_OPEN_WIDTH = 200;


export default function TemporaryDrawer() {
  const [ open, setOpen ] = useState<boolean>(false);
  const theme = useTheme()
  const { data: session ,status ,update} = useSession()
  const router = useRouter()
  
  const links :DrawerLinkType[]  = [
    {text:"סטטיסטיקה", Icon:<FcBullish size={"1.5em"} />,link:"/admin/statistics"},
    {text:'צור אירוע' , Icon:<FcPuzzle size={"1.5em"} /> , link:"/admin/new-event", },
    {text:"טיוטות",Icon:<RiDraftFill size={"1.5em"} color={theme.palette.warning.main} /> , link:"/admin/drafts",},
    {text:'אירועים ' , Icon:<FcDataSheet size={"1.5em"} /> , link:"/admin/events" },
    {text:"מימוש כרטיסים",Icon:<FcFilingCabinet size={"1.5em"}  />,link:"/admin/ticket-actions"},
    {text:"קופאי",Icon:<IoTicketSharp size={"1.5em"} color={blue[700]}  /> , link:"/admin/regester"},
    {text:"כספים", Icon:<FcCalculator size={"1.5em"} /> , link:"/admin/finance"},
    {text:"הגדרות", Icon:<FcSettings size={"1.5em"}/> , link:"/admin/settings" },
  ]
  
  const translatePathToHeb =( path : string ):string=>{
  //  console.log(path);
    switch(path){
      case "/admin": return "ראשי" ;
      break;
      case "/admin/new-event": return "צור אירוע" ;
      break;
      case "/admin/statistics": return "סטטיסטיקה" ;
      break;
      case "/admin/events": return "אירועים" ;
      break;
      case "/admin/regester": return "קופאי" ;
      break;
      case "/admin/ticket-actions": return "מימוש כרטיסים" ;
      break;
      case "/admin/finance": return "כספים" ;
     break;
     case "/admin/settings": return "הגדרות" ;
     break;
     case "/admin/drafts": return "טיוטות"

      default :  return "" ;
    }
    
  }

  const subLinks = [
    {text:"" , Icon:"" , link:"" },
   ]

  const toggleDrawer = (newOpen:boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
    <nav dir='rtl' style={{ height:60 , background:"black" , display:"flex", flexDirection:"row"  , }   }  >8
      <Flex direction={"row"} alignItems={'center'}>
        <FcPrevious size={'1.5em'}  onClick={toggleDrawer(true)} style={{padding:10 , margin:10 , cursor:'pointer'}}/>
        <Typography variant='h6' sx={{color:"#ddd"}}>{translatePathToHeb(router.pathname)}</Typography>
        </Flex>
    </nav>
       <Drawer
        open={open}
        onClose={toggleDrawer(false)} 
        anchor='right'
        SlideProps={{ direction:"left" }}
        ModalProps={{sx:{}}}
        PaperProps={{sx:{background:"black"}}}
         >
          <Flex>
            <Typography sx={{mt:2, mx:"auto",color:"#fff"}}>{session?.user?.name}</Typography>
          </Flex>
            <DrawerList links={links}/>
        
            <ListItem sx={{background:grey[700],boxShadow:theme.shadows[10]}}>
          <ListItemButton 
            onClick={()=>signOut({callbackUrl:"/"})}
           >
            <ListItemIcon>
              <FcCancel size={"2em"}/>
            </ListItemIcon>  

            <Typography>התנתק</Typography>
         </ListItemButton>
            </ListItem>

      </Drawer>
      </>
  );
}




const DrawerList = ({links}:{links:DrawerLinkType[]})=>{
 
return (
  <Box sx={{ width: DRAWER_OPEN_WIDTH, direction: "rtl" }} role="presentation" >
    <List>
      {links.map(({ text, Icon, link, isExpandable }, index) => (
        <DrawerItem text={text} Icon={Icon} link={link} index={index} key={text} isExpandable={isExpandable} />
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

const DrawerItem  = ({text, Icon ,link , index, isExpandable} :ItemPropsType)=>{

 return isExpandable  ?
  <Accordion key={text}
    sx={{background:'black',color:"#fff"}}
    
  >
    <AccordionSummary
     sx={{p:1.5,gap:1}}
   >
    <Flex direction={"row"} justifyContent={"space-between"} width={"100%"} >
    {text}
    {Icon}
    </Flex>
   </AccordionSummary>

  <AccordionDetails>
      {[1,2,3].map((data,i)=>{
        return <Link key={data} href={link} style={{textDecoration:'none'  , color:"black" }}  >
          <ListItem  disablePadding sx={{p:1.5,color:"#fff", "&:hover":{background:"#fff",color:"black"}}} >
       
           <Flex
            direction={"row"} 
            justifyContent={"space-between"} 
            width={DRAWER_OPEN_WIDTH}
             >  
           {text}
           {Icon}
            </Flex>
       
         </ListItem>
         </Link>
      })}
  </AccordionDetails>
  </Accordion>
  :  
  <Link href={link} style={{textDecoration:'none'  , color:"black" }}  >
   <ListItem  disablePadding sx={{p:1.5,color:"#fff", "&:hover":{background:"#fff",color:"black"}}} >

    <Flex
     direction={"row"} 
     justifyContent={"space-between"} 
     width={DRAWER_OPEN_WIDTH}
      >  
    {text}
    {Icon}
     </Flex>

  </ListItem>
  </Link>
  
 
  
}
