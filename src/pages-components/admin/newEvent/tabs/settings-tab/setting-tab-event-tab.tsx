
import WidthContext from "@/context/WidthContext"
import { Box, Container , Divider, Stack as Flex, SelectChangeEvent, Tab, Tabs, useTheme} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import TabsEventSettingsContext from "@/context/admin/new-event/tabs/tabs-event-settings-context"
import SelectWrap from "@/HOCs/select-wrap"
import SwitchWithTextAndChildren from "@/HOCs/switch-with-text-wrap"

export default  function SettingTabEventTab() {
          const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
          const { settings, setSetting  } =useContext(TabsEventSettingsContext)

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
               value={settings.limitClientTicket}
               switchOnChangeHendler={(e,checked)=>{setSetting(p=>({...p, limitClientTicket : checked }))} }
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
                     value={settings.ticketLimit} 
                     changeHndler={(e)=>{setSetting(p=>({...p,ticketLimit:e.target.value}))}} 
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
             value={settings.canSelectNotRelatedSites}
            switchOnChangeHendler={()=>{setSetting(p=>({...p,canSelectNotRelatedSites:!p.canSelectNotRelatedSites}))} } /
              >
        </ColumnB>
        </Flex>

       </Container>
      );
}

