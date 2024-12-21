import InputWrap from "@/components/input";
import { InfoFormType } from "@/pages/admin/new-event";
import {Divider, Stack as Flex } from '@mui/material'
import TheaterSelect from "./theater-select";
import { Key, useContext } from "react";
import WidthContext from "@/context/WidthContext";
import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context";


const Info = ()=>{
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)

        


    return (
      <>
      
        <Flex>
            <InputWrap stateName={"eventName"} label={"שם"} variant="outlined" />
            <InputWrap stateName={"location"} label={"מיקום"} variant="outlined" />
            <InputWrap stateName={"cat "} label={"קטגוריה"} variant="outlined"/>

        
      </Flex>
      </>
 
    )
}
export default Info