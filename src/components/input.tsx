import WidthContext from "@/context/WidthContext";
import { FormControl, InputBase, InputLabel, MenuItem, OutlinedInput, StandardTextFieldProps, TextField, TextFieldProps, TextFieldVariants, Typography } from "@mui/material"
import { error } from "console";
import { ChangeEvent, ChangeEventHandler, CSSProperties, Dispatch, ReactNode, SetStateAction, SyntheticEvent, useContext, useState } from "react";
import { TiArrowUpThick } from "react-icons/ti";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { blue } from "@mui/material/colors";
import { IconType } from "react-icons";
import { MdArrowBack, MdCabin } from "react-icons/md";


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
    value?:string|null
    onChangeHndler?:ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
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
    helpText? :string
    isDisabled?:boolean
    customStyle?:CSSProperties
    isSelect?:boolean
    selectItems?:SelectIemType[]
    icon?:ReactNode
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
     isDisabled,
     customStyle,
     isSelect,
     selectItems=[],
     hoverColor,
     icon
     

    }:InputWrapType)=>{

        const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


    return   (

        <TextField
            id={label}
            type={inputType}//defult to text
            value={value}
            onChange={onChangeHndler}
            required={isRequired}
            disabled={isDisabled}
            name={stateName}
            helperText={ helpText? <Typography variant='subtitle2'  textAlign={"start"} >{helpText}</Typography> : null }

            sx={{ 
                flexGrow:Fgrow?? null,
                 bgcolor:bg?? "#fff" ,
                 m: m?m:0.5,
                  ...customStyle ,     
               
                '&:hover': {
                    backgroundColor:hoverColor ,
                    borderBottomColor:"red"
              }, }}
            variant={variant?? 'standard'}
            label={label}
            error={error}
            select={isSelect && selectItems.length !==0}
            slotProps={{
                
                input:{
                  fullWidth:false,
                  endAdornment: icon
                },
                inputLabel:{              
                 sx:{
                        "&.MuiInputLabel-root":{ 
                        
                                   width:"100%" ,
                                     direction:"ltr"  ,
                                       fontSize:18 ,
                                        color:textColor ,
                                        display:"flex" ,
                                        justifyContent:"end" 
                                     },
                        "&.MuiInputLabel-shrink":{ 
                              width:"133%",
                              unicodeBidi:"plaintext",
                              textAlign:"start",
                              fontSize:20 ,
                              color:textColorStateFilled,
                              top: variant==="outlined"? 7: -3,
                              mx:0
                                  },
                        "&.Mui-focused":{color:"", },
                        "&.Mui-required":{}
                   } 
               },
               select:{
        
                     startAdornment:icon
               }
                
              
                
              }}
              color='secondary'
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