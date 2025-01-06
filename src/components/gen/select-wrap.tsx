import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextFieldVariants, Typography, useTheme } from "@mui/material"
import {  CSSProperties, ReactElement, useContext, useState } from "react"

import WidthContext from "@/context/WidthContext";
import { FaCartArrowDown } from "react-icons/fa6";
import ControledLabel from "./controled-form-label";

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
    Fgrow?:number
    hoverColor?:CSSProperties['color']
    m?:number|"auto"
    bg?:CSSProperties['color']


}

const SelectWrap = ({ items, changeHndler,m,hoverColor ,bg,styles, label, icon, variant, labelPositioin, value, isShrinkTitelBold,isItemBold,isTitelBold, Fgrow }:SelectWrapType)=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


const theme = useTheme()
    return (
            <FormControl  >
              <InputLabel 
              
              sx={{ 
                 "&.MuiInputLabel-root":{
                  width: "100%" ,
                  direction:"ltr",
                  display:"flex",
                  justifyContent:"end",
                  top:2,
                  fontSize:18,

                },
                 "&.MuiInputLabel-shrink":{ 
                    width: 
                        labelPositioin === "top" ? "133%" 
                        :
                        labelPositioin === "end" ? 130 
                        :
                        null,
                    top: 
                       labelPositioin === "top" && !xs ? 15
                       :
                       labelPositioin === "top" && xs ? 15
                       :
                       labelPositioin === "end" && !xs ? 11
                       :
                       labelPositioin === "end" && xs ? 11
                       :
                       null,
                       fontWeight: isShrinkTitelBold ? "bold" : null,
                       mx:0

                },
             }}
              >
                {label}
              </InputLabel>  
              <Select
               
               value={value}
               onChange={changeHndler }
               variant={ variant? variant: "standard"}
               endAdornment={labelPositioin === "top" ? icon : null}
               startAdornment={labelPositioin === "end"?   icon : null}
               label      
                style={{ fontWeight: isTitelBold ? "bold" : undefined, ...styles }}
                 sx={{ 
                   // add icon postion add option baced on top and end titile postions
                   flexGrow:Fgrow?? null,
                   bgcolor:bg,
                    m: m?m:0.5,
                   '.MuiSelect-icon':{
                      position:"relative" ,
                      top:-1,
                      right:-10
                    },
                    '&:hover': {
                     backgroundColor:hoverColor ,
                    },
                    ".MuiInputBase-input":{textAlign:"start",mx:-2},
                    
           
                 }}
                 
               >
                {items.map(({label,value},i)=>{
                  return <MenuItem 
                     sx={{ fontWeight: isItemBold? "bold":null }} 
                     key={label}  
                     value={value}  
                     >
                      {label}

                     </MenuItem>
                })}
               </Select>
               </FormControl>
    )
}
export default SelectWrap