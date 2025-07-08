import { DatePicker, DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { TextFieldVariants, useTheme , TextFieldProps  } from "@mui/material"
import ControlledHelperText from "../text_filed_wrap/controlled-helper-text"
import ControlledLabel from "../text_filed_wrap/controlled-form-label"


interface DatePickerWrapType  {
    label:string
    value: string|null
    helpText:string,
    labelPosition:"top"|"end"
    onAcceptHandler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHandler: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onErrorHandler: (e:DateTimeValidationError, context:dayjs.Dayjs|null )=>void
    disablePast?:boolean
    maxDate? :Date
    minDate? : Date 
    isError?:boolean
    MediaQuery?:string 
    helpTextPotionsEnd?:boolean
    variant?:TextFieldVariants
    color?:TextFieldProps['color']
}

const DatePickerWrap =({ 
          label,
          labelPosition,
          variant,
          isError,
          value,
          maxDate,
          MediaQuery,
          color,
          helpText,
          minDate,
          disablePast,
          onChangeHandler  ,
          onErrorHandler,
          onAcceptHandler,
          helpTextPotionsEnd,
        
         }:DatePickerWrapType)=>{

        const theme = useTheme()


    return    ( 

    <DatePicker                 
            desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("sm")}
            value={ value? dayjs(value) :null }
            closeOnSelect={false}
            disablePast={disablePast??true}

            // tried not working currently
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}

            maxDate={maxDate?dayjs(maxDate):undefined} //  time select
            onError={onErrorHandler}
            label={<ControlledLabel labelPosition={labelPosition} label={label} />}
            sx={{  m:0.5 }}       
            
            
            onAccept={onAcceptHandler}
            onChange={onChangeHandler}
            slotProps={{
                textField:{
                  variant:variant??"outlined" ,
                  color:color,
                  helperText: helpText?  <ControlledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false}/> : undefined
                  },
                  actionBar: {
                    actions: [ "accept"], // Enables Accept & Cancel buttons
                }
                        
            }}
   />

   )
}




export default DatePickerWrap