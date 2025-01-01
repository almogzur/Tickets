import WidthContext from "@/context/WidthContext"
import { DateTimePicker, DateTimeValidationError, MobileDateTimePicker, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { CSSProperties, useContext, useEffect, useMemo } from "react"
import { TextFieldVariants, Typography, useTheme , Stack as Flex, TextFieldProps  } from "@mui/material"
import { FcAbout } from "react-icons/fc"

import  { useFormControl } from '@mui/material/FormControl';
import  ControledLabel  from "./controled-form-label"
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { tree } from "next/dist/build/templates/app-page"



interface DateTimePickerWrapType  {
    label:string
    variant?:TextFieldVariants
    value:Date
    minDate? : Date 
    maxTIme? :Date
    isEroor?:boolean
    onAcceptHendler: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHendler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void

    onEroorHndler: (e:DateTimeValidationError, context:dayjs.Dayjs|null )=>void
    labelPositioin:"top"|"end"
    MediaQuery?:string 
    color?:TextFieldProps['color']
    helpText?:string,
    disablePast?:boolean
}

const DateTimePickerWrap =({ 
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
          onAcceptHendler  ,
          onEroorHndler,
          onChangeHendler
        
         }:DateTimePickerWrapType)=>{

        const theme = useTheme()


    return    ( 

    <DateTimePicker                 
            desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("lg")}
            value={ dayjs(value) }
            closeOnSelect={false}
            disablePast={disablePast??true}
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
            onChange={onChangeHendler}
            viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
       }}

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