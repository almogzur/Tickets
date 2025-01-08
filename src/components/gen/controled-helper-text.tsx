import WidthContext from "@/context/WidthContext";
import { FormHelperText, SxProps, useFormControl, useTheme } from "@mui/material"
import { useContext } from "react";


interface ControledHelperText {
    text:string
    helpTextPotionsEnd:boolean
}

export default function ControledHelperText ({text , helpTextPotionsEnd}:ControledHelperText){
  const theme = useTheme()
  const { focused , filled, variant, required ,error,color, ...rest } = useFormControl() || {};
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const outlineStyle:SxProps = {
      position:"relative",
      top:-22,
      right:helpTextPotionsEnd? -10:15,
      textAlign: helpTextPotionsEnd? "end": "start",
      height:0,
      m:0,
      mx:helpTextPotionsEnd ? 0:  -2,
       
  }
  const standardStyle : SxProps = {
      m:0,
      textAlign: helpTextPotionsEnd ? "end":  "start",
  }
  const filledStyle : SxProps = {
      textAlign: helpTextPotionsEnd ? "end":  "start",
      m:0 ,
      mx:-1.6,
  }

    
    return (
        <FormHelperText 
        
        sx={ 
          
            focused?
                [ 
                variant === 'outlined'? outlineStyle
                 :
                variant === "filled"?filledStyle
                :
                 standardStyle,
                  
                 {   
                  color:error? "red" : color?theme.palette[`${color}`].main : null,           
                 }
                 ]
                 :
            filled ?
                 [
                variant === 'outlined'? outlineStyle
                    :
                 variant === "filled"?filledStyle
                    :
                standardStyle
                 ]      
                 :
            [
             variant === 'outlined'? outlineStyle
                :
             variant === "filled"?filledStyle
                :
                standardStyle
            ]
              
                }
          variant={variant}
          >{text}
          </FormHelperText>

    )
}