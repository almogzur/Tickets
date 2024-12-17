// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {  Stack as Flex , Typography, useTheme } from "@mui/material"
import { ChangeEventHandler, Dispatch, Key, SetStateAction, useContext } from "react"
import TheaterSelect from "./theater-select"
import InputWrap from "../input"

//Data
import  Eilat_1 from '../../../constants/theathers/eilat_1'
import  Eilat_2 from '@/constants/theathers/eilat_2'

//Types 
import { TheaterType } from "@/pages/_app"

const TheaterList :TheaterType[] = [ Eilat_1, Eilat_2]



const InfoForm =()=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)
    const theme = useTheme()
  
     return(
      <>
      
      <Flex   p={2} mt={3}  height={'calc(100% - 80px)'}  >


       <Typography sx={{color:'black'}} variant="h6" > פרטים כללים </Typography>
    
      <Flex   
       alignItems={!xs? "":'center'} 
       direction={ "row"} 
       flexWrap={'wrap'}  
       justifyContent={"space-around"}
       >
        {Object.entries(infoFileds.keys).map(([name,value],i)=>{
  
            let Locolize = (name: Key)  =>{
  
              let LocLabel = ""
              
  
               switch(name){
                case "name": LocLabel += "שם";
                break;
                case "location": LocLabel += "מיקום";
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
                
                    Fgrow={1}
                    m={0.5}
                    isInputRequired
                  
                    
                    />
            
              })}
    <TheaterSelect theaters={[Eilat_1,Eilat_2]}  setInfoFileds={setInfoFileds}  />
    </Flex>
  
        
  
     </Flex>  

   
     </>
  
     )
  
  }
  export default InfoForm
  