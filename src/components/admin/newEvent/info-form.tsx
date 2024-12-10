import WidthContext from "@/context/WidthContext"
import { Stack as Flex , useTheme } from "@mui/material"
import { ChangeEventHandler, Key, useContext } from "react"
import OutLineInputWrap from "../input-wrap"
import Editor from '@/components/text-editor/editor'

interface InfoFormType { InfoKeys:{name:string,loction:string,cat:string,tag:string ,  } ,Hndler : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}



const InfoForm =({InfoKeys,Hndler}:InfoFormType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const theme = useTheme()
  
     return(
      <Flex direction={ md? "row" :'column'} gap={2}   justifyContent={"center"} alignItems={'baseline'} boxShadow={` 3px 3px 3px 2px ${theme.palette.primary.main}`}  >
  
         <Flex width={md? '40%':"100%"} > 
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
                case "tag": LocLabel += "תגית";
                break;
                default : LocLabel += name
              }
  
              return LocLabel
            }
          
            return <OutLineInputWrap  key={name} stateName={name} label={Locolize(name)} value={value} onChangeHndler={Hndler } />
  
        })}
        </Flex>
  
      <Flex width={ md? "60%": "100%"} >
        <Editor/>
      </Flex>
  
  
  </Flex>   
  
     )
  
  }
  export default InfoForm
  