import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextFieldVariants } from "@mui/material"
import { ChangeEvent, CSSProperties, ReactElement, ReactNode, useState } from "react"
import { IconType } from "react-icons";
import { FcAbout } from "react-icons/fc";
import { TiArrowDownThick } from "react-icons/ti";

interface SelectIemType {
    value:any
    label:string
  }


interface SelectWrapType {
    items:SelectIemType[]
    changeHndler:(event: SelectChangeEvent<any>) => void
    styles?:CSSProperties
    label:string
    icon?:ReactElement<any>
    variant?:TextFieldVariants
    labelPositioin:"top"|"end"
    
}

const SelectWrap = ({items, changeHndler ,styles , label, icon, variant , labelPositioin}:SelectWrapType)=>{

  const [loacalLabel, setLoacalLabel] = useState('');

  const handleChange = (e:SelectChangeEvent<any>) => {
    setLoacalLabel(e.target.value);
  };



    return (
        <FormControl fullWidth>
           <InputLabel 
              sx={{ 
                "&.MuiInputLabel-root":{         
                  width:  "93%" ,
                  direction:"ltr"  ,
                  fontSize:18 ,
                  display:"flex" ,
                  justifyContent:"end" ,
             },

                "&.MuiInputLabel-shrink":{ 
                      width: labelPositioin === "top"? "133%" : "22%",
                      unicodeBidi:"plaintext",
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
            label={label}  
            value={loacalLabel }
            onChange={(e)=>{changeHndler(e) ;   handleChange(e)}  }
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