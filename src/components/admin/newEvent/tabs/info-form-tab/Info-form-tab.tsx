// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {   Button, Container, Divider, Stack as Flex , Typography, useTheme } from "@mui/material"
import {  useContext, useState } from "react"


import Editor from "./text-editor/editor"
import dayjs from "dayjs"

import tabsErrorsContext from "@/context/admin/new-event/tabs/tabs-errors-context"

import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { RiImageAddFill } from "react-icons/ri"
import { grey } from "@mui/material/colors"
import { useSession } from "next-auth/react"
import axios from "axios"
import tabsPageContext from "@/context/admin/new-event/tabs/tabs-page-context"
import { LuImageMinus } from "react-icons/lu"
import InputWrap from "@/mui-components/text_filed_wrap/input-wrap"
import SelectWrap from "@/mui-components/select-wrap"
import DatePickerWrap from "@/mui-components/time-date/date-picker-wrap"
import TimePickerWrap from "@/mui-components/time-date/time-picker-wrap"
import { DateTimeValidationError } from "@mui/x-date-pickers"
import ImageUploaderHebTexts from "./image-uploader-heb-text"


interface InfoFormType {}

const InfoForm =({}:InfoFormType)=>{

  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {infoFields,setInfoFields}= useContext(TabsInfoContext)
  const theme = useTheme()
  const {GetFormErrors} =  useContext(tabsErrorsContext)
  const {setIsLoading,setLoadingScreenText}= useContext(tabsPageContext)
      
  const removeImageFromCloudinary = async (Public_id:string)=>{

      setIsLoading(true)
      setLoadingScreenText("מסיר תמונה")
      
      try {
        const response = await axios.post("/api/admin/cloudinary-event-image/R-image", { Public_id  } );

       if( response.status === 200 ){
          console.log(response.data.result);
          setIsLoading(false)
          setInfoFields(p=>({...p,preview:''}))
          }
      else{
          console.log("Status not Ok err ", response.status);
          setIsLoading(false)
          console.log(" Try Block Err" , response.status);
          alert(response.status)  
          }
      }
      
      catch (error) {
  
        setIsLoading(false)
        console.log(" Try Block Err" , error);
        alert(error)

      }

  }

  const ErrorHandler = (e:DateTimeValidationError, context:dayjs.Dayjs|null ):void=>{
//    console.log(e,context)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps

  
  // return live ver of infoFiled.event value see -> https://react.dev/learn/state-as-a-snapshot
//  const folderName = useMemo(() => getFolderName(infoFields.eventName), [getFolderName, infoFields.eventName]) 


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
                  value={infoFields.eventName}
                  onChangeHandler={(e) => { setInfoFields(p => ({ ...p, eventName: e.target.value })) } }
                  labelPosition={"end"} 
                  helpText={GetFormErrors("eventName")?? ""}
                  helpTextPotionsEnd
              
                  error={GetFormErrors("eventName")? true: false}
                  
                 />
                 <SelectWrap 
                    items={EventCategories}
                    value={infoFields.cat}
                    changeHandler={(e) => { setInfoFields(p => ({ ...p, cat: e.target.value })) } }
                    label={"קטגוריה"}
                    labelPosition={"end"}
                    variant='outlined' 
                    helpTextPotionsEnd
                    helpText={GetFormErrors("cat")?? ""}
                    isError={GetFormErrors("cat")?true:false}
                />
     
             </Flex>

             <Divider sx={{borderWidth:2 , m:1}} />

             <Flex flexGrow={1} >
         
             <DatePickerWrap                 
               MediaQuery={theme.breakpoints.up("sm")}
               value={infoFields.Date}
               variant='outlined'
               helpText={GetFormErrors("Date")?? ""}
               helpTextPotionsEnd
               label={" תאריך"}
               labelPosition={'end'}
               color='secondary'
               onChangeHandler={(e) => e !== null ?
                 setInfoFields(p => ({ ...p, Date: e.toDate().toLocaleDateString() }))
                 :
                 null
               }         
              onErrorHandler  ={ErrorHandler} 
                  />

              <TimePickerWrap             
                helpTextPotionsEnd    
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFields.OpenDoors}
                
                onAcceptHandler={(e) => {
                  if (e !== null) {
                      const formattedTime = dayjs(e).format('HH:mm');
                      setInfoFields((p) => ({ ...p, OpenDoors: formattedTime }));
                  }
              }}
               helpText={GetFormErrors("OpenDoors")?? ""}
               label={"  שעת פתיחת דלתות"} 
                labelPosition={'end'}
                color='secondary'
                onErrorHandler={ErrorHandler}
                  />

            <TimePickerWrap                 
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFields.Hour}
                helpText={GetFormErrors("Hour")?? ""}
                variant='outlined'
                helpTextPotionsEnd
                onAcceptHandler={(e) => {
                  if (e !== null) {
                      const formattedTime = dayjs(e).format('HH:mm');
                      setInfoFields((p) => ({ ...p, Hour: formattedTime }));
                  }
              }}

                label={" שעה"} 
                labelPosition={'end'}
                color='secondary'
                onErrorHandler={ErrorHandler}
                  />
             </Flex>

         </Flex>

         <Divider sx={{borderWidth:1,mt:2,mb:2}} />

          <Editor />     

          <Flex direction={!xs?"row":'column'} width={"100%"} mb={1}  gap={1} justifyContent={"space-evenly"}  >

           <CldUploadWidget     
              
               uploadPreset="fx9hpz2j"
               onClose={(statues,widget)=>{
                 
              }}
               onQueuesStart={(e)=>{console.log("q start", e.event , e.info );}} // event &&  strings are strings 
               onQueuesEnd={(result,)=>{
                    if(result.info && typeof result.info !=='string'){
                      const files = result.info.files as unknown
                        if(Array.isArray(files)){
                            files.map((file,i)=>{
                               const id = file?.uploadInfo?.public_id  as string
                               if(id){
                                 setInfoFields(p=>({...p,preview:id}))   
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
                singleUploadAutoClose:true,
                
                autoMinimize:false,
                 sources:["local","google_drive","dropbox"], 
                 defaultSource:'local',       
                 maxFiles:1,
                 multiple:false,
                 showPoweredBy:false,
                 showUploadMoreButton:false,
                 showAdvancedOptions:false,
                 
                 text:{...ImageUploaderHebTexts},
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
                },}
                }}
               >
               {({ open }) => {
                 return (
                  <>
               <Typography sx={{color:"red"}} >{GetFormErrors('preview')}</Typography>
               <Button
                 sx={{ gap:1, p:0.5 , boxShadow:0, background:grey[200], mt:1 }} 
                 disabled={!!infoFields.preview} // converts its to boll then if info filed it the'r its false else it true 
                 variant='text'
                 onClick={() => {  open() }}
                 >הוסף תמונה 
                <RiImageAddFill size={"2em"}   />
                  
              </Button>
              </>
              );
               }}
          </CldUploadWidget>
          
          <Button
           sx={{ gap:1, p:0.5 , boxShadow:0, background:grey[200], mt:1  }} 
           variant='text'
           onClick={()=>removeImageFromCloudinary(infoFields.preview)}
           disabled={!infoFields.preview} 
         >הסר תמונה 
           <LuImageMinus size={"2em"}   />

         </Button>

         </Flex>

        { infoFields.preview &&      
         <Flex justifyContent={"center"} direction={"row"}   > 

           <CldImage alt={""} src={infoFields.preview}              
            width={!xs?260 : !sm?400 : !md? 450 : 600}
            height={!sm?300:400}
            
            style={{  }}
         />
         
        </Flex>  
        
        }


     </Container>  
     )
  
  }





  export default InfoForm
  