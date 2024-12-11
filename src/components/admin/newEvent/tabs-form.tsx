import { Typography , Stack as Flex ,useTheme, Pagination, Chip, Box, AppBar, Tabs, Tab, Divider} from "@mui/material"
import { ChangeEvent, ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import OutLineInputWrap from "../input-wrap"
import { grey } from "@mui/material/colors"
import DatesList from "./date-list"
import { PickerChangeHandlerContext, DateTimeValidationError } from "@mui/x-date-pickers"


interface TabFormPropsType {
    normalPrice:string
    dicountPrice:string
    PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

    Dates:Date[]
    addDataHndler :(e:any, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    removeDateHndler:(dateToRemove: Date) => void
  }


  const TabsForm = ({
     normalPrice,
     dicountPrice,
     PriceHndler,
     Dates ,

      removeDateHndler,
      addDataHndler
    }
      :TabFormPropsType)=>
  {
    const theme = useTheme()
    const [pageVale, setPageVale] = useState(1);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setPageVale(newValue);
    };
    
    return <>
    <Typography variant='h4' textAlign={"start"} sx={{color:"black"}} >  כרטיסים</Typography>

       <Box  sx={{ width: '100%' , height:500 , overflow:'scroll' ,overflowX: "hidden",overflowY: "auto"    }} boxShadow={` 3px 3px 3px 2px ${theme.palette.primary.main}`}>
        <Tabs
        value={pageVale}
        onChange={handleChange}
        textColor='primary'
        indicatorColor='primary'
        sx={{position:'sticky' ,top:0 , zIndex:2 , background:grey[400]}}

      >
        <Tab value={1} label="תאריכים" /> 
        <Tab value={2} label="כרטיסים" />
        <Tab value={3} label="הגדרות" />
        <Tab value={4} label="עיצוב" />
       </Tabs>
       <Divider sx={{borderWidth:2}}  ></Divider>
       {
       pageVale ===1 ? 
       <DatesList Dates={Dates} addDataHndler={addDataHndler} removeDateHndler={removeDateHndler}  />

       :
       pageVale === 2 ?
       <TikitsTab Dates={Dates} normalPrice={""} dicountPrice={""} PriceHndler={ PriceHndler} />
   
       :
       pageVale===3 ?
       <SettingTab/>
         
       :
       pageVale===4 ?
       <ColorTab/>
       :
       null
        }


       </Box>

  


   
      </>
    
  }
  export default TabsForm




  
interface TikitsTabPropsType {
  Dates:Date[]
  normalPrice:string
  dicountPrice:string
  PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}
  const TikitsTab = ({Dates,PriceHndler,normalPrice,dicountPrice}:TikitsTabPropsType)=>{ 
    const theme = useTheme()
    const options :Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    

    return (

<>
      {Dates.length ?  Dates.map((date:Date,i:number)=>{
    
    return (  
       <Flex  key={date.toString()}  justifyContent={"space-around"} bgcolor={grey[100]} m={1} border={"solid .5px black"} borderRadius={2} padding={2}  >
           <Flex direction={"row"} alignItems={"center"} >

               <Flex>
                 <Typography variant="h4" sx={{color:'black'}} > תאריך </Typography>
                 <Typography  sx={{color:'black'}}  >{date.toLocaleDateString("he-IL",options)  }</Typography>
                 <Typography  sx={{color:'black'}}  >{date.toLocaleTimeString("he-IL") }</Typography>
                </Flex>
              <OutLineInputWrap  label={'מחיר רגיל'} value={normalPrice} onChangeHndler={PriceHndler} stateName={"normalPrice"}     />
              <OutLineInputWrap  label={'מחיר מוזל'} value={dicountPrice} onChangeHndler={PriceHndler} stateName={'discountPricel'}      />
              <OutLineInputWrap  label={'מחיר  תושב'} value={dicountPrice} onChangeHndler={PriceHndler} stateName={'discountPricel'}      />

           </Flex>
           <OutLineInputWrap  label={' תאריך סגירת מכירות'} value={dicountPrice} onChangeHndler={PriceHndler} stateName={'discountPricel'}      />
          <OutLineInputWrap  label={'  שם האירוע שיופיע ברטיס '} value={dicountPrice} onChangeHndler={PriceHndler} stateName={'discountPricel'}      />
       </Flex>
    )
     })
    :
      <Box bgcolor={grey[300]} >
        <Typography variant="h3" sx={{color:"black"}} >בחר תאריך לאירוע </Typography>
       </Box>
    }           
</>

    )
  }




  const SettingTab= ()=>{
    return (<></>)
   }


  const ColorTab =()=>{
    return (<></>)
  }