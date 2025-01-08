//Cmponents
import {  Stack as Flex ,useTheme, Box, Tabs, Tab, Button, SpeedDial} from "@mui/material"

import {  CSSProperties,  useContext, useState } from "react"

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


import { SlOptions, SlOptionsVertical } from "react-icons/sl";

import { FaCompassDrafting, FaFirstdraft } from "react-icons/fa6";
import SpeedDialWrap from '@/components/gen/speed-dail-wrap'
//Types



interface TabFormPropsType {  }

const TabsWraper = ({ }:TabFormPropsType)=>{

    const theme = useTheme()
    const [pageVale, setPageVale] = useState(0);
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const TabsActions = [
      { icon: <FaFirstdraft size={"2em"} />, name: 'שמור טיוטה' },
    
    ];
    
    const TabComonStyleAttribute :CSSProperties = {
       color:"#fff",
       fontWeight:700,
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
      setPageVale(newValue);
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
          value={pageVale}
          onChange={handleTabChange}
          textColor='primary'
          indicatorColor='primary'
          sx={{ background:"black", position:'sticky',top:0,zIndex:100}}
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
        pageVale=== 0 ?
        <InfoFormTab/>
        :
       pageVale === 1?
       <TicketsTab setTabPage={setPageVale} />
       :
       pageVale === 2 ?
       <SettingTab/>
       :
       pageVale === 3 ?
       <ColorTab/>
       :
       pageVale === 4 ?
       <PrevieTab/>
       :
       pageVale=== 5?
       <AdOptionsTab/>
       :null
      }
   
      </Flex>
      <SpeedDialWrap
                  actions={TabsActions}
                  mainIcon={<SlOptions size={"2em"} />}
                  openToolTip
                  openToolTipPlacement="right"
                  direction={"up"}
                  positions={!sm?{ bottom: 0,left:0 }:{bottom:16,left:10}}       
                  
                  />
      </Box>

    )
    
  }

export default TabsWraper

