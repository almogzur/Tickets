import { ChangeEvent } from "react"
import InputWrap from "@/components/gen/input-wrap"
import { Container } from "@mui/material"

interface SetingsTabPropsType {}

const SettingTab= ()=>{
  return (
    <Container  sx={{ m:2, p:1 }}   >
     <InputWrap label={"שם באתר "} helpText={" שם :  /https://domain.co.il/event"} value={""} onChangeHndler={() =>{}} labelPositioin={"top"} />
     <InputWrap label={"פרטים ליצירת קשר "} value={""} onChangeHndler={()=>{} } labelPositioin={"top"}/>
  </Container>)
 }


export default SettingTab