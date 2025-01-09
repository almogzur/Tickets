import WidthContext from "@/context/WidthContext";
import { FormControl, FormHelperText, Grid, InputBase, InputLabel, MenuItem, OutlinedInput, StandardTextFieldProps, TextField, TextFieldProps, TextFieldVariants, Typography } from "@mui/material"
import { error } from "console";
import { ChangeEvent, ChangeEventHandler, CSSProperties, Dispatch, ReactNode, RefObject, SetStateAction, SyntheticEvent, useContext, useState } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { blue } from "@mui/material/colors";
import { IconType } from "react-icons";
import { MdArrowBack, MdCabin } from "react-icons/md";
import ControledLabel from "@/components/gen/controled-form-label";
import Autocomplete from '@mui/material/Autocomplete';
import ControledHelperText from "./controled-helper-text";

type HTMLInputTypes = 
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number" 
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";


  interface SelectIemType {
    value:any
    label:string
  }

export interface InputWrapType   {
    
    stateName?:string // the name of the state to update in the event 
    label:string
    value:string|number|undefined
    onChangeHndler:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>
    textColorStateFocused?:CSSProperties['color']
    textColorStateFilled?:CSSProperties['color']    
    textColor?:CSSProperties['color']
    hoverColor?:CSSProperties['color']
    inputType?: HTMLInputTypes
    isRequired?:boolean
    bg?:CSSProperties['color']
    variant?:TextFieldVariants
    Fgrow?:number
    error?:boolean
    m?:number|"auto"

    helpText:string
    helpTextPotionsEnd?:boolean

    isDisabled?:boolean
    customStyle?:CSSProperties
    icon?:ReactNode
    labelPositioin:"top"|"end"
    ref?:RefObject<HTMLInputElement>
}




const InputWrap = ({
     inputType,
     label,
     textColor,
     textColorStateFilled,
     value, 
     onChangeHndler,
     isRequired,
     stateName,
     variant,
     Fgrow ,
     bg,
     error,
     m,
     helpText,
     helpTextPotionsEnd,
     isDisabled,
     customStyle,
     hoverColor,
     icon,
     labelPositioin,
     ref
    }:InputWrapType)=>{



    return   (
     
    
     <TextField
      sx={{
      flexGrow: Fgrow ?? null,
      bgcolor: bg,
      m: m ? m : 0.5,
      ...customStyle,
      '&:hover': {
        backgroundColor: hoverColor,
      },
    }}
      id={label}
      type={inputType} //defult to text
      value={value ?? ""}
      onChange={onChangeHndler}
      required={isRequired}
      disabled={isDisabled}
      name={stateName}
      helperText={helpText && <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} />}
      variant={variant ?? 'standard'}
      label={<ControledLabel labelPositioin={labelPositioin} label={label} />}
      error={error}
      ref={ref}
      
      
  
     />
     
    

    )
}
export default InputWrap

