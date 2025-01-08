// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {  Box, Container, Divider, Stack as Flex , Typography, useTheme } from "@mui/material"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import Image from "next/image"


import CoverUpload from "./cover-upload"
import Editor from "./text-editor/editor"
import dayjs from "dayjs"
import InputWrap from "@/components/gen/input-wrap"
import { DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import TimePickerWrap from "@/components/gen/time-date/time-picker-wrap"
import SelectWrap from "@/components/gen/select-wrap"
import DatePickerWrap from "@/components/gen/time-date/date-picker-wrap"
import AutoCompliteInputWrap from "@/components/gen/auto-complite-input-wrap"
import DateTimePickerWrap from "@/components/gen/time-date/date-time-picker-wrap"

const InfoForm =()=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {infoFileds,setInfoFileds}= useContext(TabsInfoContext)
  const theme = useTheme()
  const [dateEroor,setDateEroor ]= useState(false)    


const ErrorHndler = (e:DateTimeValidationError, context:dayjs.Dayjs|null ):void=>{}



interface EventCategoryType {
  value: string;
  label: string;
}

const EventCategories: EventCategoryType[] = [
  { value: "אקשן", label: "אקשן" },
  { value: "קומדיה", label: "קומדיה" },
  { value: "דרמה", label: "דרמה" },
  { value: "מתח", label: "מתח" },
  { value: "אימה", label: "אימה" },
  { value: "רומנטיקה", label: "רומנטיקה" },
  { value: "אנימציה", label: "אנימציה" },
  { value: "דוקומנטרי", label: "דוקומנטרי" },
  { value: "פשע", label: "פשע" },
  { value: "משפחה", label: "משפחה" },
  { value: "היסטוריה", label: "היסטוריה" },
  { value: "מיוזיקל", label: "מיוזיקל" },
  { value: "ספורט", label: "ספורט" },
];


return(
      <Container  sx={{ m:2, p:1 }}  >
        <Typography sx={{color:'black'}} variant="h6" > פרטים כללים </Typography>
        <Flex direction={!sm? "column": "row"}     >

             <Flex  flexGrow={1} > 
                <InputWrap 
                  label={"כותרת"}
                  variant='outlined'
                  value={infoFileds.eventName}
                  onChangeHndler={(e) => { setInfoFileds(p => ({ ...p, eventName: e.target.value })) } }
                  labelPositioin={"end"} 
                  helpText={""}
                  helpTextPotionsEnd
                 />
       
             
                 <SelectWrap 
                  items={EventCategories} 
                  value={infoFileds.cat} 
                  changeHndler={(e)=>{setInfoFileds(p=>({...p,cat:e.target.value}))} }
                  label={"קטגוריה"}
                  labelPositioin={"end"}
                  variant='outlined'
                  helpText={""}
                />
     
             </Flex>

             <Divider sx={{borderWidth:2 , m:1}} />

             <Flex flexGrow={1} >
         
             <DatePickerWrap                 
               MediaQuery={theme.breakpoints.up("sm")}
               value={infoFileds.Date}
               variant='outlined'
               helpText={""} 
               helpTextPotionsEnd
               label={"בחר תאריך"}
               labelPositioin={'end'}
               color='secondary'
               onAcceptHendler={(e) => e !== null ?
                 setInfoFileds(p => ({ ...p, Date: e.toDate() }))
                 :
                 null}
               onChangeHendler={(e) => e !== null ?
                 setInfoFileds(p => ({ ...p, Date: e.toDate() }))
                 :
                 null
               }         
               onEroorHndler={ErrorHndler} 


                

                  />
            <TimePickerWrap                 
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFileds.Hour}
                helpText={""}
                variant='outlined'
                helpTextPotionsEnd
                onAcceptHendler={(e)=> e!==null ?
                  setInfoFileds(p => ({ ...p, Hour: e.toDate() })) 
                  :
                  null
               }

                label={"בחר שעה"} 
                labelPositioin={'end'}
                color='secondary'
                onEroorHndler={ErrorHndler}

                  />



             <TimePickerWrap             
                helpTextPotionsEnd    
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFileds.OpenDorHour}
                onAcceptHendler={(e)=> e!==null ?
                  setInfoFileds(p => ({ ...p, OpenDorHour: e.toDate() })) 
                  :
                  null
               }
                helpText={""}
                label={"פתיחת דלתות"} 
                labelPositioin={'end'}
                color='secondary'
                onEroorHndler={ErrorHndler}
                

                  />
       

             </Flex>

        </Flex>

        <Divider sx={{borderWidth:1,mt:2,mb:2}} />
        <Editor />       
        <CoverUpload  />
         
         { infoFileds.preview && infoFileds.image &&

        <Flex  alignItems={"center"} >

         <Image 
           src={infoFileds.preview} 
           alt={infoFileds.image.name} 
           width={!xs?260 : !sm?400 : !md? 500 : 600}
           height={!sm?300:400}
           style={{ objectFit:'contain', marginTop:20}} 
           />
         <Typography   
             sx={{color:"black" , m:.5}}
              fontWeight={700} 
               textAlign={'center'}
                variant='body2'
                 >
                  שם הקובץ :  {infoFileds.image.name.toLocaleUpperCase()}
         </Typography>

       </Flex>  
}
     </Container>  
     )
  
  }





  export default InfoForm
  