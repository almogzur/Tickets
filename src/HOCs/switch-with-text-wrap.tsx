




import WidthContext from "@/context/WidthContext"
import SwitchWrap, { NormalSwitchWrap, SwitchWrapType } from "./switch-wrap"
import {Box, Stack as Flex, TextFieldVariants, Typography } from '@mui/material'
import { green, grey, red } from "@mui/material/colors"
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, SyntheticEvent, useContext } from "react"



interface  SwitchWithTextAndChildrenWrapType extends SwitchWrapType {
    mainText:string
    subMainText?:string
    subText:string
    variant?:TextFieldVariants
    children?:ReactNode
}

const SwitchWithTextAndChildren =({
        mainText,
        subText,
        value,
        switchOnChangeHendler,
        switchSize,
        variant,
        subMainText,
        children
        }:SwitchWithTextAndChildrenWrapType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    return (
          <Flex   
             direction={"row"}
             justifyContent={"space-evenly"}
                
                pt={2}
                pb={2}
                pr={1}
                pl={1}
                m={1}
                width={"100%"}
                height={80}
                gap={0.5}
                borderRadius={1}
                sx={{ 
                     border:variant==='outlined' ? 'solid 1px ':undefined ,
                     borderColor:'lightgray',
                     background:variant==='filled'? grey[200]: undefined,
                     "&:hover":{
                        borderColor:'black',
                        background:variant==='filled'? grey[300]:undefined,
                    },
                    }}
                 >
            <SwitchWrap value={value} switchOnChangeHendler={switchOnChangeHendler }/>
                <Flex>
                   <Typography  fontWeight={"bold"} fontSize={!sm?13  :18}> {mainText.slice(0,20)}</Typography>
                    {subMainText &&  <Typography  fontWeight={"bold"} fontSize={!sm?13  :18}> {subMainText.slice(0,20)}</Typography>}
                  <Typography  fontSize={!sm ?11: 13} >{subText.slice(0, children? 70 : 90)}</Typography>
                  
                </Flex>

                <Box width={100}  >
                {! value &&  children}
                </Box>

                
         </Flex>
    )
}




export default SwitchWithTextAndChildren