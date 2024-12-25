import { ChangeEvent } from "react"
import InputWrap from "../../../input-wrap"

interface SetingsTabPropsType {}

const SettingTab= ()=>{
  return (<>
    <InputWrap label={"שם באתר "} helpText={" שם :  /https://domain.co.il/event"} value={""} onChangeHndler={() =>{}} labelPositioin={"top"} />
    <InputWrap label={"פרטים ליצירת קשר "} value={""} onChangeHndler={()=>{} } labelPositioin={"top"}/>
  </>)
 }


export default SettingTab