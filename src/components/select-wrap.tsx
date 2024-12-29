import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextFieldVariants } from "@mui/material"
import { ChangeEvent, CSSProperties, ReactElement, ReactNode, useContext, useState } from "react"
import { IconType } from "react-icons";
import { FcAbout } from "react-icons/fc";
import { TiArrowDownThick } from "react-icons/ti";
import ControledLabel from "./controled-form-label";
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
    
}

const SelectWrap = ({items, changeHndler ,styles , label, icon, variant , labelPositioin,value}:SelectWrapType)=>{




    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)



    return (
        <FormControl fullWidth>
           <InputLabel 
              sx={{ 
                "&.MuiInputLabel-root":{         
                  width: !xs?"85%": "92%" ,
                  direction:"ltr"  ,
                  fontSize:18 ,
                  display:"flex" ,
                  justifyContent:"end" ,
             },

                "&.MuiInputLabel-shrink":{ 
                      width: labelPositioin === "top"? "133%" : "22%",
                     
                      textAlign:"start",
                      fontSize:20 ,
                      top: labelPositioin === "end"?  15:9,
                       mx:0 
                          },
                 "&.Mui-focused":{color:"", },
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
            style={{...styles}}
            
           
               >
                {items.map(({label,value},i)=>{
                    return  <MenuItem  key={label}  value={value}  >{label}</MenuItem>
                })}
               </Select>
               </FormControl>
    )
}
export default SelectWrap