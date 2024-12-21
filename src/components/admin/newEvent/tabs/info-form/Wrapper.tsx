// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {  Container, Divider, Stack as Flex , Typography, useTheme } from "@mui/material"
import { useContext } from "react"
import DatesList from "./date-list"


import CoverUpload from "./cover-upload"
import Editor from "./text-editor/editor"
import Info from "./info"

const InfoForm =()=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()

return(
      <Flex direction={"row"} justifyContent={"center"} height='calc(100% - 80px)' >
      <Container  sx={{ m:2, p:1 }}   >
       <Typography sx={{color:'black'}} variant="h6" > פרטים כללים </Typography>

        <Flex direction={!sm? "column": "row"} >

             <Flex    flexGrow={1} > 
                 <Info/>
            </Flex>
            <Divider sx={{borderWidth:2 , m:1}} />

           <Flex flexGrow={2}>
         
           <DatesList />
           <CoverUpload  />

          </Flex>

      </Flex>



       <Editor />
 

  
     </Container>  
     </Flex>
     )
  
  }





  export default InfoForm
  