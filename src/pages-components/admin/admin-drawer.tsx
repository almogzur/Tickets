import { ReactNode, useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack as Flex, Typography } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { PiPaperclipFill } from "react-icons/pi";

import { signOut, useSession } from 'next-auth/react'
import { FcBullish, FcCalculator, FcDataSheet, FcExpired, FcFilingCabinet, FcPuzzle, FcSettings, FcHome, FcCancel } from "react-icons/fc";

import Link from 'next/link';

import { FcPrevious } from "react-icons/fc";
import { IoTicketSharp } from 'react-icons/io5';
import { blue, grey } from '@mui/material/colors';

import { DrawerLinkType, ItemPropsType } from '../../types/components-typs/admin/admin-drawer-types';
import { useRouter } from 'next/router';
import { RiDraftFill } from 'react-icons/ri';
import WidthContext from '@/context/WidthContext';

const DRAWER_OPEN_WIDTH = 200;


export default function TemporaryDrawer() {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme()
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)

  const { data: session, status, update } = useSession()
  const router = useRouter()

  const links: DrawerLinkType[] = [
    { text: 'צור אירוע', Icon: <FcPuzzle size={"1.5em"} />, link: "/admin/new-event", },
    { text: "טיוטות", Icon: <RiDraftFill size={"1.5em"} color={theme.palette.warning.main} />, link: "/admin/drafts", },
    { text: 'אירועים ', Icon: <FcDataSheet size={"1.5em"} />, link: "/admin/events" },
    { text: "מימוש כרטיסים", Icon: <FcFilingCabinet size={"1.5em"} />, link: "/admin/ticket-actions" },
    { text: "רשימת דיוור", Icon: <PiPaperclipFill size={"1.5em"} color='#f6444d' />, link: "/admin/clients" },
    { text: "סטטיסטיקה", Icon: <FcBullish size={"1.5em"} />, link: "/admin/analytics" },
    { text: "קופאי", Icon: <IoTicketSharp size={"1.5em"} color={blue[700]} />, link: "/admin/regester" },
    { text: "כספים", Icon: <FcCalculator size={"1.5em"} />, link: "/admin/biling" },
    { text: "הגדרות", Icon: <FcSettings size={"1.5em"} />, link: "/admin/settings" },
  ]

  const translatePathToHeb = (path: string): string => {
    //  console.log(path);
    switch (path) {
      case "/admin": return "ראשי";
        break;
      case "/admin/new-event": return "צור אירוע";
        break;
      case "/admin/analytics": return "סטטיסטיקה";
        break;
      case "/admin/events": return "אירועים";
        break;
      case "/admin/clients": return "רשימית דיוור";
        break;
      case "/admin/regester": return "קופאי";
        break;
      case "/admin/ticket-actions": return "מימוש כרטיסים";
        break;
      case "/admin/biling": return "כספים";
        break;
      case "/admin/settings": return "הגדרות";
        break;
      case "/admin/drafts": return "טיוטות"

      default: return "";
    }

  }

  const subLinks = [
    { text: "", Icon: "", link: "" },
  ]

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <nav dir='rtl' style={{ height: 60, background: "black", display: "flex", flexDirection: "row", width: "100%" }}  >
        <>
          <Flex direction={"row"} alignItems={'center'} width={"20%"} >
            <FcPrevious size={'1.5em'} onClick={toggleDrawer(true)} style={{ padding: 10, margin: 10, cursor: 'pointer' }} />
            <Typography variant='h6' sx={{ color: "#ddd" }}>{translatePathToHeb(router.pathname)}</Typography>

          </Flex>
          <Flex width={"inherit"} direction={"row"} justifyContent={"end"} alignItems={"center"} >
            <Button variant='text' size={!xs ? 'small' : "large"} sx={{ justifySelf: "start", mx: 2 }} onClick={() => { router.push('/') }} > <FcHome size={"2em"} /></Button>
          </Flex>
        </>
      </nav>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor='right'
        SlideProps={{ direction: "left" }}
        ModalProps={{ sx: {} }}
        PaperProps={{ sx: { background: "black" } }}
      >
        <Flex>
          <Typography sx={{ mt: 2, mx: "auto", color: "#fff" }}>{session?.user?.displayName}</Typography>
        </Flex>
        <DrawerList links={links} />

        <ListItem sx={{ background: grey[700], boxShadow: theme.shadows[10] }}>
          <ListItemButton
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <ListItemIcon>
              <FcCancel size={"2em"} />
            </ListItemIcon>

            <Typography>התנתק</Typography>
          </ListItemButton>
        </ListItem>

      </Drawer>
    </>
  );
}




const DrawerList = ({ links }: { links: DrawerLinkType[] }) => {

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

const DrawerItem = ({ text, Icon, link, index, isExpandable }: ItemPropsType) => {

  return isExpandable ?
    <Accordion key={text}
      sx={{ background: 'black', color: "#fff" }}

    >
      <AccordionSummary
        sx={{ p: 1.5, gap: 1 }}
      >
        <Flex direction={"row"} justifyContent={"space-between"} width={"100%"} >
          {text}
          {Icon}
        </Flex>
      </AccordionSummary>

      <AccordionDetails>
        {[1, 2, 3].map((data, i) => {
          return <Link key={data} href={link} style={{ textDecoration: 'none', color: "black" }}  >
            <ListItem disablePadding sx={{ p: 1.5, color: "#fff", "&:hover": { background: "#fff", color: "black" } }} >

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
    <Link href={link} style={{ textDecoration: 'none', color: "black" }}  >
      <ListItem disablePadding sx={{ p: 1.5, color: "#fff", "&:hover": { background: "#fff", color: "black" } }} >

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
