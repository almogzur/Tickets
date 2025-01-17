// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {  Box, Button, Container, Divider, Stack as Flex , Typography, useTheme } from "@mui/material"
import { ChangeEvent, RefObject, useContext, useEffect, useState } from "react"
import Image from "next/image"

import ImageUploaderHebtexts from '@/components/admin/newEvent/tabs/info-form-tab/image-uploader-heb-text'

import Editor from "./text-editor/editor"
import dayjs from "dayjs"
import InputWrap from "@/components/gen/TeextFiledWrpa/input-wrap"
import { DateTimeValidationError} from "@mui/x-date-pickers"
import TimePickerWrap from "@/components/gen/time-date/time-picker-wrap"
import SelectWrap from "@/components/gen/select-wrap"
import DatePickerWrap from "@/components/gen/time-date/date-picker-wrap"
import tabsEroorsContext from "@/context/admin/new-event/tabs/tabs-eroors-context"

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { getCldImageUrl } from 'next-cloudinary';
import { RiImageAddFill } from "react-icons/ri"
import { grey } from "@mui/material/colors"
import { useSession } from "next-auth/react"
import axios from "axios"
import tabsPageContext from "@/context/admin/new-event/tabs/tabs-page-context"
import { TempInfoFiledsValidationSchema } from "../../types/new-event-types"


interface InfoFormType {
    eventNameRef: RefObject<HTMLInputElement>
  
}

const InfoForm =({eventNameRef}:InfoFormType)=>{
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {infoFileds,setInfoFileds}= useContext(TabsInfoContext)
  const theme = useTheme()
  const [dateEroor,setDateEroor ]= useState(false)
  const {newEventValidateFiled} =  useContext(tabsEroorsContext)
  const {setIsLoading,setTabValue,setLoadingScrenText,setSaevNewEventReqestStatus}= useContext(tabsPageContext)
  
  const removeImageFromCloudinary = async (Public_id:string)=>{

      setIsLoading(true)
      setLoadingScrenText("מסיר תמונה")
      const response = await axios.post("/api/admin/new-event/remove/remove-event-image", { Public_id  } );
      if(response.status){
        setIsLoading(false)
          if(response.data.result === 'ok'){
              console.log(response.data.result);
          }
          else{

          }
      }

      setInfoFileds(p=>({...p,preview:''}))
      
     console.log(response);

     

  }

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
                  helpText={newEventValidateFiled("eventName")?? ""}
                  helpTextPotionsEnd
                  ref={eventNameRef}
                  error={newEventValidateFiled("eventName")? true: false}
                  
                 />
       
             
                 <SelectWrap 
                    items={EventCategories}
                    value={infoFileds.cat}
                    changeHndler={(e) => { setInfoFileds(p => ({ ...p, cat: e.target.value })) } }
                    label={"קטגוריה"}
                    labelPositioin={"end"}
                    variant='outlined' 
                    helpTextPotionsEnd
                    helpText={newEventValidateFiled("cat")?? ""}
                    isError={newEventValidateFiled("cat")?true:false}
                />
     
             </Flex>

             <Divider sx={{borderWidth:2 , m:1}} />

             <Flex flexGrow={1} >
         
             <DatePickerWrap                 
               MediaQuery={theme.breakpoints.up("sm")}
               value={infoFileds.Date}
               variant='outlined'
               helpText={newEventValidateFiled("Date")?? ""}
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
                helpText={newEventValidateFiled("Hour")?? ""}
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
               helpText={newEventValidateFiled("OpenDorHour")?? ""}
               label={"פתיחת דלתות"} 
                labelPositioin={'end'}
                color='secondary'
                onEroorHndler={ErrorHndler}
                

                  />
       

             </Flex>

         </Flex>

         <Divider sx={{borderWidth:1,mt:2,mb:2}} />

         <Editor />     
     
        { !infoFileds.preview &&
         <CldUploadWidget
          
          uploadPreset="fx9hpz2j"
          onQueuesStart={()=>{console.log("q start");
          }}
          onQueuesEnd={(result,)=>{
               if(result.info && typeof result.info !=='string'){
                 const files = result.info.files as unknown
                   if(Array.isArray(files)){
                       files.map((file,i)=>{
                          const id = file?.uploadInfo?.public_id  as string

                          if(id){
                            setInfoFileds(p=>({...p,preview:id}))   
                          }
                          else{
                             console.log(" שגאיה בשמירת נסה שוב ");
                             alert(" שגאיה בשמירת נסה שוב ")
                             
                          }

             }
           )
         }
        } 
          }}
          options={{
            
            sources:["local","google_drive","dropbox"], 
            defaultSource:'local',       
            maxFiles:1,
            multiple:false,
            showPoweredBy:false,
            showUploadMoreButton:false,
            showAdvancedOptions:false,
            folder : `${session?.user?.name?.toString() || "אורח"}`,
            text:{...ImageUploaderHebtexts},
            
            styles:{
            
                palette: {
                    window: "#F5F5F5",
                    sourceBg: "#FFFFFF",
                    windowBorder: "#90a0b3",
                    tabIcon: "#0094c7",
                    inactiveTabIcon: "#69778A",
                    menuIcons: theme.palette.primary.main,
                    link: theme.palette.primary.main,
                    action: theme.palette.primary.main,
                    inProgress: "#0194c7",
                    complete: "#53ad9d",
                    error: "#c43737",
                    textDark: "#000000",
                    textLight: "#FFFFFF"
                },
            }
            
            
          }}
           >
           {({ open }) => {
             return (
               <Button 
                 sx={{ gap:1, p:0.5 , boxShadow:0, background:grey[200], mt:3,mb:3}} 
                 onClick={() => {
                  TempInfoFiledsValidationSchema.safeParse(infoFileds).success? 
                  open()
                  :
                  setSaevNewEventReqestStatus("Temp")
                }}
                 variant='text'
                 >הוסף תמונה 
                <RiImageAddFill size={"2em"}   />
              </Button>
             );
             }}
         </CldUploadWidget>
        }
        { infoFileds.preview &&      
        <>
        <Button
              sx={{mt:3,mb:3}}
                onClick={()=>removeImageFromCloudinary(infoFileds.preview)}
            >החלף תמונה 
        </Button>
        <Flex justifyContent={"center"} direction={"row"}   >        
          <CldImage
              alt={"תמונה ראשית"}
              width={!xs?260 : !sm?400 : !md? 500 : 600}
              height={!sm?300:400}
              src={infoFileds.preview}       
              style={{marginBottom:55}} 
                />
        </Flex>  
        </>
        }
     </Container>  
     )
  
  }





  export default InfoForm
  