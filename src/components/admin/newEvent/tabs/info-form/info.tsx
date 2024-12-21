import InputWrap from "@/components/input";
import { InfoFormType } from "@/pages/admin/new-event";
import {Divider, Stack as Flex } from '@mui/material'
import TheaterSelect from "./theater-select";
import { Key, useContext } from "react";
import WidthContext from "@/context/WidthContext";
import TabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context";
import Eilat_1 from "@/constants/theathers/eilat_1";
import Eilat_2 from "@/constants/theathers/eilat_2";

const Info = ()=>{
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)

        


    return (
      <>
      
        <Flex>
            <InputWrap stateName={"eventName"} label={"שם"} variant="outlined" />
            <InputWrap stateName={"location"} label={"מיקום"} variant="outlined" />
            <InputWrap stateName={"cat "} label={"קטגוריה"} variant="outlined"/>
            <TheaterSelect theaters={[Eilat_1,Eilat_2]}  setInfoFileds={setInfoFileds}  />
        
      </Flex>
      </>
 
    )
}
export default Info