import WidthContext from "@/context/WidthContext";
import {  TextField, TextFieldProps, TextFieldVariants,  } from "@mui/material"
import {ChangeEventHandler, CSSProperties, ReactNode, RefObject} from "react";


import ControledHelperText from "./controled-helper-text";
import ControledLabel from "./controled-form-label";

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

  /** Requierd Fileds  */    
    
    label:string
    value:string|number|undefined
    onChangeHndler:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>
    helpText:string|undefined

  /** util  */
     inputType?: HTMLInputTypes
     isRequired?:boolean
     error?:boolean
     isDisabled?:boolean
     ref?:RefObject<HTMLInputElement>
     icon?:ReactNode

  // if provided alone will use lable and place holder 
     placeholder?:string
     placeholderStyle?:CSSProperties

  // if provided will remove label and only display placeholder 
     placeholderMode?:boolean

  /** !!! this is extiontion for Text-atea-wrap . if you chanfe this also change the ref wraper  */
     multiline?: true;
     rows?: number;
  /** !!! this is extiontion for Text-atea-wrap . if you chanfe this also change the ref wraper  */

 
     /** Styles Options  */

     styles?:CSSProperties

      /*Labels*/
      isLabelBold?:boolean
      labelTextcolor?:CSSProperties['color']
      

      isValueBold?:boolean
      valueTextColor?:CSSProperties['color']


     hoverColor?:CSSProperties['color']
     bg?:CSSProperties['color']

     variant?:TextFieldVariants
     Fgrow?:number
     m?:number|"auto"
    

     
    
    /**   Style Positions */
     helpTextPotionsEnd?:boolean
     labelPositioin:"top"|"end"



     stateName?:string // the name of the state to update in the event 
  
  }


const InputWrap = ({
     inputType,
     label,
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
     hoverColor,
     icon,
     labelPositioin,
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
     labelTextcolor,
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
      type={inputType} //defult to text
      value={value ?? ""}
      onChange={onChangeHndler}
      required={isRequired}
      disabled={isDisabled}
      name={stateName}
      helperText={helpText ? <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} /> : null}
      variant={variant ?? 'standard'}
      label={ placeholderMode ? null : <ControledLabel labelPositioin={labelPositioin?? "top"} label={label} isLabelBold={isLabelBold} labelTextcolor={labelTextcolor}/>}
      error={error}
      ref={ref}
      style={{...styles}}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder} // string can't extedn with ReactNode in SxProps
      slotProps={{input:{placeholder,style:{fontWeight:isValueBold?"bold":undefined, color:valueTextColor}}}}
      {...rest}
     />
     
    

    )
}
export default InputWrap

