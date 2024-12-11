import { Typography , Stack as Flex ,useTheme} from "@mui/material"
import { ChangeEventHandler, useEffect } from "react"
import OutLineInputWrap from "../input-wrap"
import { grey } from "@mui/material/colors"

interface PriceFormPropsType {
    normalPrice:string
    dicountPrice:string
    PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    Dates:Date[]
  }


  const TikitForm = ({normalPrice,dicountPrice,PriceHndler,Dates}:PriceFormPropsType)=>{
   const theme = useTheme()
   const options :Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    

    return <Flex boxShadow={` 3px 3px 3px 2px ${theme.palette.primary.main}`}>
            
            <Typography variant='h3' textAlign={"center"} color='primary' >  כרטיסים</Typography>
            {Dates.length ?  Dates.map((date,i)=>{
          
          return (  
             <Flex  key={date.toString()} justifyContent={"space-around"} bgcolor={grey[100]} m={1} border={"solid .5px black"} borderRadius={2} padding={2}  >
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
          :null}           
            </Flex>

      return  

        
    
  }
  export default TikitForm