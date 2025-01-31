import SwitchWrap from "@/components/gen/switch-wrap"

import SwitchWithTextWrap from "@/components/gen/switch-with-text-wrap"
import WidthContext from "@/context/WidthContext"
import { Box, Container , Divider, Stack as Flex, SelectChangeEvent, Tab, Tabs, useTheme} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import SelectWrap from "@/components/gen/select-wrap"
import TabsEventSettingsContext from "@/context/admin/new-event/tabs/tabs-event-settings-context"
import SwitchWithTextAndChildren from "@/components/gen/switch-with-text-wrap"

export default  function SettingTabEventTab() {
          const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
          const { eventSetting, setEventSetting  } =useContext(TabsEventSettingsContext)

    const ColumnA = Flex
    const ColumnB = Flex

    return (
        <Container  sx={{ m:2, p:1,  }}   >
          <Flex direction={!xs? 'column': "row"} justifyContent={"center"} >

        <ColumnA p={2}  width={!xs? undefined: "50%"} alignItems={"center"} >

          <SwitchWithTextAndChildren
               variant='outlined'
               mainText={" הגבל מספר מושבים"}
               subText={"הגבל מספר מושבים שהלקוח יכול לקנות   "} 
               value={eventSetting.limitClientTicket}
               switchOnChangeHendler={(e,checked)=>{setEventSetting(p=>({...p, limitClientTicket : checked }))} }
                  >
                   <SelectWrap 
                      label={"מספר"}
                      items={
                        Array.from(
                          {length:10}, // array are json in js and this tell the array constractor JSON length property is 10 
                          (_,i)=>{  return { label : `${i+1}` ,value:i }}, // map function Es6 => dont have This binds
                          {} // optinal thisArg  when useing ES5 function this biends to the map function this 
                        )
                     }
                     value={eventSetting.ticketLimit} 
                     changeHndler={(e)=>{setEventSetting(p=>({...p,ticketLimit:e.target.value}))}} 
                     helpText={""} 
                     labelPositioin={"end"}
                     
                     />
           </SwitchWithTextAndChildren>

  

    
        </ColumnA >

         <ColumnB p={2}  width={!xs? undefined: "50%"}  alignItems={"center"}  >
         <SwitchWithTextAndChildren
           variant='outlined'  
            mainText={"רצף מושבים "}
             subText={"הלקוח אינו  יכול לבחור מושבים  שלא ברצף"} 
             value={eventSetting.canSelectNotRelatedSites}
            switchOnChangeHendler={()=>{setEventSetting(p=>({...p,canSelectNotRelatedSites:!p.canSelectNotRelatedSites}))} } /
              >
        </ColumnB>
        </Flex>

       </Container>
      );
}

