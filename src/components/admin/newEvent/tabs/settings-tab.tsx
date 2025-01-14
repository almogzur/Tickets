import InputWrap from "@/components/gen/input-wrap"
import { Box, Container , Divider, Stack as Flex, Tab, Tabs, useTheme} from "@mui/material"
import SwitchWrap from "@/components/gen/switch-wrap"
import SwitchWithTextWrap from "@/components/gen/switch-with-text-wrap"
import { ChangeEvent, CSSProperties, useContext, useState } from "react"
import WidthContext from "@/context/WidthContext"
import { FcDataSheet, FcGlobe, FcInfo, FcSms } from "react-icons/fc"
import { IoTicket } from "react-icons/io5"
import { blue } from "@mui/material/colors"

interface SetingsTabPropsType {}

const ColumnA = Flex
const ColumnB = Flex

const SettingTab= ()=>{
  const [ now ,setNow] = useState(false)
  const [settingsTabsValue ,setSettingsTabsValue] =useState(0)
      const theme = useTheme()
  
      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
          const TabComonStyleAttribute :CSSProperties = {
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

        <Tab value={0} label="הגדרות אירוע"  sx={{...TabComonStyleAttribute}}  icon={<FcDataSheet size={"1.5em"} />}    /> 
        <Tab value={1} label="הודעות ללקוח "  sx={{...TabComonStyleAttribute}} icon={<FcSms size={"1.5em"} color={theme.palette.primary.main} />} />  
        <Tab value={2} label=" הגדרות אתר"  sx={{...TabComonStyleAttribute}} icon={<FcGlobe size={"1.5em"} color={theme.palette.primary.main} />} />  

        </Tabs>
        <Flex
                   direction={"row"} 
                   justifyContent={"center"}   
                   height={'calc(100% - 80px)'} 
                   overflow={"auto"} 
                   minWidth={"100%"} // dont remove ***
        >
         {
          settingsTabsValue === 0? 
            <Container  sx={{ m:2, p:1,  }}   >
            <Flex direction={!xs? 'column': "row"} justifyContent={"center"} >
    
            <ColumnA p={1}  width={!xs? undefined: "50%"} alignItems={"center"} >
            <SwitchWithTextWrap variant='outlined' mainText={""} subText={""} switchValue={false} switchOnChangeHendler={()=>{}}/>
            <SwitchWithTextWrap variant='outlined' mainText={""} subText={""} switchValue={false} switchOnChangeHendler={()=>{}}/>
            <SwitchWithTextWrap variant='outlined' mainText={""} subText={""} switchValue={false} switchOnChangeHendler={()=>{}}/>

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
         :
         settingsTabsValue === 1? 
         <>
          <InputWrap  variant='outlined' label={"פרטים ליצירת קשר "} value={""} onChangeHndler={() => { } } labelPositioin={"top"} helpText={""}/>

         </>
         :
         settingsTabsValue === 2 ?
         <>
          <InputWrap variant='outlined' label={"שם באתר "}  helpText={""} value={""} onChangeHndler={() =>{}} labelPositioin={"top"} />
         </>
         :
         null
         }
         </Flex>
       </Box>
  )
 }


export default SettingTab