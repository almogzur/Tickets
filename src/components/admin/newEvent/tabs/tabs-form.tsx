//Cmponents
import { Typography , Stack as Flex ,useTheme, Box, Tabs, Tab, Badge, Container, Divider} from "@mui/material"

import { ChangeEvent, ChangeEventHandler, CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import InputWrap from '@/components/input'

// Context Useg
import WidthContext from "@/context/WidthContext"
import TabsEventsSchedulesContext from '@/context/admin/new-event/tabs/tabs-event-schedules-context'

//Icons 
import { FcIntegratedWebcam, FcPlanner } from "react-icons/fc";
import { FcFilm } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcStackOfPhotos } from "react-icons/fc";
import { FcAnswers } from "react-icons/fc";
import { FcAddImage } from "react-icons/fc";
import { FcBinoculars } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";

// Tabs 

import DatesListTab from "./date-list-tab"
import CoverUploadTab from "./cover-upload-tab"
import EditorTab from '@/components/admin/newEvent/tabs/text-editor-tab/editor'
import TicketsTab from './ticket-tab/tickets-tab'
import SettingTab from "./settings-tab"
import ColorTab from "./colors-tab"
import AdOptionsTab from "./ad-options-tab"
import InfoForm from "../info-form"
import PrevieTab from "./ticket-tab/preview-tab"

//Types

interface TabFormPropsType {



  //File 
    file:File | undefined
    preview:string
    setPreview:Dispatch<SetStateAction<string>>
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) =>void
    setFile:Dispatch<SetStateAction<File|undefined>>


  

  }

const TabsForm = ({
      file,
      setFile,
      preview,
      setPreview,
      onFileChange,  
    }
      :TabFormPropsType)=>
  {
    const theme = useTheme()
    const [pageVale, setPageVale] = useState(0);
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const { schedule,setSchedule,addScheduleDate,removeScheduleDate,dateEroor, } = useContext(TabsEventsSchedulesContext)


    const TabComonStyleAttribute :CSSProperties = {
       color:"#fff",
       fontWeight:700,
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setPageVale(newValue);
    };
    
    return (

      <Box  
        sx={{ 
             height:!sm?550:850 ,
             direction:"rtl",
             boxShadow:theme.shadows[10]
           }}   
        >
        <Tabs
          value={pageVale}
          onChange={handleChange}
          textColor='primary'
          indicatorColor='primary'
          sx={{ background:"black"}}
          scrollButtons
          allowScrollButtonsMobile        
          variant='scrollable'
          
         >
        <Tab value={0} label="מידע כללי"  sx={{...TabComonStyleAttribute}}  icon={<FcInfo size={"2em"} />}    /> 
        <Tab value={1} label="תמונה ראשית "  sx={{...TabComonStyleAttribute}}  icon={<FcAddImage size={"2em"} />}    /> 
        <Tab value={2} label="טקסט"  sx={{...TabComonStyleAttribute}}  icon={<FcAnswers size={"2em"} />}    /> 
        <Tab value={3} label="תאריך ושעה"  sx={{...TabComonStyleAttribute}}  icon={<FcPlanner size={"2em"} />}     />

        { schedule && Object.entries(schedule).length === 0 &&   <Badge 
          showZero
          badgeContent={0}
          overlap='circular'
          variant='dot'
          color='error'
            sx={{position:"relative" , left:10, top:5}}
         />
         }    
        <Tab value={4} label="כרטיסים"  sx={{...TabComonStyleAttribute}} icon={<FcFilm size={"2em"} />} />
        <Tab value={5} label="הגדרות"  sx={{...TabComonStyleAttribute}}   icon={<FcSettings size={"2em"} />}  />
        <Tab value={6} label="צבעים"  sx={{...TabComonStyleAttribute}} icon={<FcStackOfPhotos size={"2em"} />}  />
        <Tab value={7} label="תצוגה מקדימה "  sx={{...TabComonStyleAttribute}} icon={<FcBinoculars size={"2em"}/>} />
        <Tab value={8} label="פירסום"  sx={{...TabComonStyleAttribute}} icon={<FcIntegratedWebcam size={"2em"}/>}  />
        <Tab value={8} label="שמור"  sx={{...TabComonStyleAttribute}} />

       </Tabs>
  
 
      {
        pageVale=== 0 ?
        <InfoForm/>
        :
       pageVale ===1 ?
       <CoverUploadTab 
          file={file} 
          setFile={setFile} 
          preview={preview} 
          setPreview={setPreview} 
          onFileChange={onFileChange}  
          />
       :
       pageVale === 2 ? 
       <EditorTab />
       :
       pageVale === 3 ?
       <DatesListTab /> // context 
       :
       pageVale === 4?
       <TicketsTab setTabPage={setPageVale} />
       :
       pageVale === 5 ?
       <SettingTab/>
       :
       pageVale === 6 ?
       <ColorTab/>
       :
       pageVale === 7 ?
       <PrevieTab/>
       :
       pageVale=== 8?
       <AdOptionsTab/>
       :null
      }
       
      </Box>

    )
    
  }

export default TabsForm