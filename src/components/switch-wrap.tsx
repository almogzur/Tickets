import { FormControlLabel, Switch } from "@mui/material"
import { ChangeEvent, useState } from "react"

interface SwitchWrapType {
    OnLablel? :string
    OffLabel?:string
    value?:boolean
    onChangeHendler?:(e:ChangeEvent<HTMLInputElement>)=>void
    isChecked?:boolean
    labelPlacement?:"top"|"bottom"|"end"|"start"
    
  }
  
    const SwitchWrap = ({...porp}:SwitchWrapType)=>{
  
  
        const [checked, setChecked] =useState(true);
      
        const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
          setChecked(e.target.checked);
        };
  
      return <FormControlLabel 
      labelPlacement={porp.labelPlacement?? "top" }
      label={porp.OnLablel}
          control={
           <Switch
             defaultChecked  
             inputProps={{ 'aria-label': 'controlled' ,  }}
            />
        }
       
          />
    } 
    export default SwitchWrap