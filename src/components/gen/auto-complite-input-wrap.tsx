import { Autocomplete, MenuItem, TextField, Typography } from "@mui/material";
import ControledLabel from "./TeextFiledWrpa/controled-form-label";
import { ChangeEvent } from "react";
import ControledHelperText from "./TeextFiledWrpa/controled-helper-text";
import { InputWrapPropsType } from "./TeextFiledWrpa/input-wrap";


interface AutoCompliteInputWrapPropsType  extends Omit<InputWrapPropsType, 'multiline'>    {
  
    AutocompleteOptionArray:string[]
    
}

export default function AutoCompliteInputWrap ({
       AutocompleteOptionArray , 
       inputType,
       label,
       labelTextcolor,
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
       
       
       
       
         }:AutoCompliteInputWrapPropsType){
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
            type={inputType} //defult to text
            value={value ?? ""}
            onChange={onChangeHndler}
            required={isRequired}
            disabled={isDisabled}
            name={stateName}
            helperText={helpText && <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false} />}
            variant={variant ?? 'standard'}
            label={<ControledLabel labelPositioin={labelPositioin} label={label} />}
      
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