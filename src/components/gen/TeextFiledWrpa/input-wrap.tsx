import WidthContext from "@/context/WidthContext";
import {  TextField, TextFieldVariants,  } from "@mui/material"
import {ChangeEventHandler, CSSProperties, ReactNode, RefObject} from "react";

import ControledLabel from "@/components/gen/TeextFiledWrpa/controled-form-label";
import Autocomplete from '@mui/material/Autocomplete';
import ControledHelperText from "./controled-helper-text";

type HTMLInputTypes = 
  | "color"
  | "date"
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


  export type MultilineProps = {
    isMultiline: true;
    rows: number;
  };
  
  export type SingleLineProps = {
    isMultiline?: false;
    rows?: never;
  };

  export type InputWrapType = ( MultilineProps | SingleLineProps) & BaseInputProps;

  export type BaseInputProps =  {
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
    isFullWidth?:boolean
    styles?:CSSProperties
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
     ref,
     isMultiline,
     rows,
     styles

     
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
      rows={rows}
      multiline={isMultiline}
      style={{...styles}}
     />
     
    

    )
}
export default InputWrap

