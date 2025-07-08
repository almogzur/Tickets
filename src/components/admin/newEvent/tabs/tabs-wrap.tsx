//components
import {  Stack as Flex ,useTheme, Box, Tabs, Tab, Button, SpeedDial} from "@mui/material"

import {  CSSProperties,  RefObject,  useContext, useState } from "react"

// Context use
import WidthContext from "@/context/WidthContext"

//Icons 
import { FcIntegratedWebcam } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcStackOfPhotos } from "react-icons/fc";

import { FcBinoculars } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";

// Tabs 
import TicketsTab from './ticket-tab/tickets-wrapper'
import SettingTab from "./settings-tab/settings-tab-wrap"
import ColorTab from "./colors-tab"
import AdOptionsTab from "./ad-options-tab"
import InfoFormTab from "./info-form-tab/Info-form-tab"
import PreviewTab from "./preview-tab"
import { IoTicket } from "react-icons/io5";
import tabsPageContext from "@/context/admin/new-event/tabs/tabs-page-context";
import { blue } from "@mui/material/colors";



//Types



interface TabsWrapPropsType { 
  DraftId?:string
 }

const TabsWraper = ({ DraftId}:TabsWrapPropsType)=>{

    const theme = useTheme()
    const {tabValue, setTabValue} = useContext(tabsPageContext);
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


    const TabStyleAttribute :CSSProperties = {
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
        <Tab value={0} label="מידע כללי"  sx={{...TabStyleAttribute}}  icon={<FcInfo size={"2em"} />}    /> 
        <Tab value={1} label="כרטיסים"  sx={{...TabStyleAttribute}} icon={<IoTicket size={"2em"} color={theme.palette.primary.main} />} />
        <Tab value={2} label="הגדרות"  sx={{...TabStyleAttribute}}   icon={<FcSettings size={"2em"} />}  />
        <Tab value={3} label="צבעים"  sx={{...TabStyleAttribute}} icon={<FcStackOfPhotos size={"2em"} />}  />
        <Tab value={4} label="תצוגה מקדימה "  sx={{...TabStyleAttribute}} icon={<FcBinoculars size={"2em"}/>} />
        <Tab value={5} label="פירסום"  sx={{...TabStyleAttribute}} icon={<FcIntegratedWebcam size={"2em"}/>}  />

       </Tabs>
  
       <Flex  
           direction={"row"} 
           justifyContent={"center"}   
           height={'calc(100% - 80px)'} 
           overflow={"auto"} 
           minWidth={"100%"} // don't remove ***

      >
        {
        tabValue=== 0 ?
        <InfoFormTab    />
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
       <PreviewTab/>
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

