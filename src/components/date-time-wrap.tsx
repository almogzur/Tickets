import WidthContext from "@/context/WidthContext"
import { DateTimePicker, DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { CSSProperties, useContext, useEffect, useMemo } from "react"
import { TextFieldVariants, Typography, useTheme , Stack as Flex, TextFieldProps  } from "@mui/material"
import { FcAbout } from "react-icons/fc"

import  { useFormControl } from '@mui/material/FormControl';
import  ControledLabel  from "./controled-form-label"



interface DateTimePickerWrapType  {
    label:string
    variant?:TextFieldVariants
    value: Date|undefined
    minDate? : Date 
    maxTIme? :Date
    isEroor?:boolean
    onAcceptHendler: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onEroorHndler: (e:DateTimeValidationError, context:dayjs.Dayjs|null )=>void
    labelPositioin:"top"|"end"
    orientation: "portrait"| 'landscape'
    MediaQuery?:string 
    color?:TextFieldProps['color']
    helpText?:string,
}

const DateTimePickerWrap =({ 
        label,
        labelPositioin,
        variant,
        isEroor,
        value,
        onAcceptHendler  ,
        maxTIme,
         MediaQuery,
         orientation,
          color,
          helpText,
          onEroorHndler,
          minDate,

         }:DateTimePickerWrapType)=>{

        const theme = useTheme()
    return    ( 

    <DateTimePicker                 
            orientation= {orientation}    
            desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("sm")}
            value={value?  dayjs(value) :null }
            closeOnSelect={false}
            
            minDate={minDate? dayjs(minDate):undefined} // day show
            // tryed not working curenntly
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}
            maxDateTime={maxTIme?dayjs(maxTIme).subtract(0.5,"hour"):undefined} //  time select
            onError={onEroorHndler}
            label={<ControledLabel labelPositioin={labelPositioin} label={label} />}
            sx={{  m:0.5 }}       
            onAccept={onAcceptHendler}
            onChange={()=>{}}
      
            slotProps={{
                    textField:{
                        variant:variant??"outlined" ,
                        color:color,
                        helperText:helpText? helpText :undefined
                    }
                        
            }}
   />

   )
}




export default DateTimePickerWrap