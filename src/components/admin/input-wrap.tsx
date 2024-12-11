import { FormControl, InputLabel, OutlinedInput } from "@mui/material"
import { ChangeEvent, ChangeEventHandler, CSSProperties, Dispatch, SetStateAction, SyntheticEvent, useState } from "react";



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



interface OutLineInputWrapType {
    stateName:string // the name of the state to update in the event 
    label:string  
    value?:string
    onChangeHndler?:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    textColorStateFocused?:CSSProperties['color']
    textColorStateFilled?:CSSProperties['color']    
    inputType?: HTMLInputTypes
    textColor?:CSSProperties['color']
    isInputRequired?:boolean
    labelBg?:CSSProperties['color']
    
}




const OutLineInputWrap = ({
    inputType,
    label,
    textColor,
    textColorStateFilled,
    textColorStateFocused,
     value, 
     onChangeHndler,
     isInputRequired,
     stateName,
     labelBg
    }:OutLineInputWrapType)=>{

    return   (
    <FormControl  sx={{ m: 1 , minWidth:130  }} variant="outlined">
         <InputLabel
             variant='outlined' 
             
             sx={{
                textAlign:"center",
                "&.MuiFormLabel-root:not(.MuiFormLabel-filled):not(.Mui-focused)":{color:textColor},//init
                "&.Mui-focused ":{color:textColorStateFocused},
                "&.MuiFormLabel-filled:not(.Mui-focused)":{color:textColorStateFilled},
              }} 
             htmlFor={label}
        >
            {label}
        </InputLabel>
        <OutlinedInput
            id={label}
            label={label}
            type={inputType}//defult to text
            value={value}
            onChange={onChangeHndler}
            required={isInputRequired}
            name={stateName}
            sx={{background:labelBg }}
            
   />
    </FormControl>
    )
}
export default OutLineInputWrap