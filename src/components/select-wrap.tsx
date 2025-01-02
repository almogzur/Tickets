import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextFieldVariants } from "@mui/material"
import {  CSSProperties, ReactElement, useContext, useState } from "react"

import WidthContext from "@/context/WidthContext";

interface SelectIemType {
    value:any
    label:string
  }


interface SelectWrapType {
    items:SelectIemType[]
    value:string|undefined,
    changeHndler:(event: SelectChangeEvent<any>) => void
    styles?:CSSProperties
    label:string
    icon?:ReactElement<any>
    variant?:TextFieldVariants
    labelPositioin:"top"|"end"
    isShrinkTitelBold?:boolean
    isTitelBold?:boolean
    isItemBold?:boolean

}

const SelectWrap = ({ items, changeHndler, styles, label, icon, variant, labelPositioin, value, isShrinkTitelBold,isItemBold,isTitelBold }:SelectWrapType)=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    return (
        <FormControl fullWidth>
           <InputLabel 
              sx={{ 
                 "&.MuiInputLabel-root":{         
                  width: !xs?"85%": "92%" ,
                  direction:"ltr"  ,
                  fontSize: !sm ? 15 : 18,     
                  display:"flex" ,
                  justifyContent:"end" ,
                  top:!sm ?2 :null,
                },
                 "&.MuiInputLabel-shrink":{ 
                     width: 
                        labelPositioin === "top" && !xs ? "133%" 
                        : 
                        labelPositioin === "top" && xs ? "133%" 
                        :
                        labelPositioin === "end" && !xs ? "35%" 
                        :
                        labelPositioin === "end" && xs ? "22%"
                        :
                        null,
                     top: labelPositioin === "top" && !xs ? 15
                       :
                       labelPositioin === "top" && xs ? 15
                       :
                       labelPositioin === "end" && !xs ? 9
                       :
                       labelPositioin === "end" && xs ? 9
                       :
                       null,
                     mx:0 ,
                     textAlign: "start",
                     fontSize: !sm ? 18 : 20,
                   fontWeight: isShrinkTitelBold ? "bold" : null


                    },
                 "&.Mui-focused":{ },
                 "&.Mui-required":{}
             }}
              >
                {label}
                </InputLabel>
           <Select
            value={value ?? ""}
            onChange={changeHndler }
            variant={ variant? variant: "standard"}
            endAdornment={labelPositioin === "top" ? icon : null}
            startAdornment={labelPositioin === "end"?   icon : null}
            style={{ fontWeight: isTitelBold ? "bold" : undefined, ...styles }}

            
              
            
               >
                {items.map(({label,value},i)=>{
                  return <MenuItem sx={{ fontWeight: isItemBold? "bold":null}} key={label}  value={value}  >{label}</MenuItem>
                })}
               </Select>
               </FormControl>
    )
}
export default SelectWrap