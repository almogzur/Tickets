import WidthContext from "@/context/WidthContext"
import { DateTimePicker, DateTimeValidationError, MobileDateTimePicker, PickerChangeHandlerContext, TimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { CSSProperties, useContext, useEffect, useMemo } from "react"
import { TextFieldVariants, Typography, useTheme , Stack as Flex, TextFieldProps  } from "@mui/material"
import { FcAbout } from "react-icons/fc"

import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import ControlledHelperText from "../text_filed_wrap/controlled-helper-text"
import ControlledLabel from "../text_filed_wrap/controlled-form-label"



interface TimePickerWrapType  {
    label:string
    variant?:TextFieldVariants
    value:string|null
    minDate? : Date 
    maxTIme? :Date
    isError?:boolean
    onAcceptHandler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHandler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onErrorHandler: (e:DateTimeValidationError, context:dayjs.Dayjs|null )=>void
    labelPosition:"top"|"end"
    MediaQuery?:string 
    color?:TextFieldProps['color']
    helpText?:string,
    disablePast?:boolean
    helpTextPotionsEnd?:boolean
}

const TimePickerWrap =({ 
          label,
          labelPosition,
          variant,
          isError,
          value,
          maxTIme,
          MediaQuery,
          color,
          helpText,
          minDate,
          disablePast,
          helpTextPotionsEnd,
          onAcceptHandler,
          onErrorHandler,
          onChangeHandler,
        
         }:TimePickerWrapType)=>{

        const theme = useTheme()


    return    ( 

    <TimePicker                
    orientation='portrait'
 
            desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("md")}
            value={value ? dayjs(value, 'HH:mm') : null}
            closeOnSelect={false}
            // tried not working currently
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}
            onError={onErrorHandler}
            label={<ControlledLabel labelPosition={labelPosition} label={label} />}
            sx={{  m:0.5 }}       
            onAccept={onAcceptHandler}
            onChange={onChangeHandler}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
       }}

            slotProps={{
                    textField:{
                        variant:variant??"outlined" ,
                        color:color,
                        helperText:helpText?  <ControlledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd?? false}/> : undefined
                    }
                        
            }}
   />

   )
}




export default TimePickerWrap