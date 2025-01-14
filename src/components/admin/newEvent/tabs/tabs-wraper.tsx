//Cmponents
import {  Stack as Flex ,useTheme, Box, Tabs, Tab, Button, SpeedDial} from "@mui/material"

import {  CSSProperties,  RefObject,  useContext, useState } from "react"

// Context Useg
import WidthContext from "@/context/WidthContext"

//Icons 
import { FcIntegratedWebcam } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcStackOfPhotos } from "react-icons/fc";

import { FcBinoculars } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";

// Tabs 
import TicketsTab from './ticket-tab/tickets-wrapper'
import SettingTab from "./settings-tab"
import ColorTab from "./colors-tab"
import AdOptionsTab from "./ad-options-tab"
import InfoFormTab from "./info-form-tab/Info-form-tab"
import PrevieTab from "./preview-tab"
import { IoTicket } from "react-icons/io5";
import tabsPageContext from "@/context/admin/new-event/tabs/tabs-page-context";
import { blue, green, grey } from "@mui/material/colors";



//Types



interface TabFormPropsType { 
  eventNameRef: RefObject<HTMLInputElement>
 }

const TabsWraper = ({eventNameRef }:TabFormPropsType)=>{

    const theme = useTheme()
    const {tabValue, setTabValue} = useContext(tabsPageContext);
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


    const TabComonStyleAttribute :CSSProperties = {
       color:"#fff",
       fontWeight:700,
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setTabValue(newValue);
    };
    
    return (

       <Box  
        sx={{ 
             height:!sm?550:850 ,
             direction:"rtl",
             boxShadow:theme.shadows[3]
           }}   
        >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor='primary'
          sx={{ 
              background:"black",
               position:'sticky',
               top:0,
               zIndex:100,
               ".MuiTabs-indicator":{
                backgroundColor:theme.palette.warning.main,
                boxShadow:` 0 15px 60px  1.1em ${blue[700]} `,
                borderRadius:45
              },
              }}
          scrollButtons
          allowScrollButtonsMobile        
          variant='scrollable'
          
          
         >
        <Tab value={0} label="מידע כללי"  sx={{...TabComonStyleAttribute}}  icon={<FcInfo size={"2em"} />}    /> 
        <Tab value={1} label="כרטיסים"  sx={{...TabComonStyleAttribute}} icon={<IoTicket size={"2em"} color={theme.palette.primary.main} />} />
        <Tab value={2} label="הגדרות"  sx={{...TabComonStyleAttribute}}   icon={<FcSettings size={"2em"} />}  />
        <Tab value={3} label="צבעים"  sx={{...TabComonStyleAttribute}} icon={<FcStackOfPhotos size={"2em"} />}  />
        <Tab value={4} label="תצוגה מקדימה "  sx={{...TabComonStyleAttribute}} icon={<FcBinoculars size={"2em"}/>} />
        <Tab value={5} label="פירסום"  sx={{...TabComonStyleAttribute}} icon={<FcIntegratedWebcam size={"2em"}/>}  />
        <Tab value={6} label="שמור"  sx={{...TabComonStyleAttribute}} />

       </Tabs>
  
       <Flex  
           direction={"row"} 
           justifyContent={"center"}   
           height={'calc(100% - 80px)'} 
           overflow={"auto"} 
           minWidth={"100%"} // dont remove ***

      >
        {
        tabValue=== 0 ?
        <InfoFormTab   eventNameRef={eventNameRef} />
        :
        tabValue === 1?
       <TicketsTab setTabValue={setTabValue} />
       :
       tabValue === 2 ?
       <SettingTab/>
       :
       tabValue === 3 ?
       <ColorTab/>
       :
       tabValue === 4 ?
       <PrevieTab/>
       :
       tabValue=== 5?
       <AdOptionsTab/>
       :null
      }
   
      </Flex>
      </Box>

    )
    
  }

export default TabsWraper

