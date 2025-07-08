import WidthContext from "@/context/WidthContext";
import {  TextField, TextFieldProps, TextFieldVariants,  } from "@mui/material"
import {ChangeEventHandler, CSSProperties, ReactNode, RefObject} from "react";


import ControlledHelperText from "./controlled-helper-text";
import ControlledLabel from "./controlled-form-label";

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



  

  export interface  InputWrapPropsType extends  Omit<TextFieldProps, 'variant'>  {

  /** required Fields  */    
    
    label:string
    value:string|number|undefined
    onChangeHandler:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>
    helpText:string|undefined

  /** util  */
     inputType?: HTMLInputTypes
     isRequired?:boolean
     error?:boolean
     isDisabled?:boolean
     ref?:RefObject<HTMLInputElement>
     icon?:ReactNode

  // if provided alone will use label and place holder 
     placeholder?:string
     placeholderStyle?:CSSProperties

  // if provided will remove label and only display placeholder 
     placeholderMode?:boolean

  /** !!! this is extension for Text-input-wrap . if you change this also change the ref wrap  */
     multiline?: true;
     rows?: number;

 
     /** Styles Options  */

     styles?:CSSProperties

      /*Labels*/
      isLabelBold?:boolean
      labelTextColor?:CSSProperties['color']
      

      isValueBold?:boolean
      valueTextColor?:CSSProperties['color']


     hoverColor?:CSSProperties['color']
     bg?:CSSProperties['color']

     variant?:TextFieldVariants
     Fgrow?:number
     m?:number|"auto"
    

     
    
    /**   Style Positions */
     helpTextPotionsEnd?:boolean
     labelPosition:"top"|"end"



     stateName?:string // the name of the state to update in the event 
  
  }


const InputWrap = ({
     inputType,
     label,
     value, 
     onChangeHandler,
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
     hoverColor,
     icon,
     labelPosition,
     ref,
     styles,
     rows,
     multiline,
     placeholder,
     placeholderMode,
     isLabelBold,
     placeholderStyle,
     valueTextColor,
     isValueBold,
     labelTextColor,
     ...rest 
    }:InputWrapPropsType)=>{


    return(
     
    
     <TextField
      sx={{
      flexGrow: Fgrow ?? null,
      bgcolor: bg,
      m: m ? m : 0.5,
      '&:hover': {
        backgroundColor: hoverColor,
      },
      "& .MuiInputBase-input::placeholder":placeholderStyle
    }}
      id={label}
      type={inputType} //default to text
      value={value ?? ""}
      onChange={onChangeHandler}
      required={isRequired}
      disabled={isDisabled}
      name={stateName}
      helperText={helpText ? <ControlledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} /> : null}
      variant={variant ?? 'standard'}
      label={ placeholderMode ? null : <ControlledLabel labelPosition={labelPosition?? "top"} label={label} isLabelBold={isLabelBold} labelTextColor={labelTextColor}/>}
      error={error}
      ref={ref}
      style={{...styles}}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder} // string can't extends with ReactNode in SxProps
      slotProps={{input:{placeholder,style:{fontWeight:isValueBold?"bold":undefined, color:valueTextColor}}}}
      {...rest}
     />
     
    

    )
}
export default InputWrap

