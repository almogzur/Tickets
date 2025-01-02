// Context 
import WidthContext from "@/context/WidthContext"
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'

//Components
import {  Box, Container, Divider, Stack as Flex , Typography, useTheme } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"


import CoverUpload from "./cover-upload"
import Editor from "./text-editor/editor"
import dayjs from "dayjs"
import DateTimePickerWrap from "@/components/date-time-wrap"
import InputWrap from "@/components/input-wrap"
import { DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import { FullDateOptions } from "@/pages/_app"

const InfoForm =()=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {infoFileds,setInfoFileds}= useContext(TabsInfoContext)
  const theme = useTheme()
  const [dateEroor,setDateEroor ]= useState(false)    


const ErrorHndler = (e:DateTimeValidationError, context:dayjs.Dayjs|null ):void=>{}


return(
      <Flex direction={"row"} justifyContent={"center"}       height={'calc(100% - 80px)'} overflow={"auto"} >

      <Container  sx={{ m:2, p:1 }}   >
       <Typography sx={{color:'black'}} variant="h6" > פרטים כללים </Typography>
        <Flex direction={!sm? "column": "row"}     >

             <Flex    flexGrow={1} > 
             <InputWrap label={"שם"} variant='outlined' value={infoFileds.eventName}  onChangeHndler={(e) => { setInfoFileds(p=>({...p,eventName:e.target.value})) } } labelPositioin={"end"} />
            <InputWrap  label={"מיקום"} variant='outlined' value={infoFileds.location} onChangeHndler={(e) => { setInfoFileds(p=>({...p,location:e.target.value}))  } } labelPositioin={"end"}  />

            </Flex>

             <Divider sx={{borderWidth:2 , m:1}} />

            <Flex flexGrow={1} >
         
            <DateTimePickerWrap                 
                MediaQuery={theme.breakpoints.up("sm")}
                value={infoFileds.Date}
                onAcceptHendler={(e)=> e!==null ?
                  setInfoFileds(p => ({ ...p, Date: e.toDate() })) 
                  :
                  null
               }

                label={"בחר תאריך"} 
                labelPositioin={'end'}
                color='secondary'
                onEroorHndler={ErrorHndler}

                  />


            <InputWrap
                label={"קטגוריה"} 
                variant="outlined"
                 value={infoFileds.cat}
                   onChangeHndler={(e)=>{setInfoFileds(p=>({...p,cat:e.target.value}))}}
                    labelPositioin={'end'}
                    />
          

            </Flex>

        </Flex>

        <Divider sx={{borderWidth:1,mt:2,mb:2}} />
        

          <Flex direction={"row"} justifyContent={"center"} >
 
      {/**add peview !!!! */}
      {/**Validate preState */}
      
             <Editor />
             

         </Flex>
        
         <CoverUpload  />
         
         { infoFileds.preview && infoFileds.image &&

        <Flex  alignItems={"center"} >

         <Image 
           src={infoFileds.preview} 
           alt={infoFileds.image.name} 
           width={!xs?260 : !sm?400 : !md? 500 : 600}
           height={!sm?300:400}
           style={{ objectFit:'contain', margin:1}} 
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
  