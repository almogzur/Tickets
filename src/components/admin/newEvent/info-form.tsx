import WidthContext from "@/context/WidthContext"
import { Divider, Stack as Flex , Typography, useTheme } from "@mui/material"
import { ChangeEventHandler, Dispatch, Key, SetStateAction, useContext } from "react"
import OutLineInputWrap from "../input-wrap"
import Editor from '@/components/text-editor/editor'
import { grey } from "@mui/material/colors"
import TheaterSelect from "./theater-select"

import  Eilat_1 from '../../../constants/theathers/eilat_1'
import  Eilat_2 from '@/constants/theathers/eilat_2'
import { TheaterType } from "@/pages/_app"
const TheaterList :TheaterType[] = [ Eilat_1, Eilat_2]

interface InfoFormType { 
  InfoKeys:{name:string,loction:string,cat:string,  } ,
  KysHndler : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  TheaterHndler:Dispatch<SetStateAction<TheaterType>>
}



const InfoForm =({InfoKeys,KysHndler, TheaterHndler}:InfoFormType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const theme = useTheme()
  
     return(
      <>
      <Typography sx={{color:'black'}} variant="h4" > פרטים ככלים </Typography>
      <Flex    boxShadow={` 3px 3px 3px 2px ${theme.palette.primary.main}`}  sx={{}} >
  
         <Flex 
          direction={!xs? "column": "row"} 
          flexWrap={'wrap'}  
          justifyContent={'space-around'} 
          alignItems={!xs? "":'center'} 
          border={"solid 0.5px black"} 
          m={1} 
          p={1} 
          borderRadius={1}
          bgcolor={grey[400]} >

            {Object.entries(InfoKeys).map(([name,value],i)=>{
  
            let Locolize = (name: Key)  =>{
  
              let LocLabel = ""
              
  
               switch(name){
                case "name": LocLabel += "שם";
                break;
                case "loction": LocLabel += "מיקום";
                break;
                case "cat": LocLabel += "קטגוריה";
                break;
      
                default : LocLabel += name
              }
  
              return LocLabel
            }
          
            return <OutLineInputWrap   key={name} stateName={name} label={Locolize(name)} value={value} onChangeHndler={KysHndler }  labelBg="#fff"  />
            
        })}
             <TheaterSelect theaters={TheaterList} seter={TheaterHndler} />
        </Flex>
  
        <Flex m={1}>
          <Editor/>
        </Flex>
  
  
     </Flex>   
     </>
  
     )
  
  }
  export default InfoForm
  