// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {  Box, Container, Divider, Stack as Flex , SelectChangeEvent, Typography, useTheme } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"


import CoverUpload from "./cover-upload"
import Editor from "./text-editor/editor"
import dayjs from "dayjs"
import DateTimePickerWrap from "@/components/gen/time-date/date-time-picker-wrap"
import InputWrap from "@/components/gen/input-wrap"
import { DateTimeValidationError } from "@mui/x-date-pickers"
import { FullDateOptions } from "@/pages/_app"
import TimePickerWrap from "@/components/gen/time-date/time-picker-wrap"
import SelectWrap from "@/components/gen/select-wrap"
import DatePickerWrap from "@/components/gen/time-date/date-picker-wrap"

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
      <Flex direction={"row"} justifyContent={"center"}       height={'calc(100% - 80px)'} overflow={"auto"} >

      <Container  sx={{ m:2, p:1 }}   >
       <Typography sx={{color:'black'}} variant="h6" > פרטים כללים </Typography>
        <Flex direction={!sm? "column": "row"}     >

             <Flex  flexGrow={1} > 
               <InputWrap 
                    label={"כותרת"} 
                    variant='outlined' 
                    value={infoFileds.eventName}  
                    onChangeHndler={(e) => { setInfoFileds(p=>({...p,eventName:e.target.value})) } }
                    labelPositioin={"end"} 
                    />

                <SelectWrap 
                  items={EventCategories} 
                  value={infoFileds.cat} 
                  changeHndler={(e)=>{setInfoFileds(p=>({...p,cat:e.target.value}))} }
                  label={"קטגוריה"}
                  labelPositioin={"end"}
                  variant='outlined'

                     />
          
            </Flex>

             <Divider sx={{borderWidth:2 , m:1}} />

             <Flex flexGrow={1} >
         
            <DatePickerWrap                 
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFileds.Date}
                onAcceptHendler={(e)=> e!==null ?
                  setInfoFileds(p => ({ ...p, Date: e.toDate() })) 
                  :
                  null
               }

                label={"בחר תאריך"} 
                labelPositioin={'end'}
                color='secondary'
                onEroorHndler={ErrorHndler}

                  />
            <TimePickerWrap                 
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFileds.Date}
                onAcceptHendler={(e)=> e!==null ?
                  setInfoFileds(p => ({ ...p, Date: e.toDate() })) 
                  :
                  null
               }

                label={"בחר שעה"} 
                labelPositioin={'end'}
                color='secondary'
                onEroorHndler={ErrorHndler}

                  />



          <TimePickerWrap                 
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFileds.OpenDorHour}
                onAcceptHendler={(e)=> e!==null ?
                  setInfoFileds(p => ({ ...p, OpenDorHour: e.toDate() })) 
                  :
                  null
               }

                label={"שעת פתיחת דלתות"} 
                labelPositioin={'end'}
                color='secondary'
                onEroorHndler={ErrorHndler}

                  />
       

             </Flex>

        </Flex>

        <Divider sx={{borderWidth:1,mt:2,mb:2}} />
        

          <Flex direction={"row"} justifyContent={"center"} >
 
      {/**add peview !!!! */}
      {/**Validate preState */}
      
             <Editor />
             

         </Flex>
        
         <CoverUpload  />
         
         { infoFileds.preview && infoFileds.image &&

        <Flex  alignItems={"center"} >

         <Image 
           src={infoFileds.preview} 
           alt={infoFileds.image.name} 
           width={!xs?260 : !sm?400 : !md? 500 : 600}
           height={!sm?300:400}
           style={{ objectFit:'contain', margin:1}} 
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
     </Flex>
     )
  
  }





  export default InfoForm
  