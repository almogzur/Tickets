import WidthContext from "@/context/WidthContext"
import {  Stack as Flex , Typography, useTheme } from "@mui/material"
import { ChangeEventHandler, Dispatch, Key, SetStateAction, useContext } from "react"

import TheaterSelect from "./theater-select"

import  Eilat_1 from '../../../constants/theathers/eilat_1'
import  Eilat_2 from '@/constants/theathers/eilat_2'
import { TheaterType } from "@/pages/_app"
import InputWrap from "../input"
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
      
      <Flex  boxShadow={theme.shadows[10]} p={2}   >

       <Typography sx={{color:'black'}} variant="h6" > פרטים כללים </Typography>
    
      <Flex   
       alignItems={!xs? "":'center'} 
       direction={ "row"} 
       flexWrap={'wrap'}  
       justifyContent={"space-around"}
       >
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
          
            return <InputWrap   
                    key={name} 
                    stateName={name} 
                    label={Locolize(name)} 
                    value={value} 
                    onChangeHndler={KysHndler}  
                    Fgrow={1}
                    m={0.5}
                    isInputRequired
                  
                    
                    />
            
              })}
         <TheaterSelect theaters={TheaterList} seter={TheaterHndler} />
    </Flex>
  
        
  
     </Flex>  

   
     </>
  
     )
  
  }
  export default InfoForm
  