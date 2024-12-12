import WidthContext from "@/context/WidthContext";
import { FormControl, InputBase, InputLabel, OutlinedInput, TextField, TextFieldVariants } from "@mui/material"
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
 // | "number"  this is not valit with react and ts see   https://stackoverflow.com/questions/61070803/how-to-handle-number-input-in-typescript
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



interface InputWrapType {
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
    }:InputWrapType)=>{

        const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


    return   (

        <TextField
            id={label}
            type={inputType}//defult to text
            value={value}
            onChange={onChangeHndler}
            required={isInputRequired}
            name={stateName}
            
            sx={{ flexGrow:Fgrow?? null, bgcolor:bg?? "#fff" ,m:m }}
            variant={variant?? 'filled'}
            label={label}
            error={error}
            

            

        />
   
 
    )
}
export default InputWrap