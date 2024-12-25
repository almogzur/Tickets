import InputWrap from "@/components/input-wrap";
import { InfoFormType } from "@/pages/admin/new-event";
import {Divider, Stack as Flex } from '@mui/material'
import TheaterSelect from "./theater-select";
import { ChangeEvent, Key, useContext } from "react";
import WidthContext from "@/context/WidthContext";
import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context";


const Info = ()=>{
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)

      
    return (
        <Flex>
            <InputWrap label={"שם"} variant='outlined' value={infoFileds.eventName}  onChangeHndler={(e) => { setInfoFileds(p=>({...p,eventName:e.target.value})) } } labelPositioin={"end"} />
            <InputWrap  label={"מיקום"} variant='outlined' value={infoFileds.location} onChangeHndler={(e) => { setInfoFileds(p=>({...p,location:e.target.value}))  } } labelPositioin={"end"}  />


      </Flex>
    )
}


export default Info