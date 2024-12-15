//Cmponents
import { Typography , Stack as Flex ,useTheme, Box, Tabs, Tab, Badge} from "@mui/material"

import { ChangeEvent, ChangeEventHandler, CSSProperties, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import InputWrap from "../../input"

// Context 
import WidthContext from "@/context/WidthContext"
import TabsEventDatesContext from '@/context/tabs-event-dates-context'
//Icons 
import { FcPlanner } from "react-icons/fc";
import { FcFilm } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcStackOfPhotos } from "react-icons/fc";
import { FcAnswers } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcAddImage } from "react-icons/fc";

// Tabs 
import DatesListTab from "./date-list-tab"
import CoverUploadTab from "./cover-upload-tab"
import EditorTab from '@/components/admin/newEvent/tabs/text-editor-tab/editor'
import TikitsTab from './tikits-tab'

//Types
import { TheaterType } from "@/pages/_app"

interface TabFormPropsType {


  //Tikit
  normal:string
  dicount:string
  PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>



  //File 
    file:File
    preview:string
    setPreview:Dispatch<SetStateAction<string>>
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) =>void
    setFile:Dispatch<SetStateAction<File>>


  

  }


  const TabsForm = ({
     normal,
     dicount,
     PriceHndler,

      file,
      setFile,
      preview,
      setPreview,
      onFileChange,


      
  
    }
      :TabFormPropsType)=>
  {
    const theme = useTheme()
    const [pageVale, setPageVale] = useState(1);
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const { schedules,setSchedules,addEventDate,removeDate,dateEroor, } = useContext(TabsEventDatesContext)


    const TabComonStyleAttribute :CSSProperties = {
       color:"#fff",
       fontWeight:700,
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setPageVale(newValue);
    };
    
    return (
    <>

      <Box  
        sx={{ 
             height:!sm?600:700 ,
             mt:3,
             boxShadow:theme.shadows[10]
           }} 
      
        
        >
        <Tabs
          value={pageVale}
          onChange={handleChange}
          textColor='primary'
          indicatorColor='primary'
          sx={{ background:"black"   } }
          scrollButtons
          allowScrollButtonsMobile        
          variant='scrollable'
          
          
         >

        <Tab value={1} label="תמונה ראשית "  sx={{...TabComonStyleAttribute}}  icon={<FcAddImage size={"2em"} />}    /> 
        <Tab value={2} label="טקסט"  sx={{...TabComonStyleAttribute}}  icon={<FcAnswers size={"2em"} />}    /> 
        <Tab value={3} label="תאריכים"  sx={{...TabComonStyleAttribute}}  icon={<FcPlanner size={"2em"} />}     />

        {schedules.length === 0 &&   <Badge 
          showZero
          badgeContent={schedules.length}
          overlap='circular'
          variant='dot'
          color='error'
            sx={{position:"relative" , left:10, top:5}}
         />
         }    
        <Tab value={4} label="כרטיסים"  sx={{...TabComonStyleAttribute}} icon={<FcFilm size={"2em"} />} />

        <Badge 
          badgeContent={schedules.length}
          overlap='circular'
          variant='standard'
          color='warning'
         
           sx={{position:"relative" , left:10, top:5}}
          />
       
        <Tab value={5} label="הגדרות"  sx={{...TabComonStyleAttribute}}   icon={<FcSettings size={"2em"} />}  />
        <Tab value={6} label="עיצוב"  sx={{...TabComonStyleAttribute}} icon={<FcStackOfPhotos size={"2em"} />}  />
        <Tab value={7} label="שמור"  sx={{...TabComonStyleAttribute}}  />
        <Tab value={8} label="שמור"  sx={{...TabComonStyleAttribute}} />
       </Tabs>

       {

        // to Switch Function
       pageVale ===1 ?
       <CoverUploadTab file={file} setFile={setFile} preview={preview} setPreview={setPreview} onFileChange={onFileChange}  />
       :
       pageVale ===2 ? 
       <EditorTab />
       :
       pageVale===3 ?
       <DatesListTab /> // context 
       :
       pageVale===4?
       <TikitsTab 
          Dates={[]} 
          normal={""} 
          dicount={""} 
          PriceHndler={ PriceHndler}
      
           />
       :
       pageVale===5 ?
       <SettingTab/>
       :
       pageVale=== 6 ?
       <ColorTab/>
       :
       null
        }


      </Box>
    </>
    )
    
  }





  
 



  interface SetingsTabPropsType {}

  const SettingTab= ()=>{
    return (<>
      <InputWrap stateName={""} label={"שם באתר "} helpText={" שם :  /https://domain.co.il/event"  } />
    </>)
   }

  interface ColorTabPropsType {}


  const ColorTab =()=>{
    return (<></>)
  }



  export default TabsForm