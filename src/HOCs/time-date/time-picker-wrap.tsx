import WidthContext from "@/context/WidthContext"
import { DateTimePicker, DateTimeValidationError, MobileDateTimePicker, PickerChangeHandlerContext, TimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { CSSProperties, useContext, useEffect, useMemo } from "react"
import { TextFieldVariants, Typography, useTheme , Stack as Flex, TextFieldProps  } from "@mui/material"
import { FcAbout } from "react-icons/fc"

import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import ControledHelperText from "../TeextFiledWrpa/controled-helper-text"
import ControledLabel from "../TeextFiledWrpa/controled-form-label"



interface TimePickerWrapType  {
    label:string
    variant?:TextFieldVariants
    value:string|null
    minDate? : Date 
    maxTIme? :Date
    isEroor?:boolean
    onAcceptHendler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHendler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onEroorHndler: (e:DateTimeValidationError, context:dayjs.Dayjs|null )=>void
    labelPositioin:"top"|"end"
    MediaQuery?:string 
    color?:TextFieldProps['color']
    helpText?:string,
    disablePast?:boolean
    helpTextPotionsEnd?:boolean
}

const TimePickerWrap =({ 
          label,
          labelPositioin,
          variant,
          isEroor,
          value,
          maxTIme,
          MediaQuery,
          color,
          helpText,
          minDate,
          disablePast,
          helpTextPotionsEnd,
          onAcceptHendler,
          onEroorHndler,
          onChangeHendler,
        
         }:TimePickerWrapType)=>{

        const theme = useTheme()


    return    ( 

    <TimePicker                
    orientation='portrait'
 
            desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("md")}
            value={value ? dayjs(value, 'HH:mm') : null}
            closeOnSelect={false}
            // tryed not working curenntly
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}
            onError={onEroorHndler}
            label={<ControledLabel labelPositioin={labelPositioin} label={label} />}
            sx={{  m:0.5 }}       
            onAccept={onAcceptHendler}
            onChange={onChangeHendler}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
       }}

            slotProps={{
                    textField:{
                        variant:variant??"outlined" ,
                        color:color,
                        helperText:helpText?  <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd?? false}/> : undefined
                    }
                        
            }}
   />

   )
}




export default TimePickerWrap