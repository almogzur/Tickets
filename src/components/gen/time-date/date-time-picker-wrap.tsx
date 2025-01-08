import WidthContext from "@/context/WidthContext"
import { DateTimePicker, DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { TextFieldVariants, useTheme , Stack as Flex, TextFieldProps  } from "@mui/material"

import  ControledLabel  from "@/components/gen/controled-form-label"
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import ControledHelperText from "../controled-helper-text"
import { useContext } from "react"



interface DateTimePickerWrapType  {
    label:string
    variant?:TextFieldVariants
    value:Date|null
    minDate? : Date 
    maxTIme? :Date
    isEroor?:boolean
    onAcceptHendler: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHendler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    helpTextPotionsEnd?:boolean
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
          onChangeHendler,
          helpTextPotionsEnd
        
         }:DateTimePickerWrapType)=>{

        const theme = useTheme()
        const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


    return    ( 

    <DateTimePicker                 
           desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("lg")}
            value={ value?  dayjs(value): null }
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
                month:renderTimeViewClock,
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
 

            slotProps={{
                    textField:{
                        variant:variant??"outlined" ,
                        color:color,
                        helperText:helpText?  <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false}/> : undefined
                    }
                        
            }}
   />

   )
}




export default DateTimePickerWrap