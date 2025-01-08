import { DatePicker, DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { TextFieldVariants, useTheme , TextFieldProps  } from "@mui/material"
import  ControledLabel  from "@/components/gen/controled-form-label"
import ControledHelperText from "../controled-helper-text"


interface DatePickerWrapType  {
    label:string
    value: Date|null
    helpText:string,
    labelPositioin:"top"|"end"
    onAcceptHendler: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHendler: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onEroorHndler: (e:DateTimeValidationError, context:dayjs.Dayjs|null )=>void
    disablePast?:boolean
    maxDate? :Date
    minDate? : Date 
    isEroor?:boolean
    MediaQuery?:string 
    helpTextPotionsEnd?:boolean
    variant?:TextFieldVariants
    color?:TextFieldProps['color']
}

const DatePickerWrap =({ 
          label,
          labelPositioin,
          variant,
          isEroor,
          value,
          maxDate,
          MediaQuery,
          color,
          helpText,
          minDate,
          disablePast,
          onAcceptHendler  ,
          onEroorHndler,
          onChangeHendler,
          helpTextPotionsEnd,
        
         }:DatePickerWrapType)=>{

        const theme = useTheme()


    return    ( 

    <DatePicker                 
            desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("sm")}
            value={ value? dayjs(value) :null }
            closeOnSelect={false}
            disablePast={disablePast??true}
            // tryed not working curenntly
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}
            maxDate={maxDate?dayjs(maxDate):undefined} //  time select
            onError={onEroorHndler}
            label={<ControledLabel labelPositioin={labelPositioin} label={label} />}
            sx={{  m:0.5 }}       
            
            onAccept={onAcceptHendler}
            onChange={onChangeHendler}
            slotProps={{
                textField:{
                  variant:variant??"outlined" ,
                  color:color,
                  helperText: helpText?  <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd??false}/> : undefined
                  }
                        
            }}
   />

   )
}




export default DatePickerWrap