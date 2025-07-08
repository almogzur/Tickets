import { Box, Stack as Flex, Tab, Tabs, useTheme} from "@mui/material"

import { ChangeEvent, CSSProperties, useContext, useState } from "react"
import WidthContext from "@/context/WidthContext"
import { FcDataSheet, FcGlobe, FcSms } from "react-icons/fc"
import { blue } from "@mui/material/colors"
import tabsPageContext from "@/context/admin/new-event/tabs/tabs-page-context"

import SettingTabEventTab from "./setting-tab-event-tab"
import SettingTabMassagesTab from "./setting-tab-massages-tab"
import SettingTabWebsiteTab from "./setting-tab-website-tab"

interface SettingsTabPropsType {}



const SettingTab= ()=>{
  const [settingsTabsValue ,setSettingsTabsValue] =useState(0)
  const theme = useTheme()

  
      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
      
          const TabStyleAttribute :CSSProperties = {
             color:"#fff",
             fontWeight:700,
          }

          const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
            setSettingsTabsValue(newValue);
          };
  
  return (
      <Box width={"100%"}>
        <Tabs
              value={settingsTabsValue}
              onChange={handleTabChange}
              textColor='primary'
              sx={{ 
                  background:"black",
                   zIndex:100,

                   ".MuiTabs-indicator":{
                    backgroundColor:theme.palette.warning.main,
                    boxShadow:` 0 15px 60px  1.1em ${blue[700]}`,
                    borderRadius:45
                  },
                  }}
              scrollButtons
              allowScrollButtonsMobile        
              variant='scrollable'
      >

        <Tab value={0} label="אירוע"  sx={{...TabStyleAttribute}}  icon={<FcDataSheet size={"1.5em"} />}    /> 
        <Tab value={1} label="הודעות "  sx={{...TabStyleAttribute}} icon={<FcSms size={"1.5em"} color={theme.palette.primary.main} />} />  
        <Tab value={2} label="באתר"  sx={{...TabStyleAttribute}} icon={<FcGlobe size={"1.5em"} color={theme.palette.primary.main} />} />  

        </Tabs>
        <Flex
         direction={"row"} 
         justifyContent={"center"}   
         height={'calc(100% - 80px)'} 
         overflow={"auto"} 
         minWidth={"100%"} // don't remove ***
        >
         {
          settingsTabsValue === 0? 
          <SettingTabEventTab/>
         :
          settingsTabsValue === 1? 
          <SettingTabMassagesTab/>
         :
          settingsTabsValue === 2 ?
          <SettingTabWebsiteTab/>
         :
         null
         }
         </Flex>
       </Box>
  )
 }


export default SettingTab