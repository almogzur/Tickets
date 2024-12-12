import { Typography , Stack as Flex ,useTheme, Pagination, Chip, Box, AppBar, Tabs, Tab, Divider, Button, Badge} from "@mui/material"
import { ChangeEvent, ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import InputWrap from "../input"
import { grey } from "@mui/material/colors"
import DatesList from "./date-list"
import { PickerChangeHandlerContext, DateTimeValidationError } from "@mui/x-date-pickers"
import WidthContext from "@/context/WidthContext"
import { FcPlanner } from "react-icons/fc";
import { FcFilm } from "react-icons/fc";
import { FcSettings } from "react-icons/fc";
import { FcStackOfPhotos } from "react-icons/fc";
import Editor from '@/components/text-editor/editor'
import { FcAnswers } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcAddImage } from "react-icons/fc";
import CoverUpload from "./cover-upload"


interface TabFormPropsType {
    normalPrice:string
    dicountPrice:string
    PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

    Dates:Date[]
    addDataHndler :(e:any, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    removeDateHndler:(dateToRemove: Date) => void

    file:File
    preview:string
    setPreview:Dispatch<SetStateAction<string>>
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) =>void
    setFile:Dispatch<SetStateAction<File>>
  }


  const TabsForm = ({
     normalPrice,
     dicountPrice,
     PriceHndler,
     Dates ,
      removeDateHndler,
      addDataHndler,
      file,
      setFile,
      preview,
      setPreview,
      onFileChange
    }
      :TabFormPropsType)=>
  {
    const theme = useTheme()
    const [pageVale, setPageVale] = useState(1);
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setPageVale(newValue);
    };
    
    return (
    <>

      <Box  
        sx={{ 
           height:!sm?500:600 ,
           mt:3,
           background:grey[400],
        
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

        <Tab value={1} label="תמונה ראשית "  sx={{color:"#fff"}}  icon={<FcAddImage size={"2em"} />}    /> 
        <Tab value={2} label="טקסט"  sx={{color:"#fff"}}  icon={<FcAnswers size={"2em"} />}    /> 

        <Tab value={3} label="מושבים"  sx={{color:"#fff",zIndex:2}}  icon={<FcCurrencyExchange size={"2em"} />}     />

         <Tab value={4} label="תאריכים"  sx={{color:"#fff",zIndex:2}}  icon={<FcPlanner size={"2em"} />}     />
        
            
        <Tab value={5} label="כרטיסים"  sx={{color:"#fff"}} icon={<FcFilm size={"2em"} />} />
        <Badge 
          
          badgeContent={Dates.length}
          overlap='circular'
          variant='standard'
          color='warning'
          anchorOrigin={{
          vertical: 'top',
           horizontal: 'right',   
             }} 
             sx={{position:"relative" , left:10, top:5}}
               >
         </Badge>
        <Tab value={6} label="הגדרות"  sx={{color:"#fff"}}   icon={<FcSettings size={"2em"} />}  />
        <Tab value={7} label="עיצוב"  sx={{color:"#fff"}} icon={<FcStackOfPhotos size={"2em"} />}  />
        <Tab value={8} label="שמור"  sx={{color:"#fff"}}  />
        <Tab value={9} label="שמור"  sx={{color:"#fff"}} />
       </Tabs>

       <Divider sx={{borderWidth:2}}  ></Divider>
       {
      pageVale ===1 ?
      <CoverUpload file={file} setFile={setFile} preview={preview} setPreview={setPreview} onFileChange={onFileChange}  />
        :
       pageVale ===2 ? 
      
       <Editor />
       :
       pageVale===3 ?
       <SeatsTab/>
       :
       pageVale === 4 ?
       <DatesList Dates={Dates} addDataHndler={addDataHndler} removeDateHndler={removeDateHndler}  />
    
   
       :
       pageVale===5?
       <TikitsTab Dates={Dates} normalPrice={""} dicountPrice={""} PriceHndler={ PriceHndler} />
    
         
       :
       pageVale===6 ?
       <SettingTab/>
     
       :
       pageVale=== 7 ?
       <ColorTab/>
       :
       null
        }


      </Box>
    </>
    )
    
  }





  
  interface TikitsTabPropsType {
   Dates:Date[]
   normalPrice:string
   dicountPrice:string
   PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    }

  const TikitsTab = ({Dates,PriceHndler,normalPrice,dicountPrice}:TikitsTabPropsType)=>{ 
    const theme = useTheme()

    return (
      <Box 
       height={'calc(100% - 80px)'}
       overflow={"auto"} 
      > 
      {Dates.length ?  Dates.map((date:Date,i:number)=>{
    
     return <Tikit key={date.toString()+i} date={date} />
     })
    :
       <Flex justifyContent={"center"} alignItems={"center"} alignContent={"center"} height={"inherit"}  >
        <Typography variant="h6" sx={{color:"black"}} >בחר תאריך לאירוע </Typography>
       </Flex>
    }           
      </Box>

    )
  }

  interface TikitPropsType { date:Date}

  const Tikit = ({date}:TikitPropsType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const options :Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    

    const [ Prices, setPrices ] = useState({ normal  : 0 , discount : 0 , citizen : 0  })

    return (   
       <Flex  
         key={date.toString()}  
       justifyContent={"space-around"} 
       bgcolor={grey[100]} 
       m={2} 
    
   
       padding={2}

       
     >

          <Typography variant="h6" sx={{color:'black'}} textAlign={"start"}   > תאריך  : {date.toLocaleDateString("he-IL",options)  } שעה: {date.toLocaleTimeString("he-IL") }</Typography>

   

        
         <Flex direction={"row"}  >
          <InputWrap  label={'מחיר רגיל'} stateName={""}  Fgrow={4} />
          <InputWrap  label={'מחיר מוזל'} stateName={""}  Fgrow={6}  />
     
         </Flex>

         <Flex>
         <InputWrap  label={'מחיר  תושב'} stateName={""}   />
         </Flex>

       
        <Flex   direction={!sm? "column": 'row'}  >
         <InputWrap  isInputRequired  label={' תאריך סגירת מכירות'} stateName={'discountPricel'}    Fgrow={4}  />
         <InputWrap  label={'  תיאור'}  stateName={'discountPricel'}    Fgrow={12}   />
        </Flex>

      </Flex>
)
  }



const SeatsTab =()=>{
  return (
    <>
    <Typography variant='h4' sx={{color:"black"}} >{"  מספר מושבים זמינים  "}{0}</Typography>
    <Typography variant='h4' sx={{color:"black"}} >{"  מחיר מושב "}{0}</Typography>
    </>

  )
}

  
  
  
  

  interface SetingsTabPropsType {}

  const SettingTab= ()=>{
    return (<></>)
   }

  interface ColorTabPropsType {}


  const ColorTab =()=>{
    return (<></>)
  }



  export default TabsForm