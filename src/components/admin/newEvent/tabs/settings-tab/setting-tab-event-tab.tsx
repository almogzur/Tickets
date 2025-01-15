import SwitchWrap from "@/components/gen/switch-wrap"

import SwitchWithTextWrap from "@/components/gen/switch-with-text-wrap"
import WidthContext from "@/context/WidthContext"
import { Box, Container , Divider, Stack as Flex, Tab, Tabs, useTheme} from "@mui/material"
import { useContext, useState } from "react"

function SettingTabEventTab() {
          const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    
  const [ now ,setNow] = useState(false)

    const ColumnA = Flex
const ColumnB = Flex

    return (
        <Container  sx={{ m:2, p:1,  }}   >
        <Flex direction={!xs? 'column': "row"} justifyContent={"center"} >

        <ColumnA p={1}  width={!xs? undefined: "50%"} alignItems={"center"} >
        <SwitchWithTextWrap variant='outlined' mainText={""} subText={""} switchValue={false} switchOnChangeHendler={()=>{}} switchWrpaerSize='large' />
        <SwitchWithTextWrap variant='outlined' mainText={""} subText={""} switchValue={false} switchOnChangeHendler={()=>{}}/>
        <SwitchWithTextWrap  variant='outlined' mainText={""} subText={""} switchValue={false} switchOnChangeHendler={()=>{}}/>

         <SwitchWithTextWrap variant='outlined'  mainText={"  טקסט ראשי"} subText={"טקסט משני טקסט משניטקסט משניטקסט משניטקסט משני  "} switchValue={now} switchOnChangeHendler={()=>{setNow(!now)} } />
    
        </ColumnA>
        <ColumnB p={1}  width={!xs? undefined: "50%"}  alignItems={"center"}  >
        <SwitchWithTextWrap variant='outlined'  mainText={" "} subText={" "} switchValue={now} switchOnChangeHendler={()=>{setNow(!now)} } />
        <SwitchWithTextWrap variant='outlined'  mainText={"  גדשגדשגגשדגשדגדשגשדגשדגד ראשי"} subText={"טקסט משני טקסט משניטקסט משניטקסט משניטקסט משני  "} switchValue={now} switchOnChangeHendler={()=>{setNow(!now)} } />
        <SwitchWithTextWrap variant='outlined'  mainText={"  גדשגשדגשדגדשגשד ראשי"} subText={"טקסט משני טקסט משניטקסט משניטקסט משניטקסט משני  "} switchValue={now} switchOnChangeHendler={()=>{setNow(!now)} } />
        <SwitchWithTextWrap variant='outlined'  mainText={"  טקסט ראשי"} subText={"טקסט משני טקסט משניטקסט משניטקסט משניטקסט משני  "} switchValue={now} switchOnChangeHendler={()=>{setNow(!now)} } />
    
        </ColumnB>    
      </Flex>

       </Container>
      );
}

export default SettingTabEventTab;