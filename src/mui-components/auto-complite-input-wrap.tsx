import { Autocomplete, MenuItem, TextField, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import ControlledLabel from "./text_filed_wrap/controlled-form-label";
import ControlledHelperText from "./text_filed_wrap/controlled-helper-text";
import { InputWrapPropsType } from "./text_filed_wrap/input-wrap";


interface AutoCompleteInputWrapPropsType  extends Omit<InputWrapPropsType, 'multiline'>    {
  
    AutocompleteOptionArray:string[]
    
}

export default function AutoCompleteInputWrap ({
       AutocompleteOptionArray , 
       inputType,
       label,
       labelTextColor,
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
       
       
       
       
         }:AutoCompleteInputWrapPropsType){
    return(    
    <Autocomplete
        freeSolo
        slotProps={{listbox:{}}}
        options={AutocompleteOptionArray??[]}     
        sx={{
          flexGrow: Fgrow ?? null,
          bgcolor: bg,
          m: m ? m : 0.5,
  
          '&:hover': {
            backgroundColor: hoverColor,
          },
         }}
         autoHighlight
        clearOnEscape
        disableClearable
        openOnFocus
        renderInput={(params) =>  
            <TextField
            {...params}
            sx={{
            flexGrow: Fgrow ?? null,
            bgcolor: bg,
            '&:hover': {
              backgroundColor: hoverColor,
            },
          }}
            id={label}
            type={inputType} //default to text
            value={value ?? ""}
            onChange={onChangeHandler}
            required={isRequired}
            disabled={isDisabled}
            name={stateName}
            helperText={helpText && <ControlledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} />}
            variant={variant ?? 'standard'}
            label={<ControlledLabel labelPosition={labelPosition} label={label} />}
      
           />
         }
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
  
          return (
            <MenuItem key={key} {...optionProps} style={{width:"100%" , direction:"rtl"}}>
                  {option}
            </MenuItem>
          );
        }}
        />  
        
        )
}