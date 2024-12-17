import WidthContext from "@/context/WidthContext";
import { FormControl, InputBase, InputLabel, MenuItem, OutlinedInput, StandardTextFieldProps, TextField, TextFieldProps, TextFieldVariants, Typography } from "@mui/material"
import { error } from "console";
import { ChangeEvent, ChangeEventHandler, CSSProperties, Dispatch, SetStateAction, SyntheticEvent, useContext, useState } from "react";



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
    value:string,
    label:string
  }

interface InputWrapType   {
    
    stateName:string // the name of the state to update in the event 
    label:string  
    value?:string
    onChangeHndler?:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    textColorStateFocused?:CSSProperties['color']
    textColorStateFilled?:CSSProperties['color']    
    textColor?:CSSProperties['color']
    inputType?: HTMLInputTypes
    isInputRequired?:boolean
    bg?:CSSProperties['color']
    variant?:TextFieldVariants
    Fgrow?:number
    error?:boolean
    m?:number|"auto"
    helpText? :string
    isDisabled?:boolean
    customStyle?:CSSProperties
    isSelect?:boolean
    selectItems?:SelectIemType[]
}




const InputWrap = ({
    inputType,
    label,
    textColor,
    textColorStateFilled,
    textColorStateFocused,
     value, 
     onChangeHndler,
     isInputRequired,
     stateName,
     variant,
     Fgrow ,
     bg,
     error,
     m,
     helpText,
     isDisabled,
     customStyle,
     isSelect,
     selectItems=[]

     
    }:InputWrapType)=>{

        const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


    return   (

        <TextField
            id={label}
            type={inputType}//defult to text
            value={value}
            onChange={onChangeHndler}
            required={isInputRequired}
            disabled={isDisabled}
            name={stateName}
            helperText={ helpText? <Typography variant='subtitle2'  textAlign={"start"} >{helpText}</Typography> : null }
            sx={{ flexGrow:Fgrow?? null, bgcolor:bg?? "#fff" ,m:m , ...customStyle  }}
            variant={variant?? 'standard'}
            label={label}
            error={error}
            select={isSelect && selectItems.length !==0}
        >
            {isSelect && selectItems.length !==0 && 
                selectItems.map(({value,label},i)=>{
                    return <MenuItem key={value} value={value}>{label}</MenuItem>
                })
            }
        </TextField>
   
 
    )
}
export default InputWrap