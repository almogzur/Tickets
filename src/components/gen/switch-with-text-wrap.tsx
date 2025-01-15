import WidthContext from "@/context/WidthContext"
import SwitchWrap, { SwitchWrapType } from "./switch-wrap"
import {Stack as Flex, TextFieldVariants, Typography } from '@mui/material'
import { green, grey, red } from "@mui/material/colors"
import { ChangeEvent, Dispatch, SetStateAction, useContext } from "react"
import { RequestStatusType } from "../admin/newEvent/types/new-event-types"


interface  SwitchWithTextWrapType extends SwitchWrapType {
    mainText:string
    subMainText?:string
    subText:string
    variant?:TextFieldVariants
}

const SwitchWithTextWrap =({mainText,subText,switchValue,switchOnChangeHendler,switchWrpaerSize,variant,subMainText}:SwitchWithTextWrapType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    return (
            <Flex   
                alignItems={"center"}
                pt={2}
                pb={2}
                pr={1}
                pl={1}
                m={1}
                direction={"row"}
                width={"98%"}
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
                <SwitchWrap switchValue={switchValue} switchOnChangeHendler={switchOnChangeHendler} switchWrpaerSize={md?'large':'medium'} />
                <Flex>
                  <Typography  fontWeight={"bold"} fontSize={!sm?13  :18}> {mainText.slice(0,20)}</Typography>
                  {subMainText &&  <Typography  fontWeight={"bold"} fontSize={!sm?13  :18}> {subMainText.slice(0,20)}</Typography>}
                  <Typography  fontSize={!sm ?11: 13} >{subText.slice(0,90)}</Typography>
                </Flex>
            </Flex>
    )
}
export default SwitchWithTextWrap