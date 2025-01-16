import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, SxProps, TextFieldVariants, Typography, useFormControl, useTheme } from "@mui/material"
import {  CSSProperties, ReactElement, useContext, useEffect, useState } from "react"

import WidthContext from "@/context/WidthContext";
import ControledHelperText from "./TeextFiledWrpa/controled-helper-text";


interface SelectIemType {
    value: string | number | readonly string[] 
    label:string
  
  }

interface SelectWrapType {
   
  /** Required Items  */

    label:string
    items:SelectIemType[]
    value:string,
    changeHndler:(event: SelectChangeEvent<any>) => void
    helpText:string
    
    /** Util  */
    isError?:boolean
    icon?:ReactElement<any>



    /** Style */
    variant?:TextFieldVariants
    styles?:CSSProperties

    //Value 
    isValueBold?:boolean
    valueColor?:CSSProperties['color']


    //Label
    labelColor?:CSSProperties["color"]
    isLabelBold?:boolean

    // Item list 
    isListItemBold?:boolean

    Fgrow?:number
    hoverColor?:CSSProperties['color']
    m?:number|"auto"
    bg?:CSSProperties['color']

    /** Labels - Style Positions */
    labelPositioin:"top"|"end"
    helpTextPotionsEnd?:boolean

}

const SelectWrap = ({ 
    helpText,
    items,
    changeHndler,
    m,
    hoverColor ,
    bg,
    styles,
    label,
    icon, 
    variant,
    labelPositioin,
    value,
    isListItemBold,
    isValueBold,
    isLabelBold,
    Fgrow ,
    helpTextPotionsEnd,
    isError,
    valueColor,
    labelColor

    
    }:SelectWrapType)=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)




const theme = useTheme()
    return (
             <FormControl fullWidth  variant={variant} >
              <InputLabel 
              
              sx={{ 
                color:labelColor?? "black",
                fontWeight:isLabelBold ? 'bold': null, 
                fontSize:!sm? 14:18,


                "&.MuiInputLabel-root":{
                  width: "100%" ,
                  direction:"ltr",
                  display:"flex",
                  justifyContent:"end",
                  top:2,
                  mx:-0.5,
                  
                },

                 "&.Mui-focused":{ 
                  width: 
                     labelPositioin === "top" ? "130%" 
                     :
                     labelPositioin === "end" ? 130 
                     :
                    null,
                 top: 13,
                 mx:labelPositioin === 'top'? 0 : -1 ,
                 fontWeight:isLabelBold ? 'bold': null, 
        
                 },
                  "&.MuiFormLabel-filled":{
                    width: 
                       labelPositioin === "top" ? "130%" 
                        :
                       labelPositioin === "end" ? 130 
                        :
                       null,
                   top: 13,
                   mx:labelPositioin === 'top'? 0 : -1 ,
 
                  }
                

             }}
              >
                {label}
              </InputLabel>  

              <Select
               value={value??""}
               onChange={changeHndler}
               variant={ variant}
               endAdornment={labelPositioin === "top" ? icon : null}
               startAdornment={labelPositioin === "end"?   icon : null}
               label={label}
               // selected item 
               style={{ fontWeight: isValueBold ? "bold" : undefined, ...styles, color:valueColor  }} 
               sx={{ 
                   // add icon postion add option baced on top and end titile postions
                   flexGrow:Fgrow?? null,
                   bgcolor:bg,
                    m: m?m:0.5,
                    p:0,
                    
                   '.MuiSelect-icon':{
                      position:"relative" ,
                      top:-1,
                      right:-10,
                      
                    },
                    '&:hover': {
                     backgroundColor:hoverColor ,
                    },
                    ".MuiInputBase-input":{textAlign:"start",mx:-2},

           
                 }}
               >
                {items.map(({label,value},i)=>{
                  return <MenuItem 
                     sx={{ 
                      fontWeight: isListItemBold? "bold":null,
                      fontSize: !sm? 13:18,
                     }} 
                     
                     key={label}  
                     value={value}  
                     >
                      {label}

                     </MenuItem>
                })}
                
               </Select>
               {helpText && <SelectHelpText helpText={helpText} helpTextPotionsEnd={helpTextPotionsEnd?? false} /> }
             </FormControl>
    )
}


interface SelectHelpTextType {
  helpText:string
  helpTextPotionsEnd:boolean
}

export function SelectHelpText ({helpText,helpTextPotionsEnd}:SelectHelpTextType){

    const { focused , filled, variant, required ,error,color, ...rest } = useFormControl() || {};
    const theme = useTheme()


  const outlineStyle:SxProps = {
      position:"relative",
      top:-22,
      right:helpTextPotionsEnd? -35:27,
      textAlign: helpTextPotionsEnd? "end": "start",
      height:0,
      m:0,
      mx:helpTextPotionsEnd ? 0:-2,
      color:theme.palette.error.dark
       
  }
  const standardStyle : SxProps = {
      m:0,
      textAlign: helpTextPotionsEnd ? "end":  "start",
      position:"relative",
      top:-5,
      mx:1,
      color:theme.palette.error.dark
  }
  const filledStyle : SxProps = {
      textAlign: helpTextPotionsEnd ? "end":  "start",
      m:0 ,
      mx:1,
      position:"relative",
      top:-5,
      color:theme.palette.error.dark
  }
  return <FormHelperText
     sx={ 
          
    focused?
        [ 
        variant === 'outlined'? outlineStyle
         :
        variant === "filled"?filledStyle
        :
         standardStyle,
          
         {   
          color:error? "red" : color?theme.palette[`${color}`].main : null,           
         }
         ]
         :
    filled ?
         [
        variant === 'outlined'? outlineStyle
            :
         variant === "filled" ? filledStyle
            :
         standardStyle
         ]      
         :
    [
      variant === 'outlined'? outlineStyle
        :
      variant === "filled"?filledStyle
        :
     variant==="standard"?
        standardStyle
        :
      null
    ]
      
        }
  >{helpText}
        </FormHelperText>
}



export default SelectWrap