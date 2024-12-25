// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {  Box, Container, Divider, Stack as Flex , Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import DatesList from "./date-list"
import Image from "next/image"


import CoverUpload from "./cover-upload"
import Editor from "./text-editor/editor"
import Info from "./info"

const InfoForm =()=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {infoFileds,setInfoFileds}= useContext(TabsInfoContext)
  const theme = useTheme()

return(
      <Flex direction={"row"} justifyContent={"center"}        height={'calc(100% - 80px)'} overflow={"auto"} >

      <Container  sx={{ m:2, p:1 }}   >
       <Typography sx={{color:'black'}} variant="h6" > פרטים כללים </Typography>

        <Flex direction={!sm? "column": "row"}     >

             <Flex    flexGrow={1} > 
                 <Info/>
            </Flex>

             <Divider sx={{borderWidth:2 , m:1}} />

            <Flex flexGrow={1} >
         
                    <DatesList />

          

            </Flex>

        </Flex>

        <Divider/>


          <Flex direction={"row"} justifyContent={""} >
 

             <Editor />
             

         </Flex>
         <CoverUpload  />
         { infoFileds.preview && infoFileds.image &&

        <Flex  alignItems={"center"} m={2}>

         <Image 
           src={infoFileds.preview} 
           alt={infoFileds.image.name} 
           width={!sm?260:!md? 500 :600}
           height={!sm?300:400}
           style={{ objectFit:'contain', margin:5}} 
           />
         <Typography   
             sx={{color:"black" , m:.5}}
              fontWeight={700} 
               textAlign={'center'}
                variant='body2'
                 >
                  שם הקובץ :  {infoFileds.image.name.toLocaleUpperCase()}
         </Typography>

       </Flex>  
}
     </Container>  
     </Flex>
     )
  
  }





  export default InfoForm
  